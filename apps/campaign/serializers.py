from .models import Campaign, CampaignRecipient,FollowUpEmail,DripEmailModel,EmailOnLinkClick,CampaignLeadCatcher
from rest_framework import serializers


class CampaignSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Campaign
        fields = '__all__'

class CampaignEmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = CampaignRecipient
        fields = '__all__'

class FollowUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = FollowUpEmail
        fields = '__all__'

class OnclickSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmailOnLinkClick
        fields = '__all__'
    
class DripEmailSerilizer(serializers.ModelSerializer):

    class Meta:
        model = DripEmailModel
        fields = '__all__'

class CampaignLeadCatcherSerializer(serializers.ModelSerializer):

    class Meta:
        model = CampaignLeadCatcher
        fields = '__all__'