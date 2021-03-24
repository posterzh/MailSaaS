import random
import time
from datetime import datetime, time, timedelta

import pytz
import requests
from celery import shared_task
from django.core.mail import send_mail
from django.http import JsonResponse

from apps.campaign.models import Campaign, CampaignRecipient
from apps.mailaccounts.models import EmailAccount

from .models import Email_schedule, Schedule
from .serializers import EmailScheduleSerializers

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



# @shared_task
# def send_email_task():
    # print("schdule start")
    #
    # email_schedule_data = Email_schedule.objects.all()
    #
    # for email_data in email_schedule_data:
    #     schedule = Schedule.objects.get(user = email_data.user_id)
    #     today_day = datetime.now().strftime("%A")
    #     block_days_list = []
    #     max_email_to_send_today = schedule.max_email
    #     mail_sent_count = 0
    #     min_mail_at_a_time = schedule.min_email_send
    #     max_mail_at_a_time = schedule.max_email_send
    #
    #
    #     # print(min_mail_at_a_time)
    #     # print(max_mail_at_a_time)
    #     # print(random.randint(min_mail_at_a_time, max_mail_at_a_time))
    #
    #     random_no_of_mails_at_a_time = random.randint(min_mail_at_a_time, max_mail_at_a_time)
    #
    #     for i in list(schedule.block_days.values()):
    #         block_days_list.append(i["name"])
    #     # print(datetime.now().time().strftime("%H:%M") == email_data.time.strftime("%H:%M"))
    #     # print(today_day not in block_days_list)
    #     # print(mail_sent_count < max_email_to_send_today)
    #     # print(today_day, block_days_list, datetime.now().time().strftime("%H:%M") == email_data.time.strftime("%H:%M"), today_day not in block_days_list)
    #     if (datetime.now().time().strftime("%H:%M") == email_data.time.strftime("%H:%M")) and (today_day not in block_days_list) and (mail_sent_count < max_email_to_send_today):
    #         # print("email_data.mail_account", type(email_data.mail_account), email_data.mail_account)
    #         email_account_ob = EmailAccount.objects.get(email=email_data.mail_account)
    #         if email_account_ob.provider == "SMTP":
    #             send_mail_with_smtp(email_account_ob.smtp_host, email_account_ob.smtp_port, email_account_ob.smtp_username, email_account_ob.smtp_password, [email_data.recipient_email], email_data.subject, email_data.email_body)
    #             email_data.delete()
    #             mail_sent_count += 1
    #             print("Mail Sent")
    #         # send_mail(email_data.subject, email_data.email_body, email_data.mail_account, [email_data.recipient_email],fail_silently=False)
    #
    #
    #
    #     else:
    #         print("Mail Not Sent")
    #     # print("Mail Send to "+email_data.recipient_email+" from "+email_data.mail_account+" with subjects "+email_data.subject+" with Email "+email_data.email_body)
    # return "Done"
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    # all_schedules=Schedule.objects.all()
    # all_active_campaigns = []
    # campaign_schedule = {}

    # for schedule in all_schedules:
    #     campaigns = Campaign.objects.filter(assigned = schedule.user, campaign_status = True)
    #     if campaigns.exists():
    #         campaign_schedule[campaigns] = schedule
    #         all_active_campaigns.append(campaigns.get())
    # print(all_active_campaigns)

    # for campaign in all_active_campaigns:
    #     print(campaign)
    #     schedule = campaign_schedule[campaigns]
    #     user_id = schedule.user.id
    #     mail_account = schedule.mail_account
    #     start_time = schedule.start_time
    #     end_time =  schedule.end_time
    #     date = schedule.date
    #     strategy = schedule.strategy
    #     max_email = schedule.max_email
    #     gap_between_mails = schedule.mint_between_sends
    #     min_email_send = schedule.min_email_send
    #     max_email_send = schedule.max_email_send
    #     block_days = schedule.block_days

    #     camp_recipients = CampaignRecipient.objects.filter(campaign = campaign.id, leads=False, replies=False, unsubscribe=False, sent=False, reciepent_status=True)

    #     for recipient in camp_recipients:
    #         print(recipient)
    #         block_days_list = []
    #         for i in list(block_days.values()):
    #             block_days_list.append(i["name"])

    #         today_day = datetime.now().strftime("%A")
            
    #         if (strategy == 'SPACE') and (today_day not in block_days_list):
                                
    #             current_time = datetime.now().time()
    #             data = {
    #                 "time": start_time,
    #                 "date": date,
    #                 "user_id": user_id,
    #                 "mail_account": mail_account,
    #                 "recipient_email": recipient.email,
    #                 "subject": recipient.subject,
    #                 "email_body": recipient.email_body,
    #             }
                
    #             email_schedule_serlzr = EmailScheduleSerializers(data = data)
    #             if email_schedule_serlzr.is_valid():
    #                 email_schedule_serlzr.save()















    # all_schedules=Schedule.objects.all()
    # all_active_campaigns = []
    # campaign_schedule = {}
    
    # for schedule in all_schedules:
    #     campaigns = Campaign.objects.filter(assigned = schedule.user, campaign_status = True)
    #     # print(campaigns)
    #     if campaigns.exists():
    #         # schedule = schedule
    #         # mail_account = schedule.mail_account
    #         # start_time = schedule.start_time
    #         # end_time =  schedule.end_time
    #         # date = schedule.date
    #         # strategy = schedule.strategy
    #         # max_email = schedule.max_email
    #         # gap_between_mails = schedule.mint_between_sends
    #         # min_email_send = schedule.min_email_send
    #         # max_email_send = schedule.max_email_send
    #         # block_days = schedule.block_days
    #         # next_email_send_at_time = schedule.next_email_send_at_time
            

    #         campaign_schedule[campaigns] = schedule
    #         all_active_campaigns.append(campaigns)
    # # current_time = datetime.now().time()
    # # print("#######",start_time < end_time, start_time > end_time, current_time > start_time, current_time > end_time, "########")
    # # print("all campaign_schedule = ",campaign_schedule)
    # print("all all_active_campaigns = ",all_active_campaigns)
    
    
    # # print(block_days)
    # all_camp_recipients = []
    # for campaigns in all_active_campaigns:

    #     schedule = campaign_schedule[campaigns]
    #     mail_account = schedule.mail_account
    #     start_time = schedule.start_time
    #     end_time =  schedule.end_time
    #     date = schedule.date
    #     strategy = schedule.strategy
    #     max_email = schedule.max_email
    #     gap_between_mails = schedule.mint_between_sends
    #     min_email_send = schedule.min_email_send
    #     max_email_send = schedule.max_email_send
    #     block_days = schedule.block_days
    #     # next_email_send_at_time = schedule.next_email_send_at_time

    #     campaign = campaigns.get()
    #     # print(campaigns)
    #     mail_sent_count = 0
    #     msg_sent = False
    #     camp_recipients = CampaignRecipient.objects.filter(campaign = campaign.id, leads=False, replies=False, unsubscribe=False, sent=False, reciepent_status=True)
    #     for recipient in camp_recipients:
    #         start_time_str=start_time.strftime('%H:%M')
    #         date_str=date.strftime('%Y-%m-%d')
            

    #         current_time = datetime.now().strftime("%H:%M:%S")
    #         today_day = datetime.now().strftime("%A")
    #         # print(today_day)
    #         # print("timeeee ",current_time, next_email_send_at_time)
            
    #         if (strategy == 'SPACE'):
                
    #             # print("strategy == 'SPACE'")
    #             block_days_list = []
    #             for i in list(block_days.values()):
    #                 block_days_list.append(i["name"])

    #             current_time = datetime.now().time()
    #             print("mail_sent_count",mail_sent_count,"max_email", max_email, "start_time", start_time, "end_time", end_time)
    #             print(start_time <= current_time <= end_time)
    #             print(mail_sent_count <= max_email)
    #             print(today_day not in block_days_list) #, current_time == str(next_email_send_at_time)
    #             if (start_time <= current_time <= end_time) and (mail_sent_count <= max_email) and (today_day not in block_days_list):
    #                 print("Mail Send")
    #                 mail_sent_count += mail_sent_count + 1
    #                 recipient.sent = True
    #                 recipient.save()

    #                 print("sent updated")

    #                 msg_sent = True
    #                 time.sleep(gap_between_mails * 60)
                
                
                # if msg_sent:
                #     delta = timedelta(minutes = gap_between_mails)
                #     next_email_send_at_time_str=next_email_send_at_time.strftime('%H:%M:%S')
                #     next_email_send_at_time_datetime = datetime.strptime(date_str+" "+next_email_send_at_time_str, '%Y-%m-%d %H:%M:%S')

                #     # send_mail(recipient.subject, recipient.email_body, mail_account, [recipient.email],fail_silently=False)

                #     # print((next_email_send_at_time_datetime + timedelta(hours=9)).strftime('%H:%M:%S'))
                #     next_email_send_at_time = (next_email_send_at_time_datetime + delta).time()


                #     schedule.next_email_send_at_time = next_email_send_at_time
                #     schedule.save()
                #     print("Next email time updated")










            # all_camp_recipients.append(recipient)
    # print("all all_camp_recipients = ",all_camp_recipients)

    # all_recipients_emails = []
    # all_recipients_emails_count = len(all_camp_recipients)
    # print("count reccc ",all_recipients_emails_count)
    # mail_sent_count = 0
    # msg_sent = False
    # for recipient in all_camp_recipients:
    #     start_time_str=start_time.strftime('%H:%M')
    #     date_str=date.strftime('%Y-%m-%d')
        

    #     current_time = datetime.now().strftime("%H:%M:%S")
    #     today_day = datetime.now().strftime("%A")
        
    #     if (strategy == 'SPACE'):
            
    #         print("strategy == 'SPACE'")
    #         block_days_list = []
    #         for i in list(block_days.values()):
    #             block_days_list.append(i["name"])

    #         current_time = datetime.now().time()
    #         print("+++++ ",mail_sent_count,max_email, start_time <= next_email_send_at_time <= end_time)
    #         print(mail_sent_count <= max_email, today_day not in block_days_list, "+++++") #, current_time == str(next_email_send_at_time)
    #         if (start_time <= next_email_send_at_time <= end_time) and (mail_sent_count <= max_email) and (today_day not in block_days_list):
    #             print("Mail Send")
    #             mail_sent_count += mail_sent_count + 1
    #             recipient.sent = True
    #             recipient.save()

    #             print("sent updated")

    #             msg_sent = True
    #             # time.sleep(gap_between_mails * 60)
            
    #             if msg_sent:
    #                 delta = timedelta(minutes = gap_between_mails)
    #                 next_email_send_at_time_str=next_email_send_at_time.strftime('%H:%M:%S')
    #                 next_email_send_at_time_datetime = datetime.strptime(date_str+" "+next_email_send_at_time_str, '%Y-%m-%d %H:%M:%S')

    #                 # send_mail(recipient.subject, recipient.email_body, mail_account, [recipient.email],fail_silently=False)

    #                 next_email_send_at_time = (next_email_send_at_time_datetime + delta).time()


    #                 schedule.next_email_send_at_time = next_email_send_at_time
    #                 schedule.save()
    #                 print("Next email time updated")

            

    



   

    # recipients=[]
    # times_list=[]
    # for schedule in all_schedules:

    #     all_campaign=schedule.user.campaign_set.filter(campaign_status=True)
    #     print(all_campaign)
       
    #     date=schedule.date
    #     starttime=schedule.start_time
    #     endtime=schedule.end_time

    #     start_str=starttime.strftime('%H:%M:%S')
    #     end_str=endtime.strftime('%H:%M:%S')
    #     date_str=date.strftime('%Y-%m-%d')
    #     start = datetime.strptime(date_str+" "+start_str, '%Y-%m-%d %H:%M:%S')
    #     end = datetime.strptime(date_str+" "+end_str, '%Y-%m-%d %H:%M:%S')
    #     step = timedelta(minutes=10)
    #     while start <= end:
    #         print(start.time())
    #         p=start.time()
    #         formatedDate = p.strftime("%Y-%m-%d %H:%M:%S")
    #         times_list.append(formatedDate)
    #         start += step
    #     minemailsend=schedule.min_email_send   
    #     for campaign in all_campaign:
            
    #         all_recipient=campaign.campaignrecipient_set.filter(leads=False, replies=False, unsubscribe=False, sent=False, reciepent_status=True)
    #         for recipient_list in all_recipient:
    #             recipients.append(recipient_list.email)
    # number_of_email=len(recipients)+1
    # recipient=[recipients[i:i+minemailsend] for i in range(1,number_of_email,minemailsend)]

    # # print("times_list  ======>>>> ",times_list)
    # # print("recipients", recipient)
  
    
@shared_task
def second_task():
    print("Second task")
