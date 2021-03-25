from datetime import datetime

from celery import shared_task
from .models import *
from .utils import *
from ..campaign.models import SendingObject


@shared_task(bind=True)
def test_email(self, mailAccountId):
    mailAccount = EmailAccount.objects.get(pk=mailAccountId)
    print('Sending email from :', mailAccount)

    send_mail_with_smtp(host=mailAccount.smtp_host,
                        port=mailAccount.smtp_port,
                        username=mailAccount.smtp_username,
                        password=mailAccount.smtp_password,
                        use_tls=mailAccount.use_smtp_ssl,
                        from_email=mailAccount.email,
                        to_email=['wangmingxie26@gmail.com'],
                        subject="This is test email",
                        body="Hi, this email is sent by SMTP.")


@shared_task
def email_sender():
    print('Email sender is called...')

    sending_objects = SendingObject.objects.filter(status=0)
    for sending_item in sending_objects:
        mail_account = sending_item.from_email
        sending_calendar, created = SendingCalendar.objects.get_or_create(mail_account_id=mail_account.id)
        calendar_status, created = CalendarStatus.objects.get_or_create(sending_calendar_id=sending_calendar.id)

        should_send = True
        # Check time
        current_time = datetime.now().time()
        if sending_calendar.start_time > current_time:
            should_send = False
        if current_time > sending_calendar.end_time:
            should_send = False

        weekday = datetime.today().weekday()
        if sending_calendar.block_days & weekday:
            should_send = False

        # Check max email count per day
        if calendar_status.sent_count >= sending_calendar.max_emails_per_day:
            should_send = False

        # Send email
        if should_send:
            result = send_mail_with_smtp(host=mail_account.smtp_host,
                                         port=mail_account.smtp_port,
                                         username=mail_account.smtp_username,
                                         password=mail_account.smtp_password,
                                         use_tls=mail_account.use_smtp_ssl,
                                         from_email=mail_account.email,
                                         to_email=[sending_item.recipient_email],
                                         subject=sending_item.email_subject,
                                         body=sending_item.email_body)

            if result:
                print(f"Email sent from {mail_account.email} to {sending_item.recipient_email}")

                # Update CalendarStatus
                #   reset the today's count
                if calendar_status.updated_datetime.date() != datetime.today().date():
                    calendar_status.sent_count = 0
                #   increase the sent count
                calendar_status.sent_count += 1
                #   update the timestamp
                calendar_status.updated_datetime = datetime.now()
                #   save
                calendar_status.save()

                # Update SendingObjects
                sending_item.status = 1
                sending_item.sent_date = datetime.now().date()
                sending_item.sent_time = datetime.now().time()
                sending_item.save()
            else:
                print(f"Failed to send from {mail_account.email} to {sending_item.recipient_email}")



