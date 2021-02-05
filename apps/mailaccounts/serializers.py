from rest_framework import serializers
from .models import SmtpMail



class SmtpMailSerilizer(serializers.ModelSerializer):

    class Meta:
        model = SmtpMail
        fields = '__all__'