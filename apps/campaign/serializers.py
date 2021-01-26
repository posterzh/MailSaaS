from .models import Campaign, Campaign_email,Follow_up_email,Drip_email,On_Link_Click,CampaignLeadCatcher
from rest_framework import serializers


class CampaignSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Campaign
        fields = '__all__'

class CampaignEmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campaign_email
        fields = '__all__'


class CampaignViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campaign
        fields = '__all__'

class FollowUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = Follow_up_email
        fields = '__all__'

class OnclickSerializer(serializers.ModelSerializer):

    class Meta:
        model = On_Link_Click
        fields = '__all__'
    
class DripEmailSerilizer(serializers.ModelSerializer):

    class Meta:
        model = Drip_email
        fields = '__all__'

class CampaignLeadCatcherSerializer(serializers.ModelSerializer):

    class Meta:
        model = CampaignLeadCatcher
        fields = '__all__'