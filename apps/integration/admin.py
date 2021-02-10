from django.contrib import admin

# Register your models here.
from .models import Team,Contact



admin.site.register(Team)
admin.site.register(Contact)