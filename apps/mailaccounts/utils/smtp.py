import datetime
import imaplib
import json
import re
import smtplib
import email
import sys
import time
import pandas as pd
from datetime import timedelta

from django.core import mail
from django.core.mail.backends.smtp import EmailBackend
from django.db import connection

from apps.campaign.models import SendingObject, CampaignRecipient, EmailOutbox, Campaign, Recipient
from apps.mailaccounts.models import EmailAccount
from apps.mailaccounts.utils.tracking import add_tracking
from mail.settings import DEFAULT_WARMUP_MAIL_SUBJECT_SUFFIX, DEFAULT_WARMUP_FOLDER

from .sqls import schedule_sql_template

pattern_uid = re.compile('.*\d+ \(UID (?P<uid>\d+)\).*')


def check_email(request):
    if request.data['email_provider'] == 'SMTP':
        if request.data['smtp_host']:
            if not check_smtp(server=request.data['smtp_host'],
                              port=request.data['smtp_port'],
                              use_tls=request.data['use_smtp_ssl'],
                              user=request.data['smtp_username'],
                              password=request.data['smtp_password']):
                return False, "SMTP test failed."

        if request.data['imap_host']:
            if not check_imap(server=request.data['imap_host'],
                              port=request.data['imap_port'],
                              use_tls=request.data['use_imap_ssl'],
                              user=request.data['imap_username'],
                              password=request.data['imap_password']):
                return False, "IMAP test failed."

    return True, "Success"


def check_smtp(server, port, use_tls, user, password):
    try:
        server = smtplib.SMTP(server, port)
        server.set_debuglevel(1)
        if use_tls:
            server.starttls()
        server.ehlo()
        output = server.login(user, password)
        server.quit()
        return True
    except Exception as e:
        return False


def check_imap(server, port, use_tls, user, password):
    imaplib.Debug = 4

    # 1)
    # server = imaplib.IMAP4_SSL(server, port)
    # if use_tls:
    #     server.starttls()

    # 2)
    # server = imaplib.IMAP4_SSL(server, port) if use_tls else imaplib.IMAP4(server, port)

    # 3)
    server = imaplib.IMAP4_SSL(server, port)

    try:
        rv, data = server.login(user, password)
    except Exception as e:
        return False

    server.logout()
    return True


def send_mail_with_smtp(host, port, username, password, use_tls, from_email, to_email,
                        subject, body, uuid, track_opens, track_linkclick):
    body = f'<html><body>{body}<table><tr><td style="opacity: {uuid};"></td></tr></table></body></html>'

    tracking_body = add_tracking(body, uuid, track_opens, track_linkclick)

    try:
        con = mail.get_connection()
        con.open()
        print('Django connected to the SMTP server')

        mail_obj = EmailBackend(
            host=host,
            port=port,
            username=username,
            password=password,
            use_tls=use_tls,
            use_ssl=False,
            timeout=10
        )
        msg = mail.EmailMultiAlternatives(
            subject=subject,
            body=tracking_body,
            from_email=from_email,
            to=to_email,
            connection=con,
        )
        msg.attach_alternative(tracking_body, "text/html");

        mail_obj.send_messages([msg])
        print('Email has been sent.')

        mail_obj.close()
        print('SMTP server closed')
        return True

    except Exception as _error:
        print('Error in sending mail >> {}'.format(_error))

    return False


