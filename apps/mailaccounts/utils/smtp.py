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

from apps.campaign.models import SendingObject, CampaignRecipient
from apps.mailaccounts.utils.tracking import add_tracking


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
        # server.set_debuglevel(1)
        if use_tls:
            server.starttls()
        server.ehlo()
        output = server.login(user, password)
        server.quit()
        return True
    except Exception as e:
        return False


def check_imap(server, port, use_tls, user, password):
    # imaplib.Debug = 4

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
    # tracking_body = add_tracking(body, uuid)
    #
    # print(f"Sent from {from_email} to {to_email}")
    # print(f"Body: {tracking_body}")
    # return True

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

def get_emails_to_send(available_email_ids, email_limits):
    for email, limit in zip(available_email_ids, email_limits):
        result = get_emails(email, limit)
        print(result)


# from_email_id = 26
# total_mail_count = 20
def get_emails(from_email_id, total_mail_count, campaign = 67):
    max_followup_mail_count = total_mail_count / 2

    items = SendingObject.objects \
        .filter(from_email_id=from_email_id, campaign=campaign) \
        .values()
    df_items = pd.DataFrame(data=items)

    recipients = CampaignRecipient.objects \
        .filter(campaign=campaign, leads=True) \
        .values()
    lead_emails = recipients.values_list('email', flat=True)

    # Follow up emails
    followup_items_all = df_items[(df_items.email_type == 1) & (df_items.status == 0)]

    followup_items = pd.DataFrame(columns=df_items.columns)
    for index, followup_item in followup_items_all.iterrows():
        # Skip leads email
        if followup_item.recipient_email in lead_emails:
            continue

        #
        matching_sent_main_item = df_items[
            (df_items.email_type == 0) &
            (df_items.status == 1) &
            (df_items.recipient_email == followup_item.recipient_email)]

        if len(matching_sent_main_item) == 0:
            continue

        last_sent_time = datetime.combine(matching_sent_main_item.iloc[0].sent_date,
                                          matching_sent_main_item.iloc[0].sent_time)

        if followup_item.email_order >= 1:
            previous_email_order = followup_item.email_order - 1
            previous_sent_followup_item = df_items[
                (df_items.email_type == 1) &
                (df_items.status == 1) &
                (df_items.recipient_email == followup_item.recipient_email) &
                (df_items.email_order == previous_email_order)]

            if len(previous_sent_followup_item) == 0:
                continue

            last_sent_time = datetime.combine(previous_sent_followup_item.iloc[0].sent_date,
                                              previous_sent_followup_item.iloc[0].sent_time)

        should_send_time = last_sent_time + timedelta(days=followup_item.wait_days)
        now = datetime.datetime.now()
        if should_send_time > now:
            continue

        followup_items = followup_items.append(followup_item)

        if len(followup_items) > max_followup_mail_count:
            break

    # Main emails
    max_main_mail_count = total_mail_count - len(followup_items)

    main_items = df_items[(df_items.email_type == 0) & (df_items.status == 0)].head(max_main_mail_count)

    # Drip emails
    drip_items_all = df_items[(df_items.email_type == 2) & (df_items.status == 0)]

    drip_items = pd.DataFrame(columns=df_items.columns)
    for index, drip_item in drip_items_all.iterrows():
        matching_sent_main_item = df_items[
            (df_items.email_type == 0) &
            (df_items.status == 1) &
            (df_items.recipient_email == drip_item.recipient_email)]

        if len(matching_sent_main_item) == 0:
            continue

        last_sent_time = datetime.combine(matching_sent_main_item.iloc[0].sent_date,
                                          matching_sent_main_item.iloc[0].sent_time)

        if drip_item.email_order >= 1:
            previous_email_order = drip_item.email_order - 1
            previous_sent_drip_item = df_items[
                (df_items.email_type == 2) &
                (df_items.status == 1) &
                (df_items.recipient_email == drip_item.recipient_email) &
                (df_items.email_order == previous_email_order)]

            if len(previous_sent_drip_item) == 0:
                continue

            last_sent_time = datetime.combine(previous_sent_drip_item.iloc[0].sent_date,
                                              previous_sent_drip_item.iloc[0].sent_time)

        should_send_time = last_sent_time + timedelta(days=drip_item.wait_days)
        now = datetime.datetime.now()
        if should_send_time > now:
            continue

        drip_items = drip_items.append(drip_item)

    return {
        'main': main_items,
        'followup': followup_items,
        'drip': drip_items
    }
