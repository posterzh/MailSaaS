# Generated by Django 3.1.4 on 2021-03-24 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mailaccounts', '0007_calendarstatus'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailaccount',
            name='warming_enabled',
            field=models.BooleanField(default=False),
        ),
    ]
