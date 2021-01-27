import hashlib

from django.contrib.auth.models import AbstractUser,AbstractBaseUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from .managers import UserManager

class MailsaasType(models.Model):
    name = models.CharField(max_length=500)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    """
    Add additional fields to the user model here.
    """
    username = None
    email = models.EmailField(unique=True,max_length=500)
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12,null=False,blank=False)
    company_name = models.CharField(max_length=500,null=False,blank=False)
    # mailsaas_type = models.ForeignKey(MailsaasType,on_delete=models.CASCADE)
    avatar = models.FileField(upload_to='profile-pictures/', null=True, blank=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

    def get_display_name(self):
        if self.get_full_name().strip():
            return self.get_full_name()
        return self.email

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return 'https://www.gravatar.com/avatar/{}?s=128&d=identicon'.format(self.gravatar_id)

    @property
    def gravatar_id(self):
        # https://en.gravatar.com/site/implement/hash/
        return hashlib.md5(self.email.lower().strip().encode('utf-8')).hexdigest()
