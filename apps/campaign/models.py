from datetime import date

from django.db import models

from apps.mailaccounts.models import EmailAccount
from apps.users.models import CustomUser


class CampaignLabel(models.Model):
    label_name = models.CharField(max_length=500)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_date_time = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.lable_name


class Campaign(models.Model):
    title = models.CharField(max_length=200)
    from_address = models.ForeignKey(EmailAccount, on_delete=models.SET_NULL, null=True)
    full_name = models.CharField(max_length=200, blank=True, null=True)
    csvfile_op1 = models.FileField(upload_to='csv_uploads/', blank=True, null=True)
    assigned = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    track_opens = models.BooleanField(default=False)
    track_linkclick = models.BooleanField(default=False)
    # schedule_send = models.BooleanField(default=False)
    # # scheduleDateTime = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    # schedule_date = models.DateField(blank=True, null=True)
    # schedule_time = models.TimeField(blank=True, null=True)
    terms_and_laws = models.BooleanField(default=False)
    campaign_status = models.BooleanField(default=False)  # Start Campaign or Pause Campaign
    label_name = models.ForeignKey(CampaignLabel, on_delete=models.SET_DEFAULT, default=1)
    csv_fields = models.TextField(blank=True, null=True, default='')
    email_subject = models.CharField(max_length=2000, blank=True, null=True)
    email_body = models.TextField(blank=True, null=True)
    # has_follow_up = models.BooleanField(default=False)
    # has_drips = models.BooleanField(default=False)
    created_date_time = models.DateTimeField(auto_now=True)
    update_date_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class CampaignRecipient(models.Model):
    LEAD_TYPE = (

        ("none", "None"),
        ("openLead", "Open Lead"),
        ("wonLead", "Won Lead"),
        ("lostLead", "Lost Lead"),
        ("ignoredLead", "Ignored Lead"),
        ("forwardedLead", "Forwarded Lead"),
    )
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    replacement = models.TextField(blank=True, null=True)
    full_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=200)
    subject = models.CharField(max_length=2000, blank=True, null=True)
    company_name = models.CharField(max_length=1000, blank=True, null=True)
    role = models.CharField(max_length=1000, blank=True, null=True)
    email_body = models.TextField(blank=True, null=True)
    sent = models.BooleanField(default=False)
    leads = models.BooleanField(default=False)
    replies = models.BooleanField(default=False)
    opens = models.BooleanField(default=False)
    has_link_clicked = models.BooleanField(default=False)
    bounces = models.BooleanField(default=False)
    lead_status = models.CharField(max_length=32, choices=LEAD_TYPE, default='none', null=True)
    reciepent_status = models.BooleanField(default=False)  # Start Campaign or Pause Reciepent
    unsubscribe = models.BooleanField(default=False)
    is_delete = models.BooleanField(default=False)
    created_date_time = models.DateTimeField(auto_now=True, blank=True, null=True)
    update_date_time = models.DateTimeField(auto_now=True, blank=True, null=True)
    assigned = models.BooleanField(default=True)
    engaged = models.BooleanField(default=False)

    def __str__(self):
        return str(self.campaign)


class FollowUpEmail(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='followups')
    waitDays = models.PositiveIntegerField(default=1)
    subject = models.CharField(max_length=2000, blank=True, null=True)
    email_body = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.campaign)


class DripEmailModel(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='drips')
    waitDays = models.PositiveIntegerField(default=1)
    subject = models.CharField(max_length=2000, blank=True, null=True)
    email_body = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.campaign)


class EmailOnLinkClick(models.Model):
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE)
    waitDays = models.PositiveIntegerField()
    url = models.CharField(max_length=2000)
    subject = models.CharField(max_length=2000)
    email_body = models.TextField()

    def __str__(self):
        return str(self.campaign)


RECIPIENT = (
    ('replies', "Replies"),
    ('open', "Open"),
    ('click_any_link', "Clicks any link"),
    ('clicks_specific_link', "Clicks specific link"),
)


class CampaignLeadCatcher(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    assigned = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    leadcatcher_recipient = models.CharField(max_length=32, choices=RECIPIENT, default='replies')
    specific_link = models.URLField(max_length=500, null=True, blank=True)
    of_times = models.PositiveIntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.campaign)


