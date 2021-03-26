from django.urls import path

from . import views

urlpatterns = [
    path('emailaccounts/', views.EmailAccountListView.as_view(), name="email-account-list"),
    path('emailaccounts/<int:pk>/', views.EmailAccountView.as_view(), name='email-account'),

    path('warmings/', views.EmailAccountWarmingView.as_view(), name="warming-list"),
    path('warmings/<int:mail_account_id>/', views.EmailAccountWarmingView.as_view(), name="warming-update"),

    path('sending-calendars/', views.SendingCalendarListView.as_view(), name="sending-calendar-list"),
    path('sending-calendars/<int:pk>/', views.SendingCalendarView.as_view(), name='sending-calendar'),

    path('available-timezones/', views.AvailableTimezonesView.as_view(), name="available-timezones"),

    path('send-test-email/', views.SendTestEmailView.as_view(), name="send-test-email"),
]
