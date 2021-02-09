from rest_framework import serializers

from .models import Email_schedule, Schedule


class CampaignscheduleSerializers(serializers.ModelSerializer):

    class Meta:
        model = Schedule
        fields = ['mail_account','block_days',"date",'start_time','end_time','time_zone','max_email','strategy',
        'mint_between_sends','max_email_send','user']

class ScheduleUpdateSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Schedule
        fields = ['mail_account','block_days',"date",'start_time','end_time','time_zone','max_email','strategy',
        'mint_between_sends','max_email_send', 'next_email_send_at_time']


class EmailScheduleSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Email_schedule
        fields = "__all__"


