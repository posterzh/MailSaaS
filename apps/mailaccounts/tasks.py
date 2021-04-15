from datetime import datetime, timezone, timedelta
import re
import math
import random
from essential_generators import DocumentGenerator
from celery import shared_task
from imap_tools import MailBox, AND

from .models import *
from .utils.sending_calendar import can_send_email, calendar_sent
from .utils.smtp import send_mail_with_smtp, get_emails_to_send, move_warmups_from_spam_to_inbox
from ..campaign.models import EmailInbox, Campaign, Recipient, EmailOutbox, Emails, LeadsLog
from mail.settings import DEFAULT_RAMPUP_INCREMENT, DEFAULT_WARMUP_MAX_CNT, DEFAULT_WARMUP_MAIL_SUBJECT_SUFFIX, DEFAULT_WARMUP_FOLDER
from ..campaign.tasks import triggerLeadCatcher, updateLeadsLog

gen = DocumentGenerator()

@shared_task
def email_sender():
    print('Email sender is called...')

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
    if len(sending_objects) == 0:
        print(f'Get {len(sending_objects)} sending objects.')
        return

    # Update the EmailOutbox table
    for sending_item in sending_objects:
        # Save to EmailOutbox
        outbox = EmailOutbox()
        outbox.email_id = sending_item['email_id']
        outbox.campaign_id = sending_item['camp_id']
        outbox.from_email_id = sending_item['from_email_id']
        outbox.recipient_id = sending_item['to_email_id']
        outbox.email_subject = sending_item['email_subject']
        outbox.email_body = sending_item['email_body']
        outbox.status = 0

        try:
            outbox.save()
        except Exception as e:
            print(f'Ignore a duplicated sending object: campaign_id={outbox.campaign_id}, from={outbox.from_email}, to={outbox.recipient}')
            continue

    outboxes = EmailOutbox.objects.filter(status__exact=0)
    for outbox in outboxes:
        # Send email
        result = send_mail_with_smtp(host=outbox.from_email.smtp_host,
                                     port=outbox.from_email.smtp_port,
                                     username=outbox.from_email.smtp_username,
                                     password=outbox.from_email.smtp_password,
                                     use_tls=outbox.from_email.use_smtp_ssl,
                                     from_email=outbox.from_email.email,
                                     to_email=[outbox.recipient.email],
                                     subject=outbox.email_subject,
                                     body=outbox.email_body,
                                     uuid=outbox.id,
                                     track_opens=outbox.campaign.track_opens,
                                     track_linkclick=outbox.campaign.track_linkclick)

        if result:
            print(f"Email sent from {outbox.from_email.email} to {outbox.recipient.email}")

            # Increase the Recipient sent number
            outbox.recipient.sent += 1
            outbox.recipient.save()

            # Update CalendarStatus
            calendar_status = CalendarStatus.objects.get(sending_calendar__mail_account_id=outbox.from_email.id)
            calendar_sent(calendar_status)

            # Update EmailOutbox status
            outbox.sent_date = datetime.now(timezone.utc).date()
            outbox.sent_time = datetime.now(timezone.utc).time()
            outbox.status = 1
            outbox.save()

        else:
            print(f"Failed to send from {outbox.from_email.email} to {outbox.recipient.email}")

            # Delete the EmailOutbox entry that fails
            outbox.status = 2
            outbox.save()


def _prase_outbox_id(html):
    try:
        outbox_id = re.findall(r"\<td.+opacity:(\d+)", html)[0]
        return outbox_id
    except:
        return None


@shared_task
def email_receiver():
    print('Email receiver is called...')

    mail_accounts = EmailAccount.objects.exclude(imap_username__exact='').exclude(imap_username__isnull=True)

    for mail_account in mail_accounts:
        if not mail_account.imap_host or not mail_account.imap_port or not mail_account.imap_username or not mail_account.imap_password:
            continue
        try:
            with MailBox(host=mail_account.imap_host, port=mail_account.imap_port)\
                    .login(mail_account.imap_username,
                     mail_account.imap_password, 'INBOX') as mailbox:
                for msg in mailbox.fetch(AND(seen=False)):
                    outbox_id = _prase_outbox_id(msg.html)
                    if not outbox_id:
                        continue
                    try:
                        outbox = EmailOutbox.objects.get(id=outbox_id)
                    except Exception as e:
                        print(e)
                        continue

                    inbox = EmailInbox()
                    inbox.outbox = outbox
                    inbox.recipient_email_id = inbox.outbox.recipient_id
                    inbox.from_email_id = inbox.outbox.from_email_id

                    inbox.email_subject = msg.subject
                    inbox.email_body = msg.html
                    inbox.status = 0
                    inbox.receive_date = datetime.now().date()
                    inbox.receive_time = datetime.now().time()
                    inbox.save()

                    if inbox.recipient_email:
                        inbox.recipient_email.replies += 1
                        inbox.recipient_email.save()

                    # Lead checking
                    if inbox.outbox:
                        triggerLeadCatcher(inbox.outbox.campaign_id, inbox.outbox.recipient_id)
                        updateLeadsLog(inbox.outbox.recipient_id, "replied")

                    print(f"Email received from {msg.from_} to {msg.to}")
        except OSError:
            print(f"Mail account is invalid : {mail_account}")
        except ConnectionError:
            print(f"Connection aborted : {mail_account}")


