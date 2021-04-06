from allauth.account import app_settings as allauth_settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.utils import email_address_exists
from django.utils.translation import gettext as _
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import CustomUser


class RegisterSerializer(serializers.Serializer):
    username = None
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    full_name = serializers.CharField(required=True, write_only=True)
    company_name = serializers.CharField(required=False, write_only=True, allow_blank=True)
    mailsaas_type = serializers.CharField(required=True, write_only=True)
    avatar = serializers.ImageField(required=False, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        # if data['password1'] != data['password2']:
        #     raise serializers.ValidationError(
        #         _("The two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'avatar': self.validated_data.get('avatar', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'full_name': self.validated_data.get('full_name', ''),
            # 'company_name': self.validated_data.get('company_name',''),
            'mailsaas_type': self.validated_data.get('mailsaas_type', ''),
            'password1': self.validated_data.get('password1', ''),
        }

    def custom_signup(self, request, user):
        pass

    def save(self, request, *args, **kwargs):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])

        user.save()
        return user


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """

    class Meta:
        model = CustomUser
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'company_name', 'avatar', 'avatar_url')
        read_only_fields = ('email',)


class TokenSerializer(serializers.Serializer):
    """ Token Serializer """

    token = serializers.CharField(max_length=255)


class UserSettingSerilizer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('full_name', 'email')


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_confirm_password = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ['old_password', 'new_password', 'new_confirm_password']


class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)


class GetEmailSerializer(serializers.Serializer):
    """ Serializer for Get Email """

    email = serializers.CharField(required=True)
