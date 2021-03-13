from rest_framework import serializers

from .models import EmailAccount, SendingCalendar


class EmailAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmailAccount
        fields = '__all__'


class SendingCalendarSerializer(serializers.ModelSerializer):

    class Meta:
        model = SendingCalendar
        fields = '__all__'
