from datetime import date

from django.db import models

from apps.mailaccounts.models import EmailAccount
from apps.users.models import CustomUser
from apps.utils.utils import RandomFileName

CAMPAIGN_LEAD_SETTING_OPERATOR = (
    ('and', "AND"),
    ('or', "OR"),
)

LEAD_TYPE = (
    ("none", "None"),
    ("open", "Open"),
    ("won", "Won"),
    ("lost", "Lost"),
    ("ignored", "Not Interested")
)

LEAD_ACTION = (
    ("none", "None"),
    ("opened", "Recipient: Opened Email"),
    ("clicked", "Recipient: Clicked Link"),
    ("replied", "Recipient: Replied"),
    ("sent", "Initial mail sent"),
    ("me_replied", "You: Replied"),
    ("open", "Status: Opened"),
    ("won", "Status: Won"),
    ("lost", "Status: Lost"),
    ("ignored", "Status: Not Interested")
)


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
    csvfile = models.FileField(upload_to=RandomFileName('csv_uploads'), blank=True, null=True)
    csvfile_name = models.CharField(max_length=100, blank=True, null=True)
    csv_fields = models.TextField(blank=True, null=True, default='')
    assigned = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    track_opens = models.BooleanField(default=False)
    track_linkclick = models.BooleanField(default=False)
    terms_and_laws = models.BooleanField(default=False)
    campaign_status = models.BooleanField(default=True)  # True: Start, False: Pause
    is_deleted = models.BooleanField(default=False)
    is_draft = models.BooleanField(default=False)
    label_name = models.ForeignKey(CampaignLabel, on_delete=models.SET_NULL, null=True)
    created_date_time = models.DateTimeField(auto_now=True)
    update_date_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def current_emails(self):
        return Emails.objects.filter(is_deleted=False, campaign=self.id)


class LeadSettings(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    join_operator = models.CharField(max_length=8, choices=CAMPAIGN_LEAD_SETTING_OPERATOR, default='and')
    replies = models.PositiveSmallIntegerField(blank=True, default=0)
    open = models.PositiveSmallIntegerField(blank=True, default=0)
    click_any_link = models.PositiveSmallIntegerField(blank=True, default=0)
    clicks_specific_link = models.PositiveSmallIntegerField(blank=True, default=0)


class Recipient(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    email = models.CharField(max_length=200)
    full_name = models.CharField(max_length=200, null=True)
    replacement = models.TextField(blank=True, null=True)
    sent = models.PositiveSmallIntegerField(default=0)
    leads = models.PositiveSmallIntegerField(default=0)
    replies = models.PositiveSmallIntegerField(default=0)
    opens = models.PositiveSmallIntegerField(default=0)
    bounces = models.PositiveSmallIntegerField(default=0)
    clicked = models.PositiveSmallIntegerField(default=0)
    lead_status = models.CharField(max_length=32, choices=LEAD_TYPE, default='none', null=True)
    recipient_status = models.BooleanField(default=True)  # Start or Pause Recipient
    is_unsubscribe = models.BooleanField(default=False)
    is_delete = models.BooleanField(default=False)
    created_date_time = models.DateTimeField(auto_now=True, blank=True, null=True)
    update_date_time = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return str(self.email)


class Emails(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='emails')
    email_type = models.PositiveSmallIntegerField(default=0, null=True)
    email_subject = models.CharField(max_length=100)
    email_body = models.TextField(blank=True, null=True)
    wait_days = models.PositiveSmallIntegerField(blank=True, null=True)
    email_order = models.PositiveSmallIntegerField(default=0, null=True)
    is_deleted = models.BooleanField(default=False)


class EmailOutbox(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.SET_NULL, blank=True, null=True)
    from_email = models.ForeignKey(EmailAccount, on_delete=models.SET_NULL, blank=True, null=True)
    recipient = models.ForeignKey(Recipient, on_delete=models.SET_NULL, blank=True, null=True)
    email = models.ForeignKey(Emails, on_delete=models.SET_NULL, blank=True, null=True)
    email_subject = models.CharField(max_length=100)
    email_body = models.TextField(blank=True, null=True)
    is_campaign = models.BooleanField(default=True)

    # 0: need to send, 1: sent successfully, 2: failed to send
    status = models.PositiveSmallIntegerField(default=0, null=True)

    sent_date = models.DateField(auto_now=False, blank=True, null=True)
    sent_time = models.TimeField(auto_now=False, blank=True, null=True)

    # Email open tracking
    opened = models.PositiveIntegerField(default=0)
    opened_datetime = models.DateTimeField(null=True)

    # Email click tracking
    clicked = models.PositiveIntegerField(default=0)
    clicked_datetime = models.DateTimeField(null=True)

    # replied (0: no-reply, 1: replied)
    replied = models.PositiveIntegerField(default=0)
    reply_datetime = models.DateTimeField(null=True)

    # bounce (0: no-bounce, 1: bounced)
    bounced = models.PositiveIntegerField(default=0)


class EmailInbox(models.Model):
    outbox = models.ForeignKey(EmailOutbox, on_delete=models.SET_NULL, blank=True, null=True)
    recipient_email = models.ForeignKey(Recipient, on_delete=models.SET_NULL, blank=True, null=True)
    from_email = models.ForeignKey(EmailAccount, on_delete=models.SET_NULL, blank=True, null=True)
    email_subject = models.TextField()
    email_body = models.TextField(blank=True, null=True)

    # 0: received, 1: processed, 2: other
    status = models.PositiveSmallIntegerField(default=0)
    receive_date = models.DateField(auto_now=False, blank=True, null=True)
    receive_time = models.TimeField(auto_now=False, blank=True, null=True)


class LeadsLog(models.Model):
    recipient = models.ForeignKey(Recipient, on_delete=models.CASCADE)
    lead_action = models.CharField(max_length=32, choices=LEAD_ACTION, default='none', null=True)
    inbox = models.ForeignKey(EmailInbox, on_delete=models.SET_NULL, blank=True, null=True)
    outbox = models.ForeignKey(EmailOutbox, on_delete=models.SET_NULL, blank=True, null=True)
    assigned = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, blank=True, null=True)
    created_date_time = models.DateTimeField(auto_now=True, blank=True, null=True)


""" Not used tables (from prev team) """


class CampaignRecipient(models.Model):
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
