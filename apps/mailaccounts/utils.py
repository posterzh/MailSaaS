import imaplib
import re
import smtplib
import sys
import time

from django.core import mail
from django.core.mail.backends.smtp import EmailBackend


def check_email(request):
    if request.data['email_provider'] == 'SMTP':
        if not check_smtp(server=request.data['smtp_host'],
                            port=request.data['smtp_port'],
                            use_tls=request.data['use_smtp_ssl'],
                            user=request.data['smtp_username'],
                            password=request.data['smtp_password']):
            return False, "SMTP test failed."

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