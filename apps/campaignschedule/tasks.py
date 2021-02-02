from celery import shared_task
from django.core.mail import send_mail
import pytz
from .models import Schedule
import requests
import pytz
from django.http import JsonResponse
from datetime import datetime,time, timedelta


from apps.campaign.models import CampaignRecipient,Campaign


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

            
            
# import datetime
# times = []

# date1 = '2011-05-03'
# time1 = ' 10:02:30'
# date2 = '2011-05-03'
# time2 = ' 16:02:30'
# start = datetime.datetime.strptime(date1+time1, '%Y-%m-%d %H:%M:%S')
# end = datetime.datetime.strptime(date2+time2, '%Y-%m-%d %H:%M:%S')
# step = datetime.timedelta(minutes=10)
# while start <= end:
#     print(start.time())
#     p=start.time()
#     formatedDate = p.strftime("%H:%M:%S")
#     times.append(formatedDate)
#     start += step
# print('timess     =====',times )



@shared_task
def send_email_task():
    all_schedules=Schedule.objects.all()
    all_active_campaigns = []
    
    for schedule in all_schedules:
        campaigns = Campaign.objects.filter(assigned = schedule.user, campaign_status = True)
        if campaigns.exists():
            mail_account = schedule.mail_account
            start_time = schedule.start_time
            end_time =  schedule.end_time
            date = schedule.date
            strategy = schedule.strategy
            gap_between_mails = schedule.mint_between_sends
            min_email_send = schedule.min_email_send
            max_email_send = schedule.max_email_send

            all_active_campaigns.append(campaigns)
    
   
    all_camp_recipients = []
    for campaigns in all_active_campaigns:
        camp_recipients = CampaignRecipient.objects.filter(leads=False, replies=False, unsubscribe=False, sent=False, reciepent_status=True)
        for camp_recp in camp_recipients:
            all_camp_recipients.append(camp_recp)
    # print("all all_camp_recipients = ",all_camp_recipients)

    all_recipients_emails = []
    for recipient in all_camp_recipients:
        all_recipients_emails.append(recipient.email)
        start_time_str=start_time.strftime('%H:%M')
        date_str=date.strftime('%Y-%m-%d')
        

        start_datetime = datetime.strptime(date_str+" "+start_time_str, '%Y-%m-%d %H:%M')
        print(datetime.strptime(str(datetime.now()), '%Y-%m-%d %H:%M') == start_datetime)
        # send_mail(recipient.subject, recipient.email_body, mail_account, [recipient.email],fail_silently=False)

    # print("all emails = ",all_recipients_emails)
    



   

    # recipients=[]
    # times_list=[]
    # for schedule in all_schedules:

        # all_campaign=schedule.user.campaign_set.filter(campaign_status=True)
        # print(all_campaign)
#         date=schedule.date
#         starttime=schedule.start_time
#         endtime=schedule.end_time

#         start_str=starttime.strftime('%H:%M:%S')
#         end_str=endtime.strftime('%H:%M:%S')
#         date_str=date.strftime('%Y-%m-%d')

        
#         print(starttime)
#         print(endtime)
#         print(start_str, type(start_str))
#         print(end_str, type(end_str))
#         print(date_str, type(date_str))

#         start_time_str = datetime.datetime.strptime(date_str+" "+start_str, '%Y-%m-%d %H:%M:%S')
#         end_time_str = datetime.datetime.strptime(date_str+" "+end_str, '%Y-%m-%d %H:%M:%S')
#         print(start_time_str, end_time_str)
#         step = timedelta(minutes=10)
#         print("steps = ",step)
#         # while starttime <= endtime:
#         #     # p=starttime
#         #     # formatedDate = p.strftime("%H:%M:%S")
#         #     times_list.append(starttime)
#         #     starttime += step
#         break
#         print(times_list)
#         minemailsend=schedule.mint_email_send   
#         for campaign in all_campaign:
#             all_recipient=campaign.campaignrecipient_set.filter(leads=False,replies=False,unsubscribe=False)
#             for recipient_list in all_recipient:
#                 recipients.append(recipient_list.email)
#     number_of_email=len(recipients)+1
#     recipient=[recipients[i:i+minemailsend] for i in range(1,number_of_email,minemailsend)]
#     print("times_list  ======>>>> ",times_list)
#     print("recipients", recipient)
    return "tasks"
  
    
