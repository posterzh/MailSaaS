from django.conf.urls import url
from . import views
# from .routers import router


urlpatterns = [
    # url('^$', views.index),
    # url('slack/oauth/', views.SocialLoginView.as_view()),
    url('sforcepage/', views.ContactViewSet.as_view()),
]
