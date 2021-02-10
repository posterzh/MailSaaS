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



class WeekDays(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Schedule(models.Model):
    # DAY_CHOICES = (
    #     ('sunday', 'Sunday'),
    #     ('monday', 'Monday'),
    #     ('tuesday', 'Tuesday'),
    #     ('wednesday', 'Wednesday'),
    #     ('thursday', 'Thursday'),
    #     ('friday', 'Friday'),
    #     ('saturday', 'Saturday')
    # )
    STRATEGY_CHOICES =(
        ("SPACE","Space out over the day"),
        ("SEND","Send as fast as possible")
    )

    TIMEZONE_CHOICES = res
    
    user = models.OneToOneField(CustomUser,  on_delete=models.CASCADE)
    mail_account = models.EmailField(_("Mail Account"),blank=True,null=True)
    block_days = models.ManyToManyField(WeekDays)
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
        return str(self.user.email)

class Email_schedule(models.Model):
 
    time =models.TimeField(auto_now=False,blank=True,null=True)
    date = models.DateField(default=date.today)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    mail_account = models.CharField(max_length=50)
    recipient_email = models.CharField(max_length=50)

    subject = models.CharField(max_length=50)
    email_body = models.TextField(blank=True, null=True)


    def __str__(self):
        return self.recipient_email
