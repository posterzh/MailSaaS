# Generated by Django 3.1.4 on 2021-03-31 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0018_emailoutbox'),
    ]

    operations = [
        migrations.RenameField(
            model_name='emailoutbox',
            old_name='email_id',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='emailoutbox',
            old_name='recipient_id',
            new_name='recipient',
        ),
        migrations.RenameField(
            model_name='log',
            old_name='email_id',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='log',
            old_name='recipient_id',
            new_name='recipient',
        ),
        migrations.AlterField(
            model_name='recipient',
            name='full_name',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
