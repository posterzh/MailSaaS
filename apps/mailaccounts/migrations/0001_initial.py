# Generated by Django 3.1.4 on 2021-03-06 00:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmailAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email_provider', models.CharField(blank=True, choices=[('SMTP', 'SMTP'), ('Google', 'Google'), ('Microsoft', 'Microsoft')], default='Smtp', max_length=100, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(default='', max_length=200)),
                ('last_name', models.CharField(default='', max_length=200)),
                ('smtp_host', models.CharField(blank=True, max_length=200, null=True)),
                ('smtp_port', models.CharField(blank=True, choices=[('587', '587'), ('25', '25'), ('465', '465'), ('2525', '2525')], default='587', max_length=20, null=True)),
                ('smtp_username', models.CharField(blank=True, max_length=200, null=True)),
                ('smtp_password', models.CharField(blank=True, max_length=200, null=True)),
                ('imap_host', models.CharField(blank=True, max_length=200, null=True)),
                ('imap_port', models.CharField(blank=True, choices=[('993', '993'), ('143', '143'), ('995', '995')], default='993', max_length=20, null=True)),
                ('imap_username', models.CharField(blank=True, max_length=200, null=True)),
                ('imap_password', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
    ]