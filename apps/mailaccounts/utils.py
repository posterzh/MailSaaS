import imaplib
import re
import smtplib
import sys
import time

from django.core import mail
from django.core.mail.backends.smtp import EmailBackend




def check_smtp_send(ident, smtp_config):
    try:
        fromaddr = smtp_config["from"]
        toaddr = smtp_config["to"]
        server_name = smtp_config["server"]
        port = smtp_config["port"]
        login = smtp_config["login"]
        password = smtp_config["password"]
    except:
        sys.stderr.write("missing parameters in ")
        sys.stdout.write("0\n")

    id_nr = int(time.time())
    subject = "MAIL ROUNDTRIP TESTMAIL %s :: %s\r\n" % (ident, id_nr)
    msg = ("From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n" % (fromaddr, toaddr, subject))

    try:
        server = smtplib.SMTP(server_name, port)

        server.set_debuglevel(1)

        server.starttls()
        server.ehlo()
        server.login(login, password)
        server.sendmail(fromaddr, toaddr, msg)
        server.quit()
    except Exception as e:
        sys.stdout.write("0\n")
        sys.stderr.write("Exception happened:\n")
        sys.stderr.write('*' * 60 + "\n")
        sys.stderr.write("*** " + str(e) + "\n")
        sys.stderr.write('*' * 60 + "\n")
        sys.stderr.write("\n")
        sys.stderr.write('-' * 60 + "\n")
        sys.exit(0)
    sys.stdout.write("1\n")
    sys.exit(0)


def check_imap_receive(ident, imap_config):
    try:
        fromaddr = imap_config["from"]
        server_name = imap_config["server"]
        folder = imap_config["folder"]
        port = imap_config["port"]
        login = imap_config["login"]
        password = imap_config["password"]
    except:
        sys.stderr.write("missing parameters in ")
        sys.stdout.write("0\n")

    imaplib.Debug = 4
    imap = imaplib.IMAP4_SSL(server_name)

    try:
        rv, data = imap.login(login, password)
    except Exception as e:
        print("Exception happened:")
        sys.stderr.write('*' * 60 + "\n")
        sys.stderr.write("*** " + str(e) + "\n")
        sys.stderr.write('*' * 60 + "\n")
        sys.stderr.write("\n")
        sys.stderr.write('-' * 60 + "\n")
        sys.exit(0)

    rv, mailboxes = imap.list()
    if rv == 'OK':
        mailboxes = [mailbox.decode("utf-8") for mailbox in mailboxes]
        sys.stderr.write("Mailboxes:")
        for mailbox in mailboxes:
            sys.stderr.write(mailbox + "\n")

    timestamp = 0
    try:
        imap.select(folder, readonly=False)
        typ, msg_ids = imap.search(None, '(FROM "%s")' % fromaddr)
        whites = re.compile(r'\s+')
        msg_ids = whites.split(msg_ids[0].decode("utf-8"))

        delete_ids = []
        for imap_id in msg_ids:
            if imap_id == '':
                continue
            typ, msg_data = imap.fetch(imap_id, '(RFC822)')

        if len(delete_ids) > 0:
            imap.store(",".join(delete_ids), '+FLAGS', r'(\Deleted)')
            typ, response = imap.expunge()
            sys.stderr.write("Expunged: %s\n" % response)
    finally:
        try:
            imap.close()
        except:
            pass
        imap.logout()
    if timestamp != 0:
        print(int(time.time()) - int(timestamp))
    else:
        print("0")
    sys.exit(0)