@shared_task
def warming_trigger():
    # Get warming enabled accounts
    enabledAccounts = WarmingStatus.objects.filter(warming_enabled=True).select_related("mail_account")
    for item in enabledAccounts:
        mail_account = item.mail_account
        # print(f"Warmer email: {mail_account.email}")

        cnt_to_send = min(DEFAULT_RAMPUP_INCREMENT * (item.days_passed + 1), DEFAULT_WARMUP_MAX_CNT)

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
        template = WarmingMailTemplate.objects.order_by('?').first()
        if template:
            mail_subject = template.subject
            mail_content = template.content
        else:
            mail_subject = gen.sentence()
            mail_content = gen.paragraph()

        # send email to dest_account
        warmup_email_subject = mail_subject + " " + DEFAULT_WARMUP_MAIL_SUBJECT_SUFFIX
        warmup_email_body = "Dear "
        if dest_account.first_name:
            warmup_email_body += dest_account.first_name + ","
        elif dest_account.last_name:
            warmup_email_body += dest_account.last_name + ","
        else:
            warmup_email_body = "Hello,"
        warmup_email_body += "\n\n" + mail_content + "\n\nYours sincerely,\n\n"
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
            "subject": warmup_email_subject,
            "body": warmup_email_body,
            "uuid": None,
            "track_opens": False,
            "track_linkclick": False
        }
        send_immediate_email.delay(param)

        # log into the DB
        WarmingLog.objects.create(mail_account_id=mail_account.id)


@shared_task
def warming_replier():
    print('Warming replier is called...')

    mail_accounts = EmailAccount.objects.exclude(imap_username__exact='').exclude(imap_username__isnull=True)

    for mail_account in mail_accounts:
        if not mail_account.imap_host or not mail_account.imap_port or not mail_account.imap_username or not mail_account.imap_password:
            continue
        try:
            move_warmups_from_spam_to_inbox(host=mail_account.imap_host,
                                            port=mail_account.imap_port,
                                            username=mail_account.imap_username,
                                            password=mail_account.imap_password,
                                            use_tls=mail_account.use_imap_ssl)
            with MailBox(host=mail_account.imap_host, port=mail_account.imap_port)\
                    .login(mail_account.imap_username,
                     mail_account.imap_password, DEFAULT_WARMUP_FOLDER) as mailbox:
                for msg in mailbox.fetch(AND(seen=False)):
                    # Filter out the warmup emails
                    if (msg.subject.endswith("mailerrize") or msg.subject.endswith("mailerrize?=")) \
                            and "Re:" not in msg.subject:

                        template = WarmingMailTemplate.objects.order_by('?').first()
                        if template:
                            mail_content = template.content
                        else:
                            mail_content = gen.paragraph()

                        warm_reply_subject = "Re: " + msg.subject
                        warm_reply_body = "Hi,\n\n" + mail_content + "\n\nYours truly,\n\n"
                        if mail_account.first_name:
                            warm_reply_body += mail_account.first_name
                        elif mail_account.last_name:
                            warm_reply_body += mail_account.last_name
                        else:
                            warm_reply_body = "Thank you"
                        param = {
                            "host": mail_account.smtp_host,
                            "port": mail_account.smtp_port,
                            "username": mail_account.smtp_username,
                            "password": mail_account.smtp_password,
                            "use_tls": mail_account.use_smtp_ssl,
                            "from_email": mail_account.email,
                            "to_email": [msg.from_],
                            "subject": warm_reply_subject,
                            "body": warm_reply_body,
                            "uuid": None,
                            "track_opens": False,
                            "track_linkclick": False
                        }
                        send_immediate_email.delay(param)
        except OSError:
            print(f"Mail account is invalid : {mail_account}")
        except ConnectionError:
            print(f"Connection aborted : {mail_account}")


@shared_task
def warming_days_counter():
    # Get warming enabled accounts
    enabledAccounts = WarmingStatus.objects.filter(warming_enabled=True).select_related("mail_account")
    for item in enabledAccounts:
        item.days_passed += 1
        item.save()


@shared_task
def send_immediate_email(param):
    result = send_mail_with_smtp(host=param['host'],
                                 port=param['port'],
                                 username=param['username'],
                                 password=param['password'],
                                 use_tls=param['use_tls'],
                                 from_email=param['from_email'],
                                 to_email=[param['to_email']],
                                 subject=param['subject'],
                                 body=param['body'],
                                 uuid=param['uuid'],
                                 track_opens=param['track_opens'],
                                 track_linkclick=param['track_linkclick'])
