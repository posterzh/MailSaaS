# Generated by Django 3.1.4 on 2021-01-28 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0004_auto_20210128_1144'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaignrecipient',
            name='created_date',
            field=models.DateTimeField(auto_created=True, blank=True, null=True),
        ),
    ]
