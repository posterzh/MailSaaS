from datetime import datetime, timezone, timedelta
from itertools import chain
import email, imaplib

import pytz
from django.db.models import Prefetch
from django.http import Http404, HttpResponseServerError, HttpResponseBadRequest
from pytracking.django import OpenTrackingView, ClickTrackingView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from . import utils
from .models import EmailAccount, SendingCalendar, CalendarStatus, WarmingStatus
from .serializers import EmailAccountSerializer, SendingCalendarSerializer
from ..campaign.models import SendingObject, EmailInbox
from .utils.smtp import send_mail_with_smtp, receive_mail_with_imap, get_sending_items
from .tasks import send_test_email


class EmailAccountListView(generics.ListCreateAPIView):
    queryset = EmailAccount.objects.all()
    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user.id)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id

        is_valid, msg = utils.check_email(request=request)
        if not is_valid:
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)

        return self.create(request, *args, **kwargs)


class EmailAccountView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmailAccount.objects.all()
    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        is_valid, msg = utils.check_email(request=request)
        if not is_valid:
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)

        return super(EmailAccountView, self).update(request, *args, **kwargs)


class EmailAccountWarmingView(APIView):
    queryset = EmailAccount.objects.all()
    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        # emailAccounts = EmailAccount.objects.filter(user=self.request.user.id)
        # warmingList = WarmingStatus.objects.filter()
        # results = []
        # for item in emailAccounts:
        #     for warming in warmingList:
        #         if item.id == warming.mail_account_id:
        #             item.warming = warming
        #             results.append(item)
        #             print("found")
        #             break
        # return Response(EmailAccount.objects.filter(user=self.request.user.id).prefetch_related(
        #         Prefetch('WarmingStatus_set',
        #                  queryset=WarmingStatus.objects.all(),
        #                  to_attr="WarmingStatus")
        #     ).values())
        return Response(WarmingStatus.objects.select_related("mail_account").filter(
            mail_account__user_id=self.request.user.id).values())

    def post(self, request, mail_account_id):
        warming_enabled = request.data['warming_enabled']
        warming = WarmingStatus.objects.filter(mail_account_id=mail_account_id)
        if len(warming) > 0:
            warming.update(warming_enabled=warming_enabled, status_updated_at=datetime.now())
        else:
            WarmingStatus.objects.create(mail_account_id=mail_account_id, warming_enabled=warming_enabled)

            # Create 'mailerrize' folder in the email account
            email_account = EmailAccount.objects.get(pk=mail_account_id)
            if email_account.email_provider == 'SMTP':
                mail = imaplib.IMAP4_SSL(email_account.imap_host, email_account.imap_port)
                mail.login(email_account.imap_username, email_account.imap_password)
                mail.create("mailerrize")
            if email_account.email_provider == 'Google':
                host = "imap.gmail.com"
                mail = imaplib.IMAP4_SSL(host)
                mail.login(email_account.email, email_account.password)
                mail.create("mailerrize")
        return Response(True)


class SendingCalendarListView(generics.ListCreateAPIView):
    queryset = SendingCalendar.objects.all()
    serializer_class = SendingCalendarSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        return SendingCalendar.objects.filter(mail_account__user_id__exact=self.request.user.id)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class SendingCalendarView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SendingCalendar.objects.all()
    serializer_class = SendingCalendarSerializer
    permission_classes = (permissions.IsAuthenticated,)


class AvailableTimezonesView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response(pytz.all_timezones)


class SendTestEmailView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        # mailAccountId = request.data['mailAccountId']
        # send_test_email.delay(mailAccountId)

        available_mail_ids = []
        available_mail_limits = []
        mail_accounts = EmailAccount.objects.all()
        for mail_account in mail_accounts:
            sending_calendar, created = SendingCalendar.objects.get_or_create(mail_account_id=mail_account.id)
            if created:
                sending_calendar = SendingCalendar.objects.get(mail_account_id=mail_account.id)
            calendar_status, created = CalendarStatus.objects.get_or_create(sending_calendar_id=sending_calendar.id,
                                                                            defaults={'updated_datetime': datetime.now(
                                                                                timezone.utc) - timedelta(days=1)})

            can_send = True
            # Check time

            current_time = datetime.now().time()
            if sending_calendar.start_time > current_time:
                can_send = False
            if current_time > sending_calendar.end_time:
                can_send = False

            weekday = datetime.today().weekday()
            if sending_calendar.block_days & weekday:
                can_send = False

            # Check max email count per day
            if calendar_status.sent_count >= sending_calendar.max_emails_per_day:
                can_send = False

            minutes = (datetime.now(timezone.utc) - calendar_status.updated_datetime).total_seconds() / 60.0
            if minutes < sending_calendar.minutes_between_sends:
                can_send = False

            if can_send:
                available_mail_ids.append(mail_account.id)
                available_mail_limits.append(calendar_status.sent_count)

        # Fetch sending objects
        sending_objects = get_sending_items(available_mail_ids, available_mail_limits)

        for sending_item in sending_objects:
            mail_account = sending_item.from_email

            # Send email
            result = send_mail_with_smtp(host=mail_account.smtp_host,
                                         port=mail_account.smtp_port,
                                         username=mail_account.smtp_username,
                                         password=mail_account.smtp_password,
                                         use_tls=mail_account.use_smtp_ssl,
                                         from_email=mail_account.email,
                                         to_email=[sending_item.recipient_email],
                                         subject=sending_item.email_subject,
                                         body=sending_item.email_body,
                                         uuid=sending_item.id,
                                         track_opens=sending_item.campaign.track_opens,
                                         track_linkclick=sending_item.campaign.track_linkclick)

            if result:
                print(f"Email sent from {mail_account.email} to {sending_item.recipient_email}")

                # Update CalendarStatus
                #   reset the today's count
                if calendar_status.updated_datetime.date() != datetime.today().date():
                    calendar_status.sent_count = 0
                #   increase the sent count
                calendar_status.sent_count += 1
                #   update the timestamp
                calendar_status.updated_datetime = datetime.now(timezone.utc)
                #   save
                calendar_status.save()

                # Update SendingObjects
                sending_item.status = 1
                sending_item.sent_date = datetime.now().date()
                sending_item.sent_time = datetime.now().time()
                sending_item.save()
            else:
                print(f"Failed to send from {mail_account.email} to {sending_item.recipient_email}")


        return Response("Ok")


class MyOpenTrackingView(OpenTrackingView):

    def notify_tracking_event(self, tracking_result):
        uuid = tracking_result.metadata['uuid']

        sending_object = SendingObject.objects.get(id=uuid)
        sending_object.opened += 1
        sending_object.opened_datetime = datetime.now(timezone.utc)
        sending_object.save()


class MyClickTrackingView(ClickTrackingView):

    def notify_tracking_event(self, tracking_result):
        uuid = tracking_result.metadata['uuid']

        sending_object = SendingObject.objects.get(id=uuid)
        sending_object.clicked += 1
        sending_object.clicked_datetime = datetime.now(timezone.utc)
        sending_object.save()
