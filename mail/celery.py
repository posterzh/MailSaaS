from __future__ import absolute_import
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mail.settings')

app = Celery('mail')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'sender': {
        'task': 'apps.mailaccounts.tasks.email_sender',
        'schedule': 300.0,
    },
    'receiver': {
        'task': 'apps.mailaccounts.tasks.email_receiver',
        'schedule': 300.0,
    },
    'warming_up': {
        'task': 'apps.mailaccounts.tasks.warming_trigger',
        'schedule': 300.0,      # 5 mins in Prod
    },
    'warming_replier': {
        'task': 'apps.mailaccounts.tasks.warming_replier',
        'schedule': 300.0,      # 5 mins in Prod
    },
    'warming_days_counter': {
        'task': 'apps.mailaccounts.tasks.warming_days_counter',
        'schedule': 86400.0,    # 1 day in Prod
    },
}

