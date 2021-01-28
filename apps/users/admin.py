from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser

admin.site.register(CustomUser)
# admin.site.register(MailsaasType)



# @admin.register(CustomUser)
# class CustomUserAdmin(UserAdmin):
#     list_display = UserAdmin.list_display

#     fieldsets = UserAdmin.fieldsets + (
#         ('Custom Fields', {
#             'fields': ('avatar','phone_number','company_name')
#         }),
#     )



