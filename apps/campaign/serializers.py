from rest_framework import serializers

from .models import (Campaign, CampaignLeadCatcher, CampaignRecipient, Emails,
                     DripEmailModel, EmailOnLinkClick, FollowUpEmail, CampaignLabel, Recipient, LeadSettings)


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


class CampaignLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignLabel
        fields = '__all__'


class CampaignListSerializer(serializers.ModelSerializer):
    assigned = serializers.CharField(source='assigned.full_name')
    created = serializers.DateTimeField(source='created_date_time', format="%B %d %Y")
    recipients = serializers.IntegerField(read_only=True)
    sent = serializers.IntegerField(read_only=True)
    opens = serializers.IntegerField(read_only=True)
    leads = serializers.IntegerField(read_only=True)
    replies = serializers.IntegerField(read_only=True)
    bounces = serializers.IntegerField(read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'title', 'created', 'campaign_status', 'assigned', 'recipients',
                  'sent', 'opens', 'leads', 'replies', 'bounces']


class ProspectsSerializer(serializers.ModelSerializer):
    sent_count = serializers.IntegerField(read_only=True)
    open_count = serializers.IntegerField(read_only=True)
    click_count = serializers.IntegerField(read_only=True)
    reply_count = serializers.IntegerField(read_only=True)
    lead_count = serializers.IntegerField(read_only=True)
    status = serializers.CharField(default="Not contacted")

    class Meta:
        model = Recipient
        fields = ['email', 'sent_count', 'open_count', 'click_count', 'reply_count', 'lead_count', 'status']


class EmailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Emails
        fields = '__all__'


class CampaignDetailsSerializer(serializers.ModelSerializer):
    emails = EmailsSerializer(many=True, read_only=True, source='current_emails')

    class Meta:
        model = Campaign
        exclude = ('csvfile_op1',)


class CampaignRecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipient
        fields = '__all__'


class LeadSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSettings
        fields = '__all__'
