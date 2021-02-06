from rest_framework import serializers
from .models import CustomUser 
from rest_framework.validators import UniqueValidator
from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext as _

from .models import CustomUser

class RegisterSerializer(serializers.Serializer):
    username = None
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    full_name = serializers.CharField(required=True, write_only=True)
    phone_number = serializers.CharField(required=True, write_only=True)
    company_name = serializers.CharField(required=True, write_only=True)
    mailsaas_type = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)
    avatar = serializers.ImageField(required=False, write_only=True)


    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    # def validate(self, data):
    #     if data['password1'] != data['password2']:
    #         raise serializers.ValidationError(
    #             _("The two password fields didn't match."))
    #     return data


    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'password': self.validated_data.get('password', ''),
            'avatar': self.validated_data.get('avatar', ''),
            'full_name': self.validated_data.get('full_name', ''),
            'phone_number': self.validated_data.get('phone_number', ''),
            'company_name': self.validated_data.get('company_name',''),
            'mailsaas_type': self.validated_data.get('mailsaas_type', ''),
        }
    
    def custom_signup(self, request, user):
        user = CustomUser.objects.create_user(
            email=self.get_cleaned_data().get('email'),
            username=self.get_cleaned_data().get('username'),
            password=self.get_cleaned_data().get('password'),
            avatar=self.get_cleaned_data().get('avatar'),
            full_name=self.get_cleaned_data().get('full_name'),
            phone_number=self.get_cleaned_data().get('phone_number'),
            company_name=self.get_cleaned_data().get('company_name'),
            mailsaas_type=self.get_cleaned_data().get('mailsaas_type'),
        )
        return user

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        # self.custom_signup(request,user)
        setup_user_email(request, user, [])
        # user.profile.save()
        user.save()
        return user


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