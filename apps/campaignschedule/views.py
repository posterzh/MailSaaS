from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from .serializers import CampaignscheduleSerializers,ScheduleUpdateSerializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers, status
from django.http import request,Http404,HttpResponse
from django.views.decorators.csrf import csrf_exempt 
from .models import Schedule
from django.core.mail import send_mail
from datetime import datetime, time
from pytz import timezone
from django.conf import settings
from django.http import JsonResponse
# from .tasks import send_email_task
import pytz, datetime
from apps.campaign.models import Campaign, CampaignRecipient
from apps.campaignschedule.serializers import EmailScheduleSerializers
from datetime import datetime,time, timedelta
import random







def change(times,timezones):
    local = pytz.timezone (timezones)
    naive = datetime.datetime.strptime (times,"%H:%M:%S")
    local_dt = local.localize(naive, is_dst=None)
    utc_dt = local_dt.astimezone(pytz.utc)
    convert_time = datetime.datetime.strftime(utc_dt, "%H:%M:%S")
    print('time string ',convert_time)
    return convert_time
    


class CampaignScheduleAdd(CreateAPIView):

    serializer_class = CampaignscheduleSerializers
    permission_classes = (permissions.AllowAny,)
    
    def post(self,request):
        request.data._mutable = True
        request.data['user'] = request.user.id
        start = request.data['start_time']
        timeset = request.data['time_zone']
        end = request.data['end_time'] 
        starting_time = change(start,timeset)
        ending_time = change(end,timeset)
        request.data['start_time'] = starting_time
        request.data['end_time'] = ending_time
        request.data._mutable = False

        print(request.data)
        serializer = CampaignscheduleSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateScheduleMail(APIView):
    serializer_class = CampaignscheduleSerializers
    permission_classes = (permissions.AllowAny,)
    def get_objects(self,request):
        try:
            user = request.user.id
            schedule= Schedule.objects.get(user=user)
            print("schedule ",schedule)
            if(schedule):
                response = {}
                response["schedule_obj"] = schedule
                response["status_code"] = 200
                return response
        except Schedule.DoesNotExist:
            response = {}
            response["status_code"]=400
            return response

    def get(self,request):
        queryset=self.get_objects(request)
        if queryset["status_code"]==400:
            return Response(status=status.HTTP_404_NOT_FOUND)
        elif queryset["status_code"]==200:

            serializer=ScheduleUpdateSerializers(queryset["schedule_obj"])
            return Response(serializer.data)
        return Response({'response':'please active user'})


    def put(self,request):
        queryset=self.get_objects(request)
        print(queryset,"queryset in put")
        timeset = request.data['time_zone']
        start = request.data['start_time']
        end = request.data['end_time'] 
        starting_time = change(start,timeset)
        ending_time = change(end,timeset)
        request.data['start_time'] = starting_time
        request.data['end_time'] = ending_time
        serializer=ScheduleUpdateSerializers(queryset["schedule_obj"],data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    # def get(self,request):
    #     send_mail('Subject', 'Message.', 'developer@externlabs.com', ['gauravsurolia@externlabs.com'],fail_silently=False)
    #     print( ' mail send...........................')
    #     return Response({'status': 'mail done'})



def tries(self):
    FechaIn ="10:00:00"
    FechaFin ="13:59:00"

    meses = []

    start = now = datetime.datetime.strptime(FechaIn, "%H:%M:%S")
    end = datetime.datetime.strptime(FechaFin, "%H:%M:%S")

    
    while now != end:
        meses.append(str(now.strftime("%H:%M:%S")))
        now += datetime.timedelta(minutes=10)

    meses.append(FechaFin)
    print (meses)
    return "taskss"



class PostToSchedule(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        postData = request.data
        # print(postData)

        schedule = Schedule.objects.get(user = request.user.id)

        # print(schedule)

        next_email_send_at_time = schedule.start_time

        if schedule.strategy == 'SPACE':
            min_mail_at_a_time = schedule.min_email_send
            max_mail_at_a_time = schedule.max_email_send
            random_no_of_mails_at_a_time = random.randint(min_mail_at_a_time, max_mail_at_a_time)
        
        elif schedule.strategy == 'SEND':
            random_no_of_mails_at_a_time = max_mail_at_a_time
            
        post_data = []
        
        for camp_id in postData["campaign_ids"]:
            # camp = Campaign.objects.get(id = camp_id)
            camp_email = CampaignRecipient.objects.filter(campaign = camp_id)
            for recipient in camp_email:
                data = {
                    "time": next_email_send_at_time,
                    "date": schedule.date,
                    "user_id": schedule.user.id,
                    "mail_account": schedule.mail_account,
                    "recipient_email": recipient.email,
                    "subject": recipient.subject,
                    "email_body": recipient.email_body,
                }
                post_data.append(data)
        # print(len(post_data), post_data)
        while len(post_data) != 0:
            print(len(post_data), post_data)
            mails_to_send_together = post_data[:random_no_of_mails_at_a_time]
            print()
            print(len(mails_to_send_together),mails_to_send_together)
            print()


            for data in mails_to_send_together:

                data["time"] = next_email_send_at_time
                email_schedule_serlzr = EmailScheduleSerializers(data = data)
                if email_schedule_serlzr.is_valid():
                    print("validddddd")
                    email_schedule_serlzr.save()

                    post_data.remove(data)                    

                    
            delta = timedelta(minutes = schedule.mint_between_sends)
            next_email_send_at_time_str=next_email_send_at_time.strftime('%H:%M:%S')
            next_email_send_at_time_datetime = datetime.strptime(schedule.date.strftime('%Y-%m-%d')+" "+next_email_send_at_time_str, '%Y-%m-%d %H:%M:%S')
            next_email_send_at_time = (next_email_send_at_time_datetime + delta).time()

        # all_campaigns = Campaign.objects.all(campaign_status = True)


        return Response("Done")