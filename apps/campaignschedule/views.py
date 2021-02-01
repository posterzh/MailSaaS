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
from datetime import datetime
from pytz import timezone
from django.conf import settings
from django.http import JsonResponse
# from .tasks import send_email_task


class CampaignScheduleAdd(CreateAPIView):

    serializer_class = CampaignscheduleSerializers
    permission_classes = (permissions.AllowAny,)
    
    def post(self,request):
        request.data._mutable = True
        request.data['user'] = request.user.id
        
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
            timeset = serializer.data['time_zone']
            start = serializer.data['start_time']
            return Response(serializer.data)
        return Response({'response':'please active user'})



    def put(self,request):
        queryset=self.get_objects(request)
        print(queryset,"queryset in put")
        serializer=ScheduleUpdateSerializers(queryset["schedule_obj"],data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @csrf_exempt
# def PrintHey(request):
#     # print(request.user.id)
#     print("hey hey hey hey hey hey")
#     task= send_email_task
#     print('task ', task)
#     return JsonResponse({'status': 'all done'})

class MailSendimgtask(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CampaignscheduleSerializers
   
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
            timeset = serializer.data['time_zone']
            start = serializer.data['start_time']
            return Response(serializer.data)
        return Response({'response':'please active user'})

        


    # def get(self,request):
    #     send_mail('Subject', 'Message.', 'developer@externlabs.com', ['gauravsurolia@externlabs.com'],fail_silently=False)
    #     print( ' mail send...........................')
    #     return Response({'status': 'mail done'})