class SendingObject(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    from_email = models.ForeignKey(EmailAccount, on_delete=models.CASCADE)
    recipient_email = models.CharField(max_length=50)
    email_subject = models.CharField(max_length=100)
    email_body = models.TextField(blank=True, null=True)
    # 0: intro, 1: follow-up, 2: drip
    email_type = models.PositiveSmallIntegerField(default=0, null=True)
    # 0: not send, 1: sent, 2: xxx
    status = models.PositiveSmallIntegerField(default=0, null=True)
    wait_days = models.PositiveSmallIntegerField(blank=True, null=True)
    email_order = models.PositiveSmallIntegerField(default=0, null=True)

    sent_date = models.DateField(auto_now=False, blank=True, null=True)
    sent_time = models.TimeField(auto_now=False, blank=True, null=True)

    # Email open tracking
    opened = models.PositiveIntegerField(default=0)
    opened_datetime = models.DateTimeField(null=True)

    # Email click tracking
    clicked = models.PositiveIntegerField(default=0)
    clicked_datetime = models.DateTimeField(null=True)


class EmailInbox(models.Model):
    recipient_email = models.ForeignKey(EmailAccount, on_delete=models.CASCADE)
    from_email = models.TextField()
    email_subject = models.TextField()
    email_body = models.TextField(blank=True, null=True)

    # 0: received, 1: processed, 2: xxx
    status = models.PositiveSmallIntegerField(default=0)
    receive_date = models.DateField(auto_now=False, blank=True, null=True)
    receive_time = models.TimeField(auto_now=False, blank=True, null=True)


class Recipient(models.Model):
    LEAD_TYPE = (
        ("none", "None"),
        ("replied", "Replied"),
        ("won", "Won"),
        ("lost", "Lost"),
        ("ignored", "Not Interested")
    )
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    email = models.CharField(max_length=200)
    full_name = models.CharField(max_length=200, null=True)
    replacement = models.TextField(blank=True, null=True)
    sent = models.PositiveSmallIntegerField(default=0, null=True)
    leads = models.PositiveSmallIntegerField(default=0, null=True)
    replies = models.PositiveSmallIntegerField(default=0, null=True)
    opens = models.PositiveSmallIntegerField(default=0, null=True)
    bounces = models.PositiveSmallIntegerField(default=0, null=True)
    clicked = models.PositiveSmallIntegerField(default=0, null=True)
    lead_status = models.CharField(max_length=32, choices=LEAD_TYPE, default='none', null=True)
    recipient_status = models.BooleanField(default=False)  # Start or Pause Recipient
    is_unsubscribe = models.BooleanField(default=False)
    is_delete = models.BooleanField(default=False)
    created_date_time = models.DateTimeField(auto_now=True, blank=True, null=True)
    update_date_time = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return str(self.campaign)


class Emails(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    email_type = models.PositiveSmallIntegerField(default=0, null=True)
    email_subject = models.CharField(max_length=100)
    email_body = models.TextField(blank=True, null=True)
    wait_days = models.PositiveSmallIntegerField(blank=True, null=True)
    email_order = models.PositiveSmallIntegerField(default=0, null=True)
    is_deleted = models.BooleanField(default=False)


class EmailOutbox(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.SET_NULL, null=True)
    from_email = models.ForeignKey(EmailAccount, on_delete=models.SET_NULL, null=True)
    recipient = models.ForeignKey(Recipient, on_delete=models.SET_NULL, null=True)
    email = models.ForeignKey(Emails, on_delete=models.SET_NULL, null=True)
    email_subject = models.CharField(max_length=100)
    email_body = models.TextField(blank=True, null=True)
    status = models.PositiveSmallIntegerField(default=0, null=True)

    sent_date = models.DateField(auto_now=False, blank=True, null=True)
    sent_time = models.TimeField(auto_now=False, blank=True, null=True)

    # Email open tracking
    opened = models.PositiveIntegerField(default=0)
    opened_datetime = models.DateTimeField(null=True)

    # Email click tracking
    clicked = models.PositiveIntegerField(default=0)
    clicked_datetime = models.DateTimeField(null=True)
