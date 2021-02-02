from django.db import models
from django.db.models.enums import Choices
from django.utils.translation import gettext as _
import pytz
from apps.users.models import CustomUser
from django.contrib.postgres.fields import ArrayField
from datetime import date
# Create your models here.
res = [] 
for el in pytz.all_timezones: 
    sub = el.split(', ') 
    res.append(sub)
    res[-1].append(sub[0])

class Schedule(models.Model):
    DAY_CHOICES = (
        ('sunday', 'Sunday'),
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday')
    )
    STRATEGY_CHOICES =(
        ("Space","Space out over the day"),
        ("Send","Send as fast as possible")
    )

    TIMEZONE_CHOICES = res
    
    user = models.OneToOneField(CustomUser,  on_delete=models.CASCADE)
    mail_account = models.EmailField(_("Mail Account"),blank=True,null=True)
    block_days = ArrayField(models.CharField(max_length=500, blank=True),size=8)
    date = models.DateField(default=date.today)
    start_time =models.TimeField(auto_now=False,blank=True,null=True)
    end_time = models.TimeField(auto_now=False,blank=True,null=True)
    time_zone = models.CharField(choices=TIMEZONE_CHOICES,max_length=50)
    max_email= models.PositiveIntegerField(blank=True,null=True)
    strategy = models.CharField(choices=STRATEGY_CHOICES,max_length=20)
    mint_between_sends = models.PositiveIntegerField(blank=True,null=True)
    min_email_send = models.PositiveIntegerField(blank=True,null=True)
    max_email_send = models.PositiveIntegerField(blank=True,null=True)



    def __str__(self):
        return self.user.username

class Email_schedule(models.Model):
 
    mail_account = models.EmailField(_("Mail Account"),blank=True,null=True)
    date = models.DateField(default=date.today)
    time =models.TimeField(auto_now=False,blank=True,null=True)
    recipient = models.CharField(max_length=50)

    subject = models.CharField(max_length=50)
    email_body = models.CharField(max_length=50)


    def __str__(self):
        return self.mail_account
