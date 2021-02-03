# Generated by Django 3.1.4 on 2021-02-03 11:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('unsubscribes', '0003_unsubscribeemail_mail_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='unsubscribeemail',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='users.customuser'),
            preserve_default=False,
        ),
    ]
