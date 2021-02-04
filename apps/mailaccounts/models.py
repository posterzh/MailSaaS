from django.db import models
from apps.users.models import CustomUser
# Create your models here.

Smtp_Port = (
    ("587",'587'),
    ("25" , "25"),
    ("465","465"),
    ("2525","2525"),
)
Imap_Port = (
    ("993",'993'),
    ("143" , "143"),
    ("995","995"),
)

Provider = (
    ("smtp","Smtp"),
    ("google","Google"),
    ("microsoft","Microsoft"),
)


class SmtpMail(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=200)
    smtp_host = models.CharField(max_length=200)
    smtp_username = models.CharField(max_length=200)
    smtp_password = models.CharField(max_length=200)
    smtp_port = models.CharField(max_length=20,choices=Smtp_Port,default='587')
    imap_host = models.CharField(max_length=200)
    imap_username = models.CharField(max_length=200)
    imap_password = models.CharField(max_length=200)
    imap_port = models.CharField(max_length=20,choices=Imap_Port,default='993')
    provider = models.CharField(max_length=100,choices=Provider,default='Smtp',null=True,blank=True)

    def __str__(self):
        return self.email
