import imaplib
from datetime import datetime, timezone, timedelta

from celery import shared_task
from .models import *
from .utils.smtp import send_mail_with_smtp
from ..campaign.models import SendingObject


@shared_task(bind=True)
def send_test_email(self, mailAccountId):
    mailAccount = EmailAccount.objects.get(pk=mailAccountId)
    print('Sending email from :', mailAccount)

    send_mail_with_smtp(host=mailAccount.smtp_host,
                        port=mailAccount.smtp_port,
                        username=mailAccount.smtp_username,
                        password=mailAccount.smtp_password,
                        use_tls=mailAccount.use_smtp_ssl,
                        from_email=mailAccount.email,
                        to_email=['valor312@gmail.com'],
                        subject="This is test email",
                        body="Hi, this email is sent by SMTP.")


@shared_task
def email_sender():
    print('Email sender is called...')

    LIMIT = 10

    available_mail_ids = []
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

    # Fetch sending objects
    sending_objects = SendingObject.objects.filter(status=0, from_email_id__in=available_mail_ids).order_by(
        "email_type")[:LIMIT]

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


@shared_task
def email_receiver():
    print('Email receiver is called...')

    mb = {}
    mb.email_box_ssl = True
    mb.email_box_host = "outlook.office365.com"
    mb.email_box_port = 993
    mb.email_box_user = "uishaozin@outlook.com"
    mb.email_box_pass = "AaBb!@#$"
    mb.email_box_imap_folder = "inbox"

    if mb.email_box_ssl:
        server = imaplib.IMAP4_SSL(mb.email_box_host, int(mb.email_box_port))
    else:
        server = imaplib.IMAP4(mb.email_box_host, int(mb.email_box_port))
    server.login(mb.email_box_user, mb.email_box_pass)
    server.select(mb.email_box_imap_folder)
    status, data = server.search(None, 'ALL')
    for num in data[0].split():
        status, data = server.fetch(num, '(RFC822)')
        full_message = data[0][1]

        server.store(num, '+FLAGS', '\\Deleted')
    server.expunge()
    server.close()
    server.logout()