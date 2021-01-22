from django.contrib import admin

from .models import Campaign, Campaign_email, Follow_up_email, Drip_email, On_Link_Click


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'fromAddress','assigned', 'csvFile_op1', 'created_date_time', 'trackOpens', 'trackLinkClick', 'scheduleThisSend','scheduleDateTime','termsAndLaws')


@admin.register(Campaign_email)
class Campaign_emailAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'email', 'subject', 'emailBody','sent', 'leads','replies', 'opens', 'bounces')


@admin.register(Follow_up_email)
class CampaignFollow_up_emailAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'waitDays', 'subject', 'emailBody')


@admin.register(Drip_email)
class CampaignDrip_emailAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'waitDays', 'subject', 'emailBody')


@admin.register(On_Link_Click)
class CampaignOn_Link_ClickAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'waitDays', 'url', 'subject', 'emailBody')