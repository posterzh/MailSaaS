from celery import shared_task
from .models import *

@shared_task
def triggerLeadCatcher(campaign_id, recipient_id):
    print("Lead Catcher triggered")

    lead_setting = LeadSettings.objects.filter(campaign_id=campaign_id)
    if len(lead_setting) == 0:
        return

    lead_setting = lead_setting[0]
    recipient = Recipient.objects.get(id=recipient_id)

    can_be_lead = False
    fits = []
    if lead_setting.open > 0:
        if recipient.opens >= lead_setting.open:
            fits.append(True)
        else:
            fits.append(False)
    if lead_setting.replies > 0:
        if recipient.replies >= lead_setting.replies:
            fits.append(True)
        else:
            fits.append(False)
    if lead_setting.click_any_link > 0:
        if recipient.clicked >= lead_setting.click_any_link:
            fits.append(True)
        else:
            fits.append(False)

    for item in fits:
        if lead_setting.join_operator == 'and':
            can_be_lead = can_be_lead and item
        else:
            can_be_lead = can_be_lead or item

    if can_be_lead:
        recipient.leads = 1
        recipient.lead_status = 'open'
        recipient.save()

