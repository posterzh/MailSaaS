# Generated by Django 3.1.4 on 2021-04-08 00:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('unsubscribes', '0002_unsubscribeemail_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='unsubscribeemail',
            name='mail_account',
        ),
        migrations.RemoveField(
            model_name='unsubscribeemail',
            name='on_delete',
        ),
    ]