def receive_mail_with_imap(host, port, username, password, use_tls):
    if use_tls:
        mail = imaplib.IMAP4_SSL(host, port)
    else:
        mail = imaplib.IMAP4_SSL(host, port)

    try:
        mail.login(username, password)
    except Exception as e:
        return False

    mail.select('inbox')

    status, data = mail.search(None, '(UNSEEN)')
    mail_ids = []
    for block in data:
        mail_ids += block.split()

    emails = []
    for num in mail_ids:
        status, data = mail.fetch(num, '(RFC822)')

        for response_part in data:
            if isinstance(response_part, tuple):
                # we go for the content at its second element
                # skipping the header at the first and the closing
                # at the third
                message = email.message_from_bytes(response_part[1])

                mail_from = message['from']
                mail_subject = message['subject']

                if message.is_multipart():
                    mail_content = ''

                    for part in message.get_payload():
                        if part.get_content_type() == 'text/plain':
                            mail_content += part.get_payload()
                else:
                    mail_content = message.get_payload()

                # print(f'From: {mail_from}')
                # print(f'Subject: {mail_subject}')
                # print(f'Content: {mail_content}')
                email_item = {'from': mail_from, 'subject': mail_subject, 'content': mail_content}
                emails.append(email_item)

        status, data = mail.store(num, '+FLAGS', '\\Seen')
        # print("Set as seen: ", status, data)

    return emails


def parse_uid(data):
    match = pattern_uid.match(data)
    return match.group('uid')


def move_warmups_from_spam_to_inbox(host, port, username, password, use_tls):
    if use_tls:
        mail = imaplib.IMAP4_SSL(host, port)
    else:
        mail = imaplib.IMAP4_SSL(host, port)

    try:
        mail.login(username, password)
    except Exception as e:
        return False

    mail.select('spam')
    if mail.state == 'AUTH':
        mail.select('junk')
    if mail.state == 'AUTH':
        return False

    status, data = mail.search(None, '(UNSEEN)')
    mail_ids = []
    for block in data:
        mail_ids += block.split()

    for num in mail_ids:
        status, data = mail.fetch(num, '(RFC822)')

        is_warmup_email = False

        for response_part in data:
            if isinstance(response_part, tuple):
                # we go for the content at its second element
                # skipping the header at the first and the closing
                # at the third
                message = email.message_from_bytes(response_part[1])

                mail_subject = message['subject']
                if mail_subject.endswith("mailerrize") or mail_subject.endswith("mailerrize?="):
                    is_warmup_email = True
                break

        mail.store(num, '-FLAGS', '\\Seen')
        if is_warmup_email:
            resp, data = mail.fetch(num, "(UID)")
            msg_uid = parse_uid(f"{data[0]}")

            result = mail.uid('COPY', msg_uid, DEFAULT_WARMUP_FOLDER)

            if result[0] == 'OK':
                mov, data = mail.uid('STORE', msg_uid, '+FLAGS', '(\Deleted)')
                mail.expunge()


# Parameter
#   [ email_id: EmailAccount ]
#   [ limit: Number ]
# Return Value:
#   [ (camp_id: Campaign,
#       from_email_id: EmailAccount,
#       to_email_id: Recipient,
#       email_subject: Text,
#       email_body: Text) ]
def get_emails_to_send(available_email_ids, email_limits):
    # TODO: send emails per campaign
    arr = []
    for email_id, limit in zip(available_email_ids, email_limits):
        arr.append(schedule_email(email_id, limit))
    emails = pd.concat(arr)
    return json.loads(emails.to_json(orient='records'))

    # test data
    # return [{'camp_id': 76,
    #                     'from_email_id': 34,
    #                     'to_email_id': 28,
    #                     'email_subject': 'Test email',
    #                     'email_body': 'How are you?'}]


def get_all_emails(email_id):
    schedule_sql = schedule_sql_template % email_id

    with connection.cursor() as cursor:
        cursor.execute(schedule_sql)
        rows = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]

    df_emails = pd.DataFrame(rows, columns=columns)

    return df_emails


