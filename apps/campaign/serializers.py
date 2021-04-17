from rest_framework import serializers

from .models import (Campaign, CampaignLeadCatcher, CampaignRecipient, Emails,
                     DripEmailModel, EmailOnLinkClick, FollowUpEmail, CampaignLabel, Recipient, LeadSettings, LeadsLog,
                     EmailInbox, EmailOutbox)


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
    from_address = serializers.CharField(source='from_address.email')
    created = serializers.DateTimeField(source='created_date_time', format="%B %d %Y")
    recipients = serializers.IntegerField(read_only=True)
    sent = serializers.IntegerField(read_only=True)
    opens = serializers.IntegerField(read_only=True)
    leads = serializers.IntegerField(read_only=True)
    replies = serializers.IntegerField(read_only=True)
    bounces = serializers.IntegerField(read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'title', 'created', 'campaign_status', 'from_address', 'assigned',
                  'recipients', 'sent', 'opens', 'leads', 'replies', 'bounces']


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


class CampaignOverviewSerializer(serializers.ModelSerializer):
    recipient_count = serializers.IntegerField(read_only=True)
    opened_count = serializers.IntegerField(read_only=True)
    clicked_count = serializers.IntegerField(read_only=True)
    replied_count = serializers.IntegerField(read_only=True)
    bounced_count = serializers.IntegerField(read_only=True)
    test = serializers.IntegerField(read_only=True)

    class Meta:
        model = Emails
        fields = ['id', 'email_type', 'email_order', 'email_subject', 'recipient_count', 'opened_count',
                  'clicked_count', 'replied_count', 'bounced_count', 'test']
        ordering = ['email_type', 'email_order']


class EmailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Emails
        fields = '__all__'


class CampaignDetailsSerializer(serializers.ModelSerializer):
    emails = EmailsSerializer(many=True, read_only=True, source='current_emails')

    class Meta:
        model = Campaign
        exclude = ('csvfile',)


class RecipientSerializer(serializers.ModelSerializer):
    campaign_id = serializers.IntegerField(source='campaign.id', required=False)
    campaign_title = serializers.CharField(source='campaign.title', required=False)
    created = serializers.DateTimeField(source='created_date_time', format="%B %d %Y", required=False)

    class Meta:
        model = Recipient
        fields = '__all__'


class LeadSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSettings
        fields = '__all__'


class EmailInboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailInbox
        fields = '__all__'


class EmailOutboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailOutbox
        fields = '__all__'


class LeadsLogSerializer(serializers.ModelSerializer):
    inbox = EmailInboxSerializer(read_only=True, required=False)
    outbox = EmailOutboxSerializer(read_only=True, required=False)

    class Meta:
        model = LeadsLog
        fields = '__all__'
