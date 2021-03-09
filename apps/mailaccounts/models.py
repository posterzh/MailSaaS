from django.db import models

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
    email_provider = models.CharField(max_length=100, choices=EMAIL_PROVIDERS, default='Smtp', null=True, blank=True)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200, default='')
    last_name = models.CharField(max_length=200, default='')

    # Google, Microsoft fields
    password = models.CharField(max_length=200, default='')

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

