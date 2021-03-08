from django.urls import path

from . import views

urlpatterns = [
    path('mailaccounts/', views.EmailAccountsView.as_view(), name="addmailaccount"),
    path('mailaccounts/<int:pk>/',views.EmailAccountsUpdateView.as_view(), name = 'updatedeletemailaccount'),
    
]
