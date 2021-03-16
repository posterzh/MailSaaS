import pytz
from django.core.mail.backends.smtp import EmailBackend
from django.db import models

import mail
from apps.users.models import CustomUser

SMTP_PORTS = (
    ("587", '587'),
    ("25", "25"),
    ("465", "465"),
    ("2525", "2525"),
)

IMAP_PORTS = (
    ("993", '993'),
    ("143", "143"),
    ("995", "995"),
)

EMAIL_PROVIDERS = (
    ("SMTP", "SMTP"),
    ("Google", "Google"),
    ("Microsoft", "Microsoft"),
)


class EmailAccount(models.Model):
    # Common fields
    email_provider = models.CharField(max_length=100, choices=EMAIL_PROVIDERS, default='SMTP', null=True, blank=True)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200, default='', null=True, blank=True)
    last_name = models.CharField(max_length=200, default='', null=True, blank=True)

    # Google, Microsoft fields
    password = models.CharField(max_length=200, default='', null=True, blank=True)

    # SMTP fields
    smtp_host = models.CharField(max_length=200, blank=True, null=True)
    smtp_port = models.CharField(max_length=20, choices=SMTP_PORTS, default='587', blank=True, null=True)
    smtp_username = models.CharField(max_length=200, blank=True, null=True)
    smtp_password = models.CharField(max_length=200, blank=True, null=True)
    use_smtp_ssl = models.BooleanField(default=False)

    imap_host = models.CharField(max_length=200, blank=True, null=True)
    imap_port = models.CharField(max_length=20, choices=IMAP_PORTS, default='993', blank=True, null=True)
    imap_username = models.CharField(max_length=200, blank=True, null=True)
    imap_password = models.CharField(max_length=200, blank=True, null=True)
    use_imap_ssl = models.BooleanField(default=False)

    def __str__(self):
        return self.email


class SMTPManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(email_provider='SMTP')


class SMTPAccount(EmailAccount):
    objects = SMTPManager()

    class Meta:
        proxy = True


class GoogleManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(email_provider="Google")


class GoogleAccount(EmailAccount):
    objects = GoogleManager()

    class Meta:
        proxy = True


class MicrosoftManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(email_provider="Microsoft")


class MicrosoftAccount(EmailAccount):
    objects = MicrosoftManager()

    class Meta:
        proxy = True


# Sending calendar
class SendingCalendar(models.Model):
    TIMEZONE_CHOICES = zip(pytz.all_timezones, pytz.all_timezones)

    mail_account = models.ForeignKey(EmailAccount, on_delete=models.CASCADE)
    block_days = models.PositiveIntegerField()
    start_time = models.TimeField(auto_now=False)
    end_time = models.TimeField(auto_now=False)
    time_zone = models.CharField(choices=TIMEZONE_CHOICES, blank=True, default='', max_length=50)
    max_emails_per_day = models.PositiveIntegerField(default=20)
    minutes_between_sends = models.PositiveIntegerField(default=12)
    min_emails_to_send = models.PositiveIntegerField(default=1)
    max_emails_to_send = models.PositiveIntegerField(default=1)

    def __str__(self):
        return str(self.user.email)


def check_smtp_email(server, port, email, password):
    import smtplib
    import ssl

    smtp_server = server
    port = port  # For starttls
    sender_email = email
    password = password

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        server = smtplib.SMTP(smtp_server,port)
        server.ehlo() # Can be omitted
        server.starttls(context=context) # Secure the connection
        server.ehlo() # Can be omitted
        # server.login(sender_email, password)
        login_status = server.login(sender_email, password)
        return login_status
        # TODO: Send email here
    except Exception as e:
        # Print any error messages to stdout
        print("error = ",e)
        return str(e)
    # finally:
    #     server.quit()


def send_mail_with_smtp(host, host_port, host_user, host_pass, send_to, subject, msg):
    try:
        con = mail.get_connection()
        con.open()
        mail_obj = EmailBackend(
            host=host,
            port=host_port,
            password=host_pass,
            username=host_user,
            use_tls=False,
            use_ssl=False,
            timeout=10
        )
        msg = mail.EmailMessage(
            subject=subject,
            body=msg,
            from_email=host_user,

            to=send_to,
            connection=con,
        )
        mail_obj.send_messages([msg])

        print('Message has been sent.')

        mail_obj.close()
        con.close()
        print('SMTP server closed')
        return True

    except Exception as _error:
        print('Error in sending mail >> {}'.format(_error))
        return False