from django.urls import path

from . import views

urlpatterns = [
    path('', views.MailAccountListView.as_view(), name="mail-account-list"),
    path('<int:pk>/', views.MailAccountView.as_view(), name ='mail-account'),
    
]
