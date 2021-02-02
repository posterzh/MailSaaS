from django.urls import path
from . import views


# app_name = 'campaignschedule'
urlpatterns = [

   path('schedule/',views.CampaignScheduleAdd.as_view(), name ='schedule'),
   path('updateschedulemail/',views.UpdateScheduleMail.as_view(), name ='updateschedulemail'),
   path('prints/',views.PrintHey, name ='prints')
   
]
