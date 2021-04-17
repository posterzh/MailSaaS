# Generated by Django 3.1.4 on 2021-04-17 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0004_auto_20210417_0724'),
    ]

    operations = [
        migrations.AlterField(
            model_name='membership',
            name='role',
            field=models.CharField(choices=[('admin', 'Administrator'), ('member', 'Member')], default='member', max_length=100),
        ),
        migrations.AlterUniqueTogether(
            name='invitation',
            unique_together=set(),
        ),
    ]