# Generated by Django 3.1.4 on 2021-02-11 10:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('charge_id', models.CharField(help_text='The stripe charge ID associated with this payment.', max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('amount', models.PositiveIntegerField(help_text='In cents')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pegasus_payments', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100)),
                ('department', models.CharField(choices=[('hr', 'Human Resources'), ('finance', 'Finance'), ('engineering', 'Engineering'), ('marketing', 'Marketing'), ('sales', 'Sales')], max_length=20)),
                ('salary', models.PositiveIntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
