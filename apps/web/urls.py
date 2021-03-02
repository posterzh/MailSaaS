from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'web'
urlpatterns = [
    path(r'', views.home, name='home'),

    path(r'a/<slug:team_slug>', views.team_home, name='team_home'),
    path(r'a/<slug:team_slug>/manage/', views.team_admin_home, name='team_admin'),
    path(r'privacy', TemplateView.as_view(template_name="web/privacy.html"), name='privacy'),
    path(r'terms', TemplateView.as_view(template_name="web/terms.html"), name='terms'),
    path('.well-known/microsoft-identity-association.json', views.msfile),
]
