from django.urls import path
from .import views

urlpatterns = [
    path('sender/', views.SendSmtpMailView.as_view(), name="sender"),
    path('sender/<int:pk>/',views.SendSmtpMailUpdate.as_view(), name = 'sendar_update')
]