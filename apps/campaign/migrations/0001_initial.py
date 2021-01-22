# Generated by Django 3.1.4 on 2021-01-21 05:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('fromAddress', models.CharField(max_length=200)),
                ('csvFile_op1', models.FileField(blank=True, null=True, upload_to='csv_uploads/')),
                ('created_date_time', models.DateTimeField(auto_now=True)),
                ('recipients', models.BooleanField(default=False)),
                ('sent', models.BooleanField(default=False)),
                ('leads', models.BooleanField(default=False)),
                ('replies', models.BooleanField(default=False)),
                ('opens', models.BooleanField(default=False)),
                ('bounces', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Campaign_email',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=200)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='campaign.campaign')),
            ],
        ),
    ]
