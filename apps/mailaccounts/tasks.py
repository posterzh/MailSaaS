from celery import shared_task
from .models import EmailAccount
from .utils import *


@shared_task(bind=True)
def test_email(self, mailAccountId):
    mailAccount = EmailAccount.objects.get(pk=mailAccountId)
    print('Sending email from :', mailAccount)

    send_mail_with_smtp(host=mailAccount.smtp_host,
                        port=mailAccount.smtp_port,
                        username=mailAccount.smtp_username,
                        password=mailAccount.smtp_password,
                        use_tls=mailAccount.use_smtp_ssl,
                        from_email=mailAccount.email,
                        to_email=['wangmingxie26@gmail.com'],
                        subject="This is test email",
                        body="Hi, this email is sent by SMTP.")
