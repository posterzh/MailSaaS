import imaplib
from datetime import datetime, timezone, timedelta
import pytz
import numpy as np
import math
import random
from celery import shared_task
from .models import *
from .utils.smtp import send_mail_with_smtp
from ..campaign.models import SendingObject

default_rampup_increment = 3
default_max_warmup_cnt = 20
default_warmup_mail_subject = "Fwd: Before apples, limes were only camels. • mailerrize"
default_warmup_mail_body = """

A tangerine of the rabbit is assumed to be a loving bee. An easygoing pear's lemon comes with it the thought that the dashing snake is a lion? Few can name a lovely pear that isn't a productive hamster? Creative kiwis show us how monkeys can be spiders.

One cannot separate cheetahs from practical ants! We can assume that any instance of an apple can be construed as a sensitive lobster! After a long day at school and work, the chicken of a blackberry becomes a confident chimpanzee. Shouting with happiness, humorous pigs show us how birds can be deers. The blackberries could be said to resemble fine lions. What we don't know for sure is whether or not the imaginative melon comes from a decisive fig? What we don't know for sure is whether or not those apricots are nothing more than lemons! In modern times they were lost without the determined rabbit that composed their snail. The lobster of a pear becomes an industrious rat. The goats could be said to resemble witty alligators.

It's very tricky, if not impossible, a vivacious lobster is a strawberry of the mind! Some posit the excellent elephant to be less than generous; They were lost without the thrifty rabbit that composed their hamster. The first fearless lemon is, in its own way, a shark.

The first decorous apricot is, in its own way, a lobster. A pomegranate is an ant's persimmon! We can assume that any instance of a pig can be construed as a self-disciplined cat. The pomegranate of a dog becomes an intuitive giraffe. A snail of the prune is assumed to be an excellent rabbit. Some proud cheetahs are thought of simply as hamsters.

Yours sincerely,

"""

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


@shared_task
def warming_trigger():
    # Get warming enabled accounts
    enabledAccounts = WarmingStatus.objects.filter(warming_enabled=True).select_related("mail_account")
    for item in enabledAccounts:
        mail_account = item.mail_account
        # print(f"Warmer email: {mail_account.email}")

        cnt_to_send = min(default_rampup_increment * (item.days_passed + 1), default_max_warmup_cnt)

        # print(f"Number of warmup emails to send: {cnt_to_send}")

        # calculate time span for today's warmup emails
        timespan = math.floor(20 * 60 / cnt_to_send)            # time interval between 2 adjacent mails; notice the total time range is 20 hours
        timespan += random.randint(-10, 10)
        # print(f"Timespan in minutes: {timespan}")

        logs = WarmingLog.objects.filter(mail_account_id=mail_account.id, sent_at__day=datetime.today().day).order_by('-sent_at')

        # if it exceeded today's count, continue
        if len(logs) >= cnt_to_send:
            continue

        if len(logs) > 0:
            # print(f"utc now: {datetime.utcnow()}")
            # print(f"last sent at: {logs[0].sent_at.astimezone(pytz.utc).replace(tzinfo=None)}")
            timediff_minutes = (datetime.utcnow() - logs[0].sent_at.astimezone(pytz.utc).replace(tzinfo=None)).total_seconds() / 60
            # print(f"different in minutes: {timediff_minutes}")
            # if it's too soon to send warm email, continue
            if (timediff_minutes < timespan):
                continue

        # get random Warming account to sent out email
        account_list = [tmp for tmp in enabledAccounts if tmp.mail_account_id != mail_account.id ]
        dest_account = random.choice(account_list).mail_account

        # print(f"Sending email to: ${dest_account.email}")
        # send email to dest_account
        warmup_email_body = "Dear "
        if dest_account.first_name:
            warmup_email_body += dest_account.first_name + ","
        elif dest_account.last_name:
            warmup_email_body += dest_account.last_name + ","
        else:
            warmup_email_body = "Hello,"
        warmup_email_body += default_warmup_mail_body
        if mail_account.first_name:
            warmup_email_body += mail_account.first_name
        elif mail_account.last_name:
            warmup_email_body += mail_account.last_name
        else:
            warmup_email_body = "Thank you"
        # print(warmup_email_body)
        result = send_mail_with_smtp(host=mail_account.smtp_host,
                                     port=mail_account.smtp_port,
                                     username=mail_account.smtp_username,
                                     password=mail_account.smtp_password,
                                     use_tls=mail_account.use_smtp_ssl,
                                     from_email=mail_account.email,
                                     to_email=[dest_account.email],
                                     subject=default_warmup_mail_subject,
                                     body=warmup_email_body,
                                     uuid=None,
                                     track_opens=False,
                                     track_linkclick=False)

        # print(f"Email Sent: {result}")
        if result == True:
            # log into the DB
            WarmingLog.objects.create(mail_account_id=mail_account.id)
