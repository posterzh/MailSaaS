import imaplib
import re
import smtplib
import email
import sys
import time

from django.core import mail
from django.core.mail.backends.smtp import EmailBackend

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

