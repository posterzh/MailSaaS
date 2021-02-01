from celery import shared_task
from django.core.mail import send_mail
from .views import MailSendimgtask
import pytz
from .models import Schedule
import requests
import pytz
from django.http import JsonResponse
from datetime import datetime,time,timedelta
# from django_celery_beat.models import PeriodicTask, IntervalSchedule


# schedule, _ = CrontabSchedule.objects.get_or_create(
#     minute='30',
#     hour='*',
#     day_of_week='*',
#      day_of_month='*',
#      month_of_year='*',
#      timezone=pytz.timezone('Canada/Pacific')
#  )send_mail('Subject', 'Message.', 'developer@externlabs.com', ['gauravsurolia@externlabs.com']),



# @shared_task
# def sum(a,b):
#     return a+b    

@shared_task
def send_email_task():
    # send_mail('Subject', 'Message.', 'developer@externlabs.com', ['gauravsurolia@externlabs.com']),
    tz_NY = pytz.timezone('Asia/Kolkata')
    datetime_NY = datetime.now(tz_NY)
    current_time = datetime_NY.strftime("%H:%M:%S")
    all_schedules = Schedule.objects.all()
    for get_time in all_schedules:
        # print('get_time.end_time==>',get_time.end_time)
        schedule_data = Schedule.objects.filter(end_time__lte=get_time.end_time,start_time__gte=get_time.start_time)
        # global sending_mails
        for sending_mails in schedule_data:
            if schedule_data:
                print('schedule_data by filter==>>',schedule_data)
                # print(f'send mail to {sending_mails.user.username} at {current_time} from {sending_mails.mail_account}')
            else:
                print('you have no scheduled mails')


    # schedule_data = Schedule.objects.filter(start_time__lt=current_time)
    # schedule_data = Schedule.objects.filter(start_time__range=[str(timedelta(hours=5)),current_time])
    # schedule_data = Schedule.objects.filter(start_time__range=[get_time.end_time,get_time.start_time])
    # for send_mails in schedule_data:
    #     print(send_mails.user,send_mails.max_email,send_mails.time_zone)
    # print('data.start_time..',schedule_data)

    return "task chng........."
  
    
