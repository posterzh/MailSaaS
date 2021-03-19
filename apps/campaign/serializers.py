from rest_framework import serializers

from .models import (Campaign, CampaignLeadCatcher, CampaignRecipient,
                     DripEmailModel, EmailOnLinkClick, FollowUpEmail, CampaignLabel,
                     Campaigns, CampaignRecipients)


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


class CampaignsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaigns
        fields = '__all__'


class CampaignRecipientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignRecipients
        fields = '__all__'


class CampaignListSerializer(serializers.ModelSerializer):
    """
    {
        "title": 'March 18 Outreach',
        "created": 'Mar 8',
        "assigned": 'Karl',
        "recipients": '2',
        "sent": '4',
        "leads": '2',
        "replies": '0',
        "opens": '1',
        "bounces": '1'
    },
    """
    assigned = serializers.CharField(source='assigned.full_name')
    created = serializers.DateField(source='created_at', format="%B %d")
    recipients = serializers.SerializerMethodField()
    sent = serializers.SerializerMethodField()
    leads = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    opens = serializers.SerializerMethodField()
    bounces = serializers.SerializerMethodField()

    class Meta:
        model = Campaigns
        fields = '__all__'

    def get_recipients(self, obj):
        return CampaignRecipients.objects.filter(campaign=obj.id).count()

    def get_sent(self, obj):
        return CampaignRecipients.objects.filter(campaign=obj.id, is_sent=True).count()

    def get_leads(self, obj):
        return CampaignRecipients.objects.filter(campaign=obj.id, is_lead=True).count()

    def get_opens(self, obj):
        return CampaignRecipients.objects.filter(campaign=obj.id, is_open=True).count()

    def get_replies(self, obj):
        return CampaignRecipients.objects.filter(campaign=obj.id, is_reply=True).count()

    def get_bounces(self, obj):
        return CampaignRecipients.objects.filter(campaign=obj.id, is_bounce=True).count()


class ProspectsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='full_name')
    campaign_title = serializers.CharField(source='campaign.title')
    created = serializers.SerializerMethodField()
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
