from django.urls import path

from . import views

urlpatterns = [
    path('emailaccounts/', views.EmailAccountListView.as_view(), name="email-account-list"),
    path('emailaccounts/<int:pk>/', views.EmailAccountView.as_view(), name='email-account'),

]
