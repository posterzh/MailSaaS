from django.urls import path
from .import views

urlpatterns = [
    path('sender/', views.EmailAccountsView.as_view(), name="sender"),
    path('sender/<int:pk>/',views.EmailAccountsUpdateView.as_view(), name = 'sendar_update')
    
]