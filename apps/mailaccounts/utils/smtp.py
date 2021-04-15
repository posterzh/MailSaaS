import imaplib
import json
import re
import smtplib
import email
import ssl
import sys
import time
import pandas as pd
from datetime import timedelta, datetime

from django.conf import settings
from django.core import mail
from django.core.mail.backends.smtp import EmailBackend
from django.db import connection

from apps.campaign.models import CampaignRecipient, EmailOutbox, Campaign, Recipient
from apps.mailaccounts.models import EmailAccount
from apps.mailaccounts.utils.tracking import add_tracking
from mail.settings import DEFAULT_WARMUP_MAIL_SUBJECT_SUFFIX, DEFAULT_WARMUP_FOLDER

from .sqls import schedule_sql_template

pattern_uid = re.compile(r'.*\d+ \(UID (?P<uid>\d+)\).*')

GOOGLE_SMTP_HOST = 'smtp.gmail.com'
GOOGLE_SMTP_PORT = '587'
GOOGLE_SMTP_USE_TLS = True
GOOGLE_IMAP_HOST = 'imap.gmail.com'
GOOGLE_IMAP_PORT = '993'
GOOGLE_IMAP_USE_TLS = True

MICROSOFT_SMTP_HOST = 'smtp.office365.com'
MICROSOFT_SMTP_PORT = '587'
MICROSOFT_SMTP_USE_TLS = True
MICROSOFT_IMAP_HOST = 'outlook.office365.com'
MICROSOFT_IMAP_PORT = '993'
MICROSOFT_IMAP_USE_TLS = True


def check_email(request):
    if request.data['email_provider'] == 'Google':
        request.data['smtp_host'] = GOOGLE_SMTP_HOST
        request.data['smtp_port'] = GOOGLE_SMTP_PORT
        request.data['use_smtp_ssl'] = GOOGLE_SMTP_USE_TLS
        request.data['smtp_username'] = request.data['email']
        # request.data['smtp_password']

        request.data['imap_host'] = GOOGLE_IMAP_HOST
        request.data['imap_port'] = GOOGLE_IMAP_PORT
        request.data['use_imap_ssl'] = GOOGLE_IMAP_USE_TLS
        request.data['imap_username'] = request.data['email']
        request.data['imap_password'] = request.data['password']
    elif request.data['email_provider'] == 'Microsoft':
        request.data['smtp_host'] = MICROSOFT_SMTP_HOST
        request.data['smtp_port'] = MICROSOFT_SMTP_PORT
        request.data['use_smtp_ssl'] = MICROSOFT_SMTP_USE_TLS
        request.data['smtp_username'] = request.data['email']
        request.data['smtp_password'] = request.data['password']

        request.data['imap_host'] = MICROSOFT_IMAP_HOST
        request.data['imap_port'] = MICROSOFT_IMAP_PORT
        request.data['use_imap_ssl'] = MICROSOFT_IMAP_USE_TLS
        request.data['imap_username'] = request.data['email']
        request.data['imap_password'] = request.data['password']

    # Check SMTP
    if request.data['smtp_host']:
        if not check_smtp(server=request.data['smtp_host'],
                          port=request.data['smtp_port'],
                          use_tls=request.data['use_smtp_ssl'],
                          user=request.data['smtp_username'],
                          password=request.data['smtp_password']):
            return False, "SMTP test failed."

    # Check IMAP
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
        eb = EmailBackend(
            host=host,
            port=port,
            username=username,
            password=password,
            use_tls=use_tls,
            use_ssl=False,
            timeout=20
        )
        eb.open()
        print('Django connected to the SMTP server')

        msg = mail.EmailMultiAlternatives(
            subject=subject,
            body=tracking_body,
            from_email=from_email,
            to=to_email,
        )
        msg.attach_alternative(tracking_body, "text/html");

        eb.send_messages([msg])
        print('Email has been sent.')

        eb.close()
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

    # Check if mailerrize folder exists
    mail.select(DEFAULT_WARMUP_FOLDER)
    if mail.state == 'AUTH':
        mail.create(DEFAULT_WARMUP_FOLDER)

    # Select spam folder
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

            try:
                result = mail.uid('COPY', msg_uid, DEFAULT_WARMUP_FOLDER)
                if result[0] == 'OK':
                    mov, data = mail.uid('STORE', msg_uid, '+FLAGS', '(\Deleted)')
                    mail.expunge()
            except Exception as e:
                None


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
    arr = []
    for email_id, limit in zip(available_email_ids, email_limits):
        try:
            arr.append(schedule_per_email_account(email_id, limit))
        except ValueError:
            continue

    result = []
    if len(arr) != 0:
        email_sending_limit = getattr(settings, "EMAIL_SENDING_LIMIT", 10)
        emails = pd.concat(arr).head(email_sending_limit)
        result = json.loads(emails.to_json(orient='records'))

    return result

    # test data
    # return [{'camp_id': 29,
    #                     'from_email_id': 34,
    #                     'to_email_id': 25,
    #                     'email_subject': 'Test email',
    #                     'email_body': 'How are you?'}]


