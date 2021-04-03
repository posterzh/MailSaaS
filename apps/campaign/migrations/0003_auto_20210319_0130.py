# Generated by Django 3.1.4 on 2021-03-18 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0002_auto_20210318_0906'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaignrecipients',
            name='updated_at',
            field=models.TimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='campaigns',
            name='created_at',
            field=models.TimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='campaigns',
            name='csv_fields',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AddField(
            model_name='campaigns',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='campaigns',
            name='updated_at',
            field=models.TimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='campaigns',
            name='csvfile',
            field=models.FileField(blank=True, null=True, upload_to='csv_uploads/'),
        ),
        migrations.DeleteModel(
            name='UploadFiles',
        ),
    ]