from rest_framework import  serializers
from .models import Schedule


class CampaignscheduleSerializers(serializers.ModelSerializer):

    class Meta:
        model = Schedule
        fields = ['mail_account','block_days',"date",'start_time','end_time','time_zone','max_email','strategy',
        'mint_between_sends','max_email_send','user']

class ScheduleUpdateSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Schedule
        fields = ['mail_account','block_days',"date",'start_time','end_time','time_zone','max_email','strategy',
        'mint_between_sends','max_email_send']


