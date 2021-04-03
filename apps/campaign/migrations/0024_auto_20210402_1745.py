# Generated by Django 3.1.4 on 2021-04-02 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0023_auto_20210402_1652'),
    ]

    operations = [
        migrations.RenameField(
            model_name='campaignleadsettings',
            old_name='type',
            new_name='join_operator',
        ),
        migrations.AddField(
            model_name='campaignleadsettings',
            name='click_any_link',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='campaignleadsettings',
            name='clicks_specific_link',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='campaignleadsettings',
            name='open',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='campaignleadsettings',
            name='replies',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
        migrations.DeleteModel(
            name='CampaignLeadSettingsItem',
        ),
    ]