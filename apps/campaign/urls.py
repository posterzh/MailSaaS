from django.urls import path
from . import views


urlpatterns = [
    path('start/', views.create_campaign_start.as_view(), name='create_campaign_start'),
    path('recipients/', views.create_campaign_recipients.as_view(), name='create_campaign_recipients'),
    path('message/', views.create_campaign_message.as_view(), name='create_campaign_message'),
    path('personalize/', views.CampaignGetAllEmailsPreview.as_view(), name='CampaignGetAllEmailsPreview'),
    path('view/',views.CampaignView.as_view(),name = 'campaign_view'),
]