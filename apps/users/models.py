import hashlib

from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from django.db import models

from .storage import OverwriteStorage
from .managers import UserManager


class CustomUser(AbstractUser):
    """
    Add additional fields to the user model here.
    """
    username = None
    email = models.EmailField(unique=True, max_length=500)
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12, null=False, blank=False)
    company_name = models.CharField(max_length=500, null=False, blank=False)
    mailsaas_type = models.CharField(max_length=100, null=False, blank=False)
    avatar = models.FileField(upload_to='profile-pictures/', storage=OverwriteStorage(), null=True, blank=True)
    avatar_url = models.TextField(blank=True, null=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    # class Meta:
    #     ordering = ['-date_joined']
