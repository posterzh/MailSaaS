# Generated by Django 3.1.4 on 2021-01-22 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0003_auto_20210122_0700'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='scheduleDateTime',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
