# Generated by Django 3.1.4 on 2021-02-05 04:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('from_address', models.CharField(max_length=200)),
                ('full_name', models.CharField(max_length=200)),
                ('csvfile_op1', models.FileField(blank=True, null=True, upload_to='camp_csv_uploads/')),
                ('created_date_time', models.DateTimeField(auto_now=True)),
                ('update_date_time', models.DateTimeField(auto_now=True)),
                ('track_opens', models.BooleanField(default=False)),
                ('track_linkclick', models.BooleanField(default=False)),
                ('schedule_send', models.BooleanField(default=False)),
                ('schedule_date', models.DateField(blank=True, null=True)),
                ('schedule_time', models.TimeField(blank=True, null=True)),
                ('terms_and_laws', models.BooleanField(default=False)),
                ('campaign_status', models.BooleanField(default=False)),
                ('assigned', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FollowUpEmail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('waitDays', models.PositiveIntegerField()),
                ('subject', models.CharField(max_length=2000)),
                ('email_body', models.TextField()),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaign.campaign')),
            ],
        ),
        migrations.CreateModel(
            name='EmailOnLinkClick',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('waitDays', models.PositiveIntegerField()),
                ('url', models.CharField(max_length=2000)),
                ('subject', models.CharField(max_length=2000)),
                ('email_body', models.TextField()),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaign.campaign')),
            ],
        ),
        migrations.CreateModel(
            name='DripEmailModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('waitDays', models.PositiveIntegerField()),
                ('subject', models.CharField(max_length=2000)),
                ('email_body', models.TextField()),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaign.campaign')),
            ],
        ),
        migrations.CreateModel(
            name='CampaignRecipient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.CharField(max_length=200)),
                ('subject', models.CharField(blank=True, max_length=2000, null=True)),
                ('company_name', models.CharField(blank=True, max_length=1000, null=True)),
                ('role', models.CharField(blank=True, max_length=1000, null=True)),
                ('email_body', models.TextField(blank=True, null=True)),
                ('sent', models.BooleanField(default=False)),
                ('leads', models.BooleanField(default=False)),
                ('replies', models.BooleanField(default=False)),
                ('opens', models.BooleanField(default=False)),
                ('has_link_clicked', models.BooleanField(default=False)),
                ('bounces', models.BooleanField(default=False)),
                ('lead_status', models.CharField(blank=True, choices=[('none', 'None'), ('openLead', 'Open Lead'), ('wonLead', 'Won Lead'), ('lostLead', 'Lost Lead'), ('ignoredLead', 'Ignored Lead')], default='none', max_length=32, null=True)),
                ('reciepent_status', models.BooleanField(default=False)),
                ('unsubscribe', models.BooleanField(default=False)),
                ('is_delete', models.BooleanField(default=False)),
                ('created_date', models.DateTimeField(auto_now=True, null=True)),
                ('update_date_time', models.DateTimeField(auto_now=True, null=True)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaign.campaign')),
            ],
        ),
        migrations.CreateModel(
            name='CampaignLeadCatcher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leadcatcher_recipient', models.CharField(choices=[('replies', 'Replies'), ('open', 'Open'), ('click_any_link', 'Clicks any link'), ('clicks_specific_link', 'Clicks specific link')], default=0, max_length=32)),
                ('specific_link', models.URLField(blank=True, max_length=500, null=True)),
                ('of_times', models.PositiveIntegerField(blank=True, default=0, null=True)),
                ('assigned', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaign.campaign')),
            ],
        ),
    ]
