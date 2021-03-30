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
        'schedule': 60.0,
    },
    'receiver': {
        'task': 'apps.mailaccounts.tasks.email_receiver',
        'schedule': 30.0,
    },
    'warming_up': {
        'task': 'apps.mailaccounts.tasks.warming_trigger',
        'schedule': 300.0,   # 5 mins in Prod
    },
}

