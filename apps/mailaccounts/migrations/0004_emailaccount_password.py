# Generated by Django 3.1.4 on 2021-03-09 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mailaccounts', '0003_auto_20210309_0424'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailaccount',
            name='password',
            field=models.CharField(default='', max_length=200),
        ),
    ]
