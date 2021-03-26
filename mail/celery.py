from __future__ import absolute_import
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mail.settings')

app = Celery('mail')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'every': {
        'task': 'apps.mailaccounts.tasks.email_sender',
        'schedule': 60.0,
    },
}

