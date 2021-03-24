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
    path('overview/<int:pk>/',views.GetCampaignOverview.as_view(),name = 'Get_campaign_overview'),
    path('recipients/people/<int:pk>/',views.AllRecipientView.as_view(),name = 'recipients'),
    path('recipients/<int:pk>/',views.RecipientDetailView.as_view(), name = "recipients_update"),
    path('settings-leadcatcher/', views.CampaignleadCatcher.as_view(),name = 'settings-leadcatcher'),
    path('settings-leadcatcherView/<int:pk>/', views.LeadCatcherView.as_view(),name = 'LeadCatcherView'),
    path('update-leadcatcherstatus/', views.LeadCatcherStatusUpdateView.as_view(),name='update-leadcatcherstatus'),
    path('settings-leadcatcher/<int:pk>/', views.LeadCatcherUpdateView.as_view(),name = 'campaignleadcatcher'),
    path('sequence/<int:pk>/', views.CampaignMessages.as_view(),name = 'campaignmessage'),
    path('prospects/', views.ProspectsView.as_view(),name = 'procpects'),
    path('prospects/count', views.ProspectsCountView.as_view(),name = 'procpects_count'),
    path('prospects/<int:pk>/', views.ProspectsDetailView.as_view(),name = 'procpects_detail'),
    path('recipientunsubcribe/', views.RecipientUnsubcribe.as_view(), name='recipient_unsubcribe'),
    path('recipientunassigned/', views.RecipientUnassignedView.as_view(), name='recipientunassigned'),
    path('create/', views.CampaignCreateView.as_view(), name='create_campaign'),
    path('list/', views.CampaignListView.as_view(), name='list_campaign'),
    path('overview-summary/<int:pk>/', views.CampaignOverviewSummary.as_view(),name = 'Get_campaign_overview_summary'),
]
