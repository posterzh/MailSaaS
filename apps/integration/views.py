
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
from django.http import HttpResponse
import requests
from simple_salesforce import Salesforce
from .models import Contact
from .serializers import ContactSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response





def login():
  return Salesforce(
      username='divyakhandelwal-mlsz@force.com',
      password='divya1234',
    #   security_token='TJbGsbaRmxpKqwg2vIzjnVGl'
      organizationId='00D5g000004Eewv'
      )



class ContactViewSet(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = (permissions.IsAuthenticated,)
      
    def post(self, request, format=None):
        print("reqqqqq ", request.data)
        sf = login()
        print(sf)

        if request.method == 'POST':
            data = request.data.copy()
            serializer = ContactSerializer(data=data)
            if serializer.is_valid():
                return_dict = serializer.validated_data
                query = sf.Contact.create(return_dict)
                return Response(query)
            else:
                return Response(serializer.errors)
        else:
            data = sf.query("Select Id,Name from Contact")
            result = ContactSerializer(data['records'][0])
            return Response(result.data)
    def get(self, request, format=None):
        data = sf.query("Select Id,Name from Contact")
        result = ContactSerializer(data['records'][0])
        return Response(result.data)






#**************************slack***********************


from django.http import HttpResponse, JsonResponse
import slack
from apps.campaign.models import Campaign, CampaignRecipient

@csrf_exempt
def event_hook(request):
    print("rrrrrrrqqqqqqqq ",request)

    client = slack.WebClient(token=settings.BOT_USER_ACCESS_TOKEN)
    json_dict = json.loads(request.body.decode('utf-8'))
    if json_dict['token'] != settings.VERIFICATION_TOKEN:
        return HttpResponse(status=403)
    if 'type' in json_dict:
        if json_dict['type'] == 'url_verification':
            response_dict = {"challenge": json_dict['challenge']}
            return JsonResponse(response_dict, safe=False)
    if 'event' in json_dict:
        event_msg = json_dict['event']
        
        if ('subtype' in event_msg) and (event_msg['subtype'] == 'bot_message'):
            return HttpResponse(status=200)
    if event_msg['type'] == 'message':
        user = event_msg['user']
        print(user)
        channel = event_msg['channel']

        response_msg = ":wave:, Hello gaurav" #% user
        client.chat_postMessage(channel=channel, text=response_msg)
        return HttpResponse(status=200)
    return HttpResponse(status=200)





import requests
import json
import os
from slack import WebClient
from slack.errors import SlackApiError

# def post_message_to_slack(text, blocks = None):
#     return requests.post('https://slack.com/api/chat.postMessage', {
#         'token': settings.VERIFICATION_TOKEN,
#         'channel': slack_channel,
#         'text': text,
#         'icon_url': slack_icon_url,
#         'username': slack_user_name,
#         'blocks': json.dumps(blocks) if blocks else None
#     }).json()	

def SendSlackMessage(data):
    slack_token = settings.BOT_USER_ACCESS_TOKEN
    client = WebClient(token=slack_token)
    try:
        response = client.chat_postMessage(
            channel="D01KV6XRT55",
            text= data['full_name'] + " " + "is your new Lead, With email"  + data["email"] 
        )
        return Response("Sent")
    except SlackApiError as e:
        assert e.response["error"]  # str like 'invalid_auth', 'channel_not_found'
        return Response("Not Sent")


# **************************************Hubspot**************************

