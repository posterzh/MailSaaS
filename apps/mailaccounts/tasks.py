import imaplib
from datetime import datetime, timezone, timedelta
import pytz
import numpy as np
import math
import random
from celery import shared_task
from .models import *
from .utils.smtp import send_mail_with_smtp, receive_mail_with_imap
from ..campaign.models import SendingObject, EmailInbox

default_rampup_increment = 3
default_max_warmup_cnt = 20
default_warmup_mail_subject = "Before apples, limes were only camels. • mailerrize"
default_warmup_mail_body = """

A tangerine of the rabbit is assumed to be a loving bee. An easygoing pear's lemon comes with it the thought that the dashing snake is a lion? Few can name a lovely pear that isn't a productive hamster? Creative kiwis show us how monkeys can be spiders.

One cannot separate cheetahs from practical ants! We can assume that any instance of an apple can be construed as a sensitive lobster! After a long day at school and work, the chicken of a blackberry becomes a confident chimpanzee. Shouting with happiness, humorous pigs show us how birds can be deers. The blackberries could be said to resemble fine lions. What we don't know for sure is whether or not the imaginative melon comes from a decisive fig? What we don't know for sure is whether or not those apricots are nothing more than lemons! In modern times they were lost without the determined rabbit that composed their snail. The lobster of a pear becomes an industrious rat. The goats could be said to resemble witty alligators.

It's very tricky, if not impossible, a vivacious lobster is a strawberry of the mind! Some posit the excellent elephant to be less than generous; They were lost without the thrifty rabbit that composed their hamster. The first fearless lemon is, in its own way, a shark.

The first decorous apricot is, in its own way, a lobster. A pomegranate is an ant's persimmon! We can assume that any instance of a pig can be construed as a self-disciplined cat. The pomegranate of a dog becomes an intuitive giraffe. A snail of the prune is assumed to be an excellent rabbit. Some proud cheetahs are thought of simply as hamsters.

Yours sincerely,

"""
default_warmup_reply_mail_body = """

Received your warming email.

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




def email_receiver():
    print('Email receiver is called...')

    mail_accounts = EmailAccount.objects.exclude(imap_username__exact='').exclude(imap_username__isnull=True)

    for mail_account in mail_accounts:
        emails = receive_mail_with_imap(
            host=mail_account.imap_host,
            port=mail_account.imap_port,
            username=mail_account.imap_username,
            password=mail_account.imap_password,
            use_tls=mail_account.use_imap_ssl
        )

        for email_item in emails:
            inbox = EmailInbox()
            inbox.recipient_email = mail_account
            inbox.from_email = email_item['from']
            inbox.email_subject = email_item['subject']
            inbox.email_body = email_item['content']
            inbox.status = 0
            inbox.receive_date = datetime.now().date()
            inbox.receive_time = datetime.now().time()
            inbox.save()

            # Filter out the warmup emails
            if email_item['subject'].endswith("• mailerrize") and not email_item['subject'].startswith("Re:"):
                warm_reply_subject = "Re: " + email_item['subject']
                param = {
                    "host": mail_account.smtp_host,
                    "port": mail_account.smtp_port,
                    "username": mail_account.smtp_username,
                    "password": mail_account.smtp_password,
                    "use_tls": mail_account.use_smtp_ssl,
                    "from_email": mail_account.email,
                    "to_email": [email_item['from']],
                    "subject": warm_reply_subject,
                    "body": default_warmup_reply_mail_body,
                    "uuid": None,
                    "track_opens": False,
                    "track_linkclick": False
                }
                send_immediate_email.delay(param)


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
        timespan = math.floor(
            20 * 60 / cnt_to_send)  # time interval between 2 adjacent mails; notice the total time range is 20 hours
        timespan += random.randint(-10, 10)
        # print(f"Timespan in minutes: {timespan}")

        logs = WarmingLog.objects.filter(mail_account_id=mail_account.id, sent_at__day=datetime.today().day).order_by(
            '-sent_at')

        # if it exceeded today's count, continue
        if len(logs) >= cnt_to_send:
            continue

        if len(logs) > 0:
            # print(f"utc now: {datetime.utcnow()}")
            # print(f"last sent at: {logs[0].sent_at.astimezone(pytz.utc).replace(tzinfo=None)}")
            timediff_minutes = (datetime.utcnow() - logs[0].sent_at.astimezone(pytz.utc).replace(
                tzinfo=None)).total_seconds() / 60
            # print(f"different in minutes: {timediff_minutes}")
            # if it's too soon to send warm email, continue
            if (timediff_minutes < timespan):
                continue

        # get random Warming account to sent out email
        account_list = [tmp for tmp in enabledAccounts if tmp.mail_account_id != mail_account.id]
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
        param = {
            "host": mail_account.smtp_host,
            "port": mail_account.smtp_port,
            "username": mail_account.smtp_username,
            "password": mail_account.smtp_password,
            "use_tls": mail_account.use_smtp_ssl,
            "from_email": mail_account.email,
            "to_email": [dest_account.email],
            "subject": default_warmup_mail_subject,
            "body": warmup_email_body,
            "uuid": None,
            "track_opens": False,
            "track_linkclick": False
        }
        send_immediate_email.delay(param)

        # log into the DB
        WarmingLog.objects.create(mail_account_id=mail_account.id)


@shared_task
def send_immediate_email(param):
    result = send_mail_with_smtp(host=param['host'],
                                 port=param['port'],
                                 username=param['username'],
                                 password=param['password'],
                                 use_tls=param['use_tls'],
                                 from_email=param['from_email'],
                                 to_email=param['to_email'],
                                 subject=param['subject'],
                                 body=param['body'],
                                 uuid=param['uuid'],
                                 track_opens=param['track_opens'],
                                 track_linkclick=param['track_linkclick'])