def get_all_emails(campaign_id):
    schedule_sql = schedule_sql_template % campaign_id

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
            (df_emails["email_type"] == 0)
            & (df_emails["recipient_email"] == followup_email["recipient_email"])]

        main_email = main_email.sort_values(by=['sent_date', 'sent_time'], ascending=False)
        if main_email["emailoutbox_id"].head(1).isnull().bool():
            continue

        last_sent_time = datetime.combine(main_email.iloc[0].sent_date,
                                          main_email.iloc[0].sent_time)

        if followup_email.email_order >= 1:
            previous_email_order = followup_email.email_order - 1
            previous_follow_email = df_emails[
                (df_emails["email_type"] == 1)
                & (df_emails["recipient_email"] == followup_email["recipient_email"])
                & (df_emails["email_order"] == previous_email_order)]

            previous_follow_email = previous_follow_email.sort_values(by=['sent_date', 'sent_time'], ascending=False)
            if previous_follow_email["emailoutbox_id"].head(1).isnull().bool():
                continue

            last_sent_time = datetime.combine(previous_follow_email.iloc[0].sent_date,
                                              previous_follow_email.iloc[0].sent_time)

        should_send_time = last_sent_time + timedelta(days=followup_email.wait_days)
        now = datetime.now()
        if should_send_time > now:
            continue

        followup_email["email_subject"] = convert_template(
            followup_email["email_subject"], json.loads(followup_email["replacement"])
        )
        followup_email["email_body"] = convert_template(
            followup_email["email_body"], json.loads(followup_email["replacement"])
        )

        followup_emails = followup_emails.append(followup_email)

    followup_emails = followup_emails.head(followup_emails_count)

    return followup_emails


def get_main_emails(df_emails, main_emails_count):
    df_main_emails = df_emails[
        (df_emails["email_type"] == 0) &
        (df_emails["emailoutbox_id"].isnull())]
    main_emails = df_main_emails.head(main_emails_count)

    main_emails["email_subject"] = main_emails.apply(
        lambda x: convert_template(x["email_subject"], json.loads(x["replacement"])),
        axis=1
    )
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
            (df_emails["email_type"] == 0)
            & (df_emails["recipient_email"] == drip_email["recipient_email"])]

        main_email = main_email.sort_values(by=['sent_date', 'sent_time'], ascending=False)
        if main_email["emailoutbox_id"].head(1).isnull().bool():
            continue

        last_sent_time = datetime.combine(main_email.iloc[0].sent_date,
                                          main_email.iloc[0].sent_time)

        if drip_email.email_order >= 1:
            previous_email_order = drip_email.email_order - 1
            previous_drip_email = df_emails[
                (df_emails["email_type"] == 2)
                & (df_emails["recipient_email"] == drip_email["recipient_email"])
                & (df_emails["email_order"] == previous_email_order)]

            previous_drip_email = previous_drip_email.sort_values(by=['sent_date', 'sent_time'], ascending=False)
            if previous_drip_email["emailoutbox_id"].head(1).isnull().bool():
                continue

            last_sent_time = datetime.combine(previous_drip_email.iloc[0].sent_date,
                                              previous_drip_email.iloc[0].sent_time)

        should_send_time = last_sent_time + timedelta(days=drip_email.wait_days)
        now = datetime.now()
        if should_send_time > now:
            continue

        drip_email["email_subject"] = convert_template(
            drip_email["email_subject"], json.loads(drip_email["replacement"])
        )
        drip_email["email_body"] = convert_template(
            drip_email["email_body"], json.loads(drip_email["replacement"])
        )

        drip_emails = drip_emails.append(drip_email)

    return drip_emails


def convert_template(template, replacement):
    if not replacement:
        return template

    if type(replacement) == str:
        replacement = json.loads(replacement)

    for key in replacement.keys():
        key_match = "{{" + key + "}}"
        if key_match in template:
            if replacement[key] is None:
                template = template.replace(key_match, '')
            else:
                template = template.replace(key_match, replacement[key])

    return template


def schedule_per_email_account(email_id, email_limit):
    campaigns = Campaign.objects.filter(from_address=email_id, campaign_status=True, is_draft=False, is_deleted=False) \
        .values()

    sub_emails_arr = []
    campaign_limit = email_limit
    for campaign in campaigns:
        campaign_id = campaign["id"]
        sub_emails_per_campaign = schedule_per_campaign(campaign_id, campaign_limit)
        sub_emails_arr.append(sub_emails_per_campaign)

        campaign_limit -= len(sub_emails_per_campaign)
        if campaign_limit <= 0:
            break

    emails_per_campaign = pd.concat(sub_emails_arr)
    emails_per_campaign['from_email_id'] = email_id
    return emails_per_campaign


def schedule_per_campaign(campaign_id, campaign_limit):
    df_emails = get_all_emails(campaign_id)

    followup_emails_count = int(campaign_limit / 2)
    followup_emails = get_followup_emails(df_emails, followup_emails_count)

    main_emails_count = campaign_limit - followup_emails.shape[0]
    main_emails = get_main_emails(df_emails, main_emails_count)

    drip_emails = get_drip_emails(df_emails)

    emails = pd.concat([main_emails, followup_emails, drip_emails])
    emails.rename(columns={'campaign_id': 'camp_id', 'recipient_id': 'to_email_id'}, inplace=True)

    return emails
