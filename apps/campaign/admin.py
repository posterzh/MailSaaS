from django.contrib import admin

from .models import Campaign, CampaignRecipient, FollowUpEmail, DripEmailModel, EmailOnLinkClick,CampaignLeadCatcher


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
<<<<<<< HEAD
    list_display = ('title', 'fromAddress','assigned', 'csvFile_op1', 'created_date_time', 'trackOpens', 'trackLinkClick', 'scheduleThisSend','termsAndLaws')
=======
    list_display = ('title', 'from_address','assigned', 'csvfile_op1', 'created_date_time', 'track_opens', 'track_linkclick', 'schedule_send', 'schedule_date', 'schedule_time','terms_and_laws', 'campaign_status')
>>>>>>> e567ab5fab2c60f89bfa50a5c8e0b309eff67cf8


# admin.site.register(LeadType)


@admin.register(CampaignRecipient)
class CampaignRecipientAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'email', 'subject', 'email_body','sent', 'leads','replies', 'opens', 'bounces', 'lead_status','reciepent_status','unsubscribe')


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
