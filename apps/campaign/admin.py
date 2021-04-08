from django.contrib import admin

from .models import (Campaign, CampaignLeadCatcher, CampaignRecipient,
                     DripEmailModel, EmailOnLinkClick, FollowUpEmail,CampaignLabel)


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('assigned', 'title', 'from_address', 'csvfile', 'created_date_time', 'track_opens', 'track_linkclick', 'terms_and_laws', 'campaign_status', 'id')


@admin.register(CampaignRecipient)
class CampaignRecipientAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'email', 'subject', 'email_body','sent', 'leads','replies', 'opens', 'bounces','engaged', 'lead_status','reciepent_status','unsubscribe','is_delete','id','assigned')


@admin.register(FollowUpEmail)
class CampaignFollowUpEmailAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'waitDays', 'subject', 'email_body')


@admin.register(DripEmailModel)
class CampaignDripEmailModelAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'waitDays', 'subject', 'email_body')


@admin.register(EmailOnLinkClick)
class EmailOnLinkClickAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'waitDays', 'url', 'subject', 'email_body')


@admin.register(CampaignLeadCatcher)
class Campaign_Lead_Catcher(admin.ModelAdmin):
    list_display = ('campaign', 'assigned', 'leadcatcher_recipient', 'of_times')


@admin.register(CampaignLabel)
class CampaignLabelAdmin(admin.ModelAdmin):
    list_display = ('label_name','created_date_time','id')