from rest_framework import serializers

from .models import UnsubcribeCsv, UnsubscribeEmail


class UnsubscribeEmailSerializers(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UnsubscribeEmail
        fields = '__all__'


class UnsubcribeCsvEmailSerializers(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UnsubcribeCsv
        fields = '__all__'
