# Generated by Django 3.1.4 on 2021-03-25 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mailaccounts', '0008_auto_20210325_0710'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='calendarstatus',
            name='updated_time',
        ),
        migrations.AddField(
            model_name='calendarstatus',
            name='updated_datetime',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
