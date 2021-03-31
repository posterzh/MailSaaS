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
from .utils.sending_calendar import can_send_email, calendar_sent
from ..campaign.models import SendingObject, EmailInbox, Campaign, Recipient, EmailOutbox
from .utils.smtp import send_mail_with_smtp, receive_mail_with_imap, get_emails_to_send, check_email
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

        is_valid, msg = check_email(request=request)
        if not is_valid:
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)

        return self.create(request, *args, **kwargs)


class EmailAccountView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmailAccount.objects.all()
    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        is_valid, msg = check_email(request=request)
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

            if can_send_email(sending_calendar, calendar_status):
                available_mail_ids.append(mail_account.id)
                mail_limit = sending_calendar.max_emails_per_day - calendar_status.sent_count
                available_mail_limits.append(mail_limit)

        # Fetch sending objects
        sending_objects = get_emails_to_send(available_mail_ids, available_mail_limits)

        for sending_item in sending_objects:
            camp = Campaign.objects.get(id=sending_item['camp_id'])
            from_email = EmailAccount.objects.get(id=sending_item['from_email_id'])
            to_email = Recipient.objects.get(id=sending_item['to_email_id'])
            email_subject = sending_item['email_subject']
            email_body = sending_item['email_body']

            # Save to EmailOutbox
            outbox = EmailOutbox()
            outbox.campaign = camp
            outbox.from_email = from_email
            outbox.recipient = to_email
            outbox.email_subject = email_subject
            outbox.email_body = email_body
            outbox.status = 0
            outbox.sent_date = datetime.now(timezone.utc).date()
            outbox.sent_time = datetime.now(timezone.utc).time()
            outbox.save()

            # Send email
            result = send_mail_with_smtp(host=from_email.smtp_host,
                                         port=from_email.smtp_port,
                                         username=from_email.smtp_username,
                                         password=from_email.smtp_password,
                                         use_tls=from_email.use_smtp_ssl,
                                         from_email=from_email.email,
                                         to_email=to_email.email,
                                         subject=email_subject,
                                         body=email_body,
                                         uuid=outbox.id,
                                         track_opens=camp.track_opens,
                                         track_linkclick=camp.track_linkclick)

            if result:
                print(f"Email sent from {from_email.email} to {to_email.email}")

                # Update CalendarStatus
                calendar_status = CalendarStatus.objects.get(sending_calendar__mail_account_id=from_email.id)
                calendar_sent(calendar_status)

                # Update EmailOutbox status
                outbox.status = 1
                outbox.save()
            else:
                print(f"Failed to send from {from_email.email} to {to_email.email}")

                # Delete the EmailOutbox entry that fails
                outbox.delete()

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
