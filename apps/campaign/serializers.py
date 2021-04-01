from rest_framework import serializers

from .models import (Campaign, CampaignLeadCatcher, CampaignRecipient, SendingObject,
                     DripEmailModel, EmailOnLinkClick, FollowUpEmail, CampaignLabel, Recipient)


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
        fields = ['id', 'title', 'created', 'assigned', 'recipients',
                  'sent', 'opens', 'leads', 'replies', 'bounces']


class ProspectsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='full_name')
    campaign_title = serializers.CharField(source='campaign.title')
    created = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()
    status = serializers.CharField(source='lead_status')
    campaign_count = serializers.SerializerMethodField()
    sent_count = serializers.SerializerMethodField()
    open_count = serializers.SerializerMethodField()
    click_count = serializers.SerializerMethodField()
    reply_count = serializers.SerializerMethodField()
    lead_count = serializers.SerializerMethodField()
    engaged_count = serializers.SerializerMethodField()

    class Meta:
        model = CampaignRecipient
        fields = '__all__'

    def get_created(self, obj):
        return obj.created_date_time.strftime("%B %d, %Y")

    def get_updated(self, obj):
        return obj.update_date_time.strftime("%B %d, %Y")

    def get_campaign_count(self, obj):
        campaign_count = CampaignRecipient.objects.filter(email=obj.email).distinct('campaign').count()
        return campaign_count

    def get_sent_count(self, obj):
        sent = CampaignRecipient.objects.filter(email=obj.email, sent=True).count()
        return sent

    def get_open_count(self, obj):
        _open = CampaignRecipient.objects.filter(email=obj.email, opens=True).count()
        return _open

    def get_click_count(self, obj):
        click = CampaignRecipient.objects.filter(email=obj.email, has_link_clicked=True).count()
        return click

    def get_reply_count(self, obj):
        reply = CampaignRecipient.objects.filter(email=obj.email, replies=True).count()
        return reply

    def get_lead_count(self, obj):
        lead = CampaignRecipient.objects.filter(email=obj.email, leads=True).count()
        return lead

    def get_engaged_count(self, obj):
        engaged = CampaignRecipient.objects.filter(email=obj.email, engaged=True).count()
        return engaged


class FollowUpDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowUpEmail
        fields = '__all__'


class DripEmailDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DripEmailModel
        fields = '__all__'


class CampaignDetailsSerializer(serializers.ModelSerializer):
    followups = FollowUpDetailsSerializer(many=True, read_only=True)
    drips = DripEmailDetailsSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = '__all__'


class CampaignSendingObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = SendingObject
        fields = '__all__'


class CampaignRecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipient
        fields = '__all__'
