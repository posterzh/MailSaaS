from django.urls import path
from . import views

urlpatterns = [
    path(r'', views.UnsubscribeEmailListView.as_view(), name='unsubscribe_list'),
    path(r'add-emails', views.AddUnsubscribeEmailView.as_view(), name='add_emails'),

    # path('',views.UnsubscribeEmailAdd.as_view(), name ='unscribe'),
    path('unsubcribecsv/', views.UnsubcribeCsvEmailAdd.as_view(), name='unsubcribecsv'),
    # path('unsubcribeview/',views.UnsubcribeEmailView.as_view(), name ='unsubcribeview'),
    path('unsubcribedelete/', views.UnsubcribeEmailDelete.as_view(), name='unsubcribedelete'),
]
