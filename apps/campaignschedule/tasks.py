from celery import shared_task
from django.core.mail import send_mail
from .views import PrintHey
import pytz
from .models import Schedule


# from django_celery_beat.models import CrontabSchedule, PeriodicTask



# schedule, _ = CrontabSchedule.objects.get_or_create(
#     minute='30',
#     hour='*',
#     day_of_week='*',
#      day_of_month='*',
#      month_of_year='*',
#      timezone=pytz.timezone('Canada/Pacific')
#  )




    


@shared_task
def send_email_task():
    # print(request.user)
    # send_mail('Subject', 'Message.', 'developer@externlabs.com', ['divyakhandelwal@externlabs.com']),
    schedules =  Schedule.objects.filter(user=1)

    print("bbbbbbbb ",schedules)
    return "Email done"

    
