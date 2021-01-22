from rest_framework import serializers
from .models import CustomUser 
from rest_framework.validators import UniqueValidator


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )

    class Meta:
        model = CustomUser
        fields = ('id','password','email','full_name','company_name','mailsaas_type','phone_number','avatar')
        extra_kwargs = {
            
            'email': {'required': True},
            'company_name': {'required': True},
            'full_name': {'required': True},
            'phone_number': {'required': True},
            'mailsaas_type':{'required': True},
            'password': {'required': True},
            
        }


    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            company_name=validated_data['company_name'],
            phone_number=validated_data['phone_number'],
            mailsaas_type=validated_data['mailsaas_type'],
            password=validated_data['password'],
        )
        user.save()
        return user


class LoginSerilizer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['email','password']
        extra_kwargs = {
            'email': {'required': True},
            'password': {'required': True},
        }


class TokenSerializer(serializers.Serializer):
    
    """ Token Serializer """

    token = serializers.CharField(max_length=255)


class UserSettingSerilizer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('full_name','email')
    
class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_confirm_password = serializers.CharField(required=True)
    class Meta:
        model = CustomUser
        fields = ['old_password','new_password','new_confirm_password']