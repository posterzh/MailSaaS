from django.contrib import admin
from .models import Schedule, WeekDays, Email_schedule

# Register your models here.

admin.site.register(Schedule)
admin.site.register(WeekDays)
admin.site.register(Email_schedule)