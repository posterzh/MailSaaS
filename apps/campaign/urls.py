from django.urls import path
from . import views


urlpatterns = [
    path('email/open/<slug:id>', views.TrackEmailOpen.as_view(), name='track_email_open'),
    # path('email/click', views.TrackEmailClick.as_view(), name='track_email_click')
    path('start/', views.create_campaign_start.as_view(), name='create_campaign_start'),
    path('recipients/', views.create_campaign_recipients.as_view(), name='create_campaign_recipients'),
    path('message/', views.create_campaign_message.as_view(), name='create_campaign_message'),
    path('personalize/<int:pk>/', views.CampaignGetAllEmailsPreview.as_view(), name='CampaignGetAllEmailsPreview'),
    path('options/', views.create_campaign_options.as_view(), name='create_campaign_options'),
    path('view/',views.CampaignView.as_view(),name = 'campaign_view'),
    path('save_camp/<int:pk>/', views.create_campaign_send.as_view(), name='create_campaign_send'),
    path('leads_catcher/',views.LeadsView.as_view(),name = 'leads_catcher'),
    path('Get_overview/',views.Get_campaign_overview.as_view(),name = 'Get_campaign_overview'),
    path('recipients/people/',views.AllRecipientView.as_view(),name = 'recipients'),
    path('recipients/<int:pk>/',views.RecipientDetailView.as_view(), name = "recipients_update"),
    path('campaignleadcatcher/', views.CampaignleadCatcherView.as_view(),name = 'campaignleadcatcher'),
    path('campaignleadcatcherview/', views.LeadCatcherUpdateView.as_view(),name = 'campaignleadcatcher'),
    path('campaignmessage/<int:pk>/', views.CampaignMessages.as_view(),name = 'campaignmessage'),
    path('procpects/', views.ProspectsView.as_view(),name = 'procpects'),

   
]