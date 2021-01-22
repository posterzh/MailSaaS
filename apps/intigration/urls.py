from django.conf.urls import url
from . import views
urlpatterns = [
    # url('^$', views.index),
    url('slack/oauth/', views.SocialLoginView.as_view()),
]
