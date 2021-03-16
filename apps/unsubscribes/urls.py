from django.urls import path
from . import views

urlpatterns = [
    path(r'unsubcribes', views.UnsubcribeEmailView.as_view(), name='unsubscribe-list'),

    # path('',views.UnsubscribeEmailAdd.as_view(), name ='unscribe'),
    path('unsubcribecsv/', views.UnsubcribeCsvEmailAdd.as_view(), name='unsubcribecsv'),
    # path('unsubcribeview/',views.UnsubcribeEmailView.as_view(), name ='unsubcribeview'),
    path('unsubcribedelete/', views.UnsubcribeEmailDelete.as_view(), name='unsubcribedelete'),
]
