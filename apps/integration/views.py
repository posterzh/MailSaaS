import requests
# import slack
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
# from slack import WebClient
# from slack.errors import SlackApiError
from django.http import request,Http404
from apps.campaign.models import Campaign, CampaignRecipient
# from .models import SalesForceDetails
# from .serializers import SalesForceDetailSerializer
# from simple_salesforce import Salesforce
