from django.urls import path
from . import views


urlpatterns = [
    path('email/open/<slug:id>', views.TrackEmailOpen.as_view(), name='track_email_open'),
    path('email/click/<slug:id>', views.TrackEmailClick.as_view(), name='track_email_click'),
    path('start/', views.CreateCampaignStartView.as_view(), name='create_campaign_start'),
    path('recipients/', views.CreateCampaignRecipientsView.as_view(), name='create_campaign_recipients'),
    path('message/', views.CreateCampaignMessageView.as_view(), name='create_campaign_message'),
    path('personalize/<int:pk>/', views.CampaignGetAllEmailsPreview.as_view(), name='CampaignGetAllEmailsPreview'),
    path('options/', views.CreateCampaignOptionView.as_view(), name='create_campaign_options'),
    path('view/',views.CampaignView.as_view(),name = 'campaign_view'),
    path('savecamp/<int:pk>/', views.CreateCampaignSendView.as_view(), name='create_campaign_send'),
    path('leadscatcher/',views.LeadsCatcherView.as_view(),name = 'leads_catcher'),
    path('Get_overview/<int:pk>/',views.Get_campaign_overview.as_view(),name = 'Get_campaign_overview'),
    path('recipients/people/',views.AllRecipientView.as_view(),name = 'recipients'),
    path('recipients/<int:pk>/',views.RecipientDetailView.as_view(), name = "recipients_update"),
    path('campaignleadcatcher/', views.CampaignleadCatcherView.as_view(),name = 'campaignleadcatcher'),
    path('campaignleadcatcherview/', views.LeadCatcherUpdateView.as_view(),name = 'campaignleadcatcher'),
    path('campaignmessage/<int:pk>/', views.CampaignMessages.as_view(),name = 'campaignmessage'),
    path('procpects/', views.ProspectsView.as_view(),name = 'procpects'),

   
]