def get_followup_emails(df_emails, followup_emails_count):
    df_followup_emails = df_emails[
        (df_emails["email_type"] == 1) &
        (df_emails["leads"] == 0) &
        (df_emails["emailoutbox_id"].isnull())]

    followup_emails = pd.DataFrame(columns=df_emails.columns)
    for index, followup_email in df_followup_emails.iterrows():
        main_email = df_emails[
            (df_emails["campaign_id"] == followup_email["campaign_id"])
            & (df_emails["email_type"] == 0)
            & (df_emails["recipient_email"] == followup_email["recipient_email"])]

        if main_email["emailoutbox_id"].isnull().bool():
            continue

        last_sent_time = datetime.combine(main_email.iloc[0].sent_date,
                                          main_email.iloc[0].sent_time)

        if followup_email.email_order > 1:
            previous_email_order = followup_email.email_order - 1
            previous_follow_email = df_emails[
                (df_emails["campaign_id"] == followup_email["campaign_id"])
                & (df_emails["email_type"] == 1)
                & (df_emails["recipient_email"] == followup_email["recipient_email"])
                & (df_emails["email_order"] == previous_email_order)]

            if previous_follow_email["emailoutbox_id"].isnull().bool():
                continue

            last_sent_time = datetime.combine(previous_follow_email.iloc[0].sent_date,
                                              previous_follow_email.iloc[0].sent_time)

        should_send_time = last_sent_time + timedelta(days=followup_email.wait_days)
        now = datetime.now()
        if should_send_time > now:
            continue

        followup_email["email_body"] = convert_template(
            followup_email["email_body"], followup_email["replacement"]
        )

        followup_emails = followup_emails.append(followup_email)

    followup_emails = followup_emails.head(followup_emails_count)

    return followup_emails


def get_main_emails(df_emails, main_emails_count):
    df_main_emails = df_emails[
        (df_emails["email_type"] == 0) &
        (df_emails["emailoutbox_id"].isnull())]
    main_emails = df_main_emails.head(main_emails_count)

    main_emails["email_body"] = main_emails.apply(
        lambda x: convert_template(x["email_body"], json.loads(x["replacement"])),
        axis=1
    )

    return main_emails


def get_drip_emails(df_emails):
    df_drip_emails = df_emails[
        (df_emails["email_type"] == 2) &
        (df_emails["emailoutbox_id"].isnull())]

    drip_emails = pd.DataFrame(columns=df_emails.columns)
    for index, drip_email in df_drip_emails.iterrows():
        main_email = df_emails[
            (df_emails["campaign_id"] == drip_email["campaign_id"])
            & (df_emails["email_type"] == 0)
            & (df_emails["recipient_email"] == drip_email["recipient_email"])]

        if main_email["emailoutbox_id"].isnull().bool():
            continue

        last_sent_time = datetime.combine(main_email.iloc[0].sent_date,
                                          main_email.iloc[0].sent_time)

        if drip_email.email_order > 1:
            previous_email_order = drip_email.email_order - 1
            previous_drip_email = df_emails[
                (df_emails["campaign_id"] == drip_email["campaign_id"])
                & (df_emails["email_type"] == 2)
                & (df_emails["recipient_email"] == drip_email["recipient_email"])
                & (df_emails["email_order"] == previous_email_order)]

            if previous_drip_email["emailoutbox_id"].isnull().bool():
                continue

            last_sent_time = datetime.combine(previous_drip_email.iloc[0].sent_date,
                                              previous_drip_email.iloc[0].sent_time)

        should_send_time = last_sent_time + timedelta(days=drip_email.wait_days)
        now = datetime.now()
        if should_send_time > now:
            continue

        drip_email["email_body"] = convert_template(
            drip_email["email_body"], drip_email["replacement"]
        )

        drip_emails = drip_emails.append(drip_email)

    return drip_emails


def convert_template(template, replacement):
    for key in replacement.keys():
        key_match = "{{" + key + "}}"
        if key_match in template:
            if replacement[key] is None:
                template = template.replace(key_match, '')
            else:
                template = template.replace(key_match, replacement[key])

    return template


def schedule_email(email_id, email_limit):
    df_emails = get_all_emails(email_id)

    followup_emails_count = int(email_limit / 2)
    followup_emails = get_followup_emails(df_emails, followup_emails_count)

    main_emails_count = email_limit - followup_emails.shape[0]
    main_emails = get_main_emails(df_emails, main_emails_count)

    drip_emails = get_drip_emails(df_emails)

    emails = pd.concat([main_emails, followup_emails, drip_emails])
    emails['from_email_id'] = email_id
    emails.rename(columns={'campaign_id': 'camp_id', 'recipient_id': 'to_email_id'}, inplace=True)

    return emails
