from datetime import datetime, timezone, timedelta
from itertools import chain
import imaplib

import pytz
from pytracking.django import OpenTrackingView, ClickTrackingView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import EmailAccount, SendingCalendar, CalendarStatus, WarmingStatus
from .serializers import EmailAccountSerializer, SendingCalendarSerializer
from .tasks import email_receiver, email_sender
from ..campaign.models import EmailOutbox
from .utils.smtp import check_email
from mail.settings import DEFAULT_WARMUP_FOLDER
from ..campaign.tasks import triggerLeadCatcher, updateLeadsLog


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

        if warming_enabled:
            # Create 'mailerrize' folder in the email account
            email_account = EmailAccount.objects.get(pk=mail_account_id)
            if not email_account.imap_host or not email_account.imap_port or not email_account.imap_username or not email_account.imap_password:
                return Response({"message": "IMAP setting is not found.", "success": False})
            try:
                mail = imaplib.IMAP4_SSL(email_account.imap_host, email_account.imap_port)
                mail.login(email_account.imap_username, email_account.imap_password)
                mail.create(DEFAULT_WARMUP_FOLDER)
                # if email_account.email_provider == 'Google':
                #     host = "imap.gmail.com"
                #     port = 993
                #     mail = imaplib.IMAP4_SSL(host, port)
                #     mail.login(email_account.email, email_account.password)
                #     mail.create(DEFAULT_WARMUP_FOLDER)
            except Exception as e:
                return Response({"message": e, "success": False})

        warming = WarmingStatus.objects.filter(mail_account_id=mail_account_id)
        if len(warming) > 0:
            warming.update(warming_enabled=warming_enabled, status_updated_at=datetime.now())
        else:
            WarmingStatus.objects.create(mail_account_id=mail_account_id, warming_enabled=warming_enabled)

        return Response({"success": True})


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

        ########################################
        mailAccountId = request.data['mailAccountId']
        if mailAccountId == 0:
            email_sender()
        elif mailAccountId == 1:
            email_receiver()

        ########################################

        return Response("Ok")


class MyOpenTrackingView(OpenTrackingView):

    def notify_tracking_event(self, tracking_result):
        uuid = tracking_result.metadata['uuid']

        try:
            outbox = EmailOutbox.objects.get(id=uuid)
        except Exception as e:
            return
        outbox.opened += 1
        outbox.opened_datetime = datetime.now(timezone.utc)
        outbox.save()

        outbox.recipient.opens += 1
        outbox.recipient.save()

        # Lead checking
        triggerLeadCatcher(outbox.campaign_id, outbox.recipient_id)
        updateLeadsLog(outbox.recipient_id, "opened")

        print(f'Tracking: Email {outbox.recipient.email} is opened.')


class MyClickTrackingView(ClickTrackingView):

    def notify_tracking_event(self, tracking_result):
        uuid = tracking_result.metadata['uuid']

        try:
            outbox = EmailOutbox.objects.get(id=uuid)
        except Exception as e:
            return

        outbox.clicked += 1
        outbox.clicked_datetime = datetime.now(timezone.utc)
        outbox.save()

        outbox.recipient.clicked += 1
        outbox.recipient.save()

        # Lead checking
        triggerLeadCatcher(outbox.campaign_id, outbox.recipient_id)
        updateLeadsLog(outbox.recipient_id, "clicked")

        print(f'Tracking: Email {outbox.recipient.email} is clicked.')
