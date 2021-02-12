import base64
import json
import os

import requests
import slack
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from simple_salesforce import Salesforce
from slack import WebClient
from slack.errors import SlackApiError

from apps.campaign.models import Campaign, CampaignRecipient

from .models import SalesForceDetails
from .serializers import SalesForceDetailSerializer





def login():
    # session = requests.Session()
    sf = Salesforce(username='divyakhandelwal@externlabs.com',password='divya1234',security_token='4J6lcgmeNfG4z7rVV2AZPfIgJ')
    # print('response1 ',session)
    # sf = Salesforce(instance='https://externlabs2-dev-ed.my.salesforce.com/', session_id=session)
    
    return sf



class ContactViewSet(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        sf = login()
        recipient=CampaignRecipient.objects.filter(campaign__assigned=request.user.id)
        # sf.Lead.create({"Company":"ashu",'LastName':'Sharma','Email':'ashu@example.com'})
        return Response({'response':'Sales_force'})

    def get(self, request, format=None):
        sf = login()
        print("sf",sf)
        data = sf.query("Select Id,Name, from Lead")
        # result =data
        # print(data)
        # return Response(result.data)
        return Response({'response':'Sales_force'})


class SalesForceDetailStore(generics.CreateAPIView):
    serializer_class = SalesForceDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def post(self,request):
        request.data['user'] = request.user.id
        serializer = SalesForceDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






# class ContactViewSet(generics.CreateAPIView):
#     # queryset = Contact.objects.all()
#     serializer_class = ContactSerializer
#     permission_classes = (permissions.IsAuthenticated,)
      
#     def post(self, request, format=None):
#         print("reqqqqq ", request.data)
#         sf = login()
#         print(sf)

#         if request.method == 'POST':
#             print("Post Request")
#             data = request.data.copy()
#             serializer = ContactSerializer(data=data)
#             if serializer.is_valid():
#                 return_dict = serializer.validated_data
#                 query = sf.Contact.create(return_dict)
#                 return Response(query)
#             else:
#                 return Response(serializer.errors)
#         else:
#             data = sf.query("Select Id,Name from Contact")
#             result = ContactSerializer(data['records'][0])
#             return Response(result.data)


#     def get(self, request, format=None):
#         sf = login()
        
#         data = sf.query("Select Id,Name from Contact")
#         result = ContactSerializer(data['records'][0])
#         return Response(result.data)



# class ContactViewSet(generics.CreateAPIView):
#     # queryset = Contact.objects.all()
#     serializer_class = ContactSerializer
#     permission_classes = (permissions.IsAuthenticated,)
      
#     def post(self, request, format=None):
       
#         params= {
#             "grant_type":"password",
#             "client_id":"3MVG9fe4g9fhX0E5PEEKfj0ukXTOV7tB._or1NjEQ_7jCfsValxDfaEu7xQlIWMXn5xU.14v9Qw.t5X6AatwE",
#             "client_secret":"4B685BD53388F43E6FA1FBB9819BB7028C34091C8DA386A32CB0706323F266A3",
#             "username":"divyakhandelwal-ahne@force.com",
#             "password":'divya1234rkpyzmjBiubobe7taNQMQzIPo',
#         }
#         r = requests.post("https://login.salesforce.com/services/oauth2/token", params=params)
#         access_token = r.json().get("access_token")
#         instance_url = r.json().get("instance_url")
#         print("Access Token:", access_token)
#         print("Instance URL", instance_url)
#         def sf_api_call(action, parameters = {}, method = 'get', data = {}):
            
#             headers = {
#                 'Content-type': 'application/json',
#                 'Accept-Encoding': 'gzip',
#                 'Authorization': 'Bearer %s' % access_token
#             }
#             if method == 'get':
#                 r = requests.request(method, instance_url+action, headers=headers, params=parameters, timeout=30)
#             elif method in ['post', 'patch']:
#                 r = requests.request(method, instance_url+action, headers=headers, json=data, params=parameters, timeout=60)
#             else:
#                 raise ValueError('Method should be get or post or patch.')
#             print('Debug: API %s call: %s' % (method, r.url) )
#             if r.status_code < 300:
#                 if method=='patch':
#                     return None
#                 else:
#                     return r.json()
#             else:
#                 raise Exception('API error when calling %s : %s' % (r.url, r.content))
        


#         # opportunityData =json.dumps(sf_api_call('/services/data/v39.0/query/', {
#         #         'q': 'SELECT Account.Name, Name, CloseDate from Opportunity where IsClosed = False order by CloseDate ASC LIMIT 10'}), indent=2)
#         # print("opportunityData ",opportunityData)  

#         call = sf_api_call('/services/data/v40.0/sobjects/Opportunity/', method="post", data={
#             'CloseDate': '2018-03-01',
#             'Name': 'My big deal',
#             'StageName': 'Sales Accepted Lead',
#             'Type': 'Initial Subscription',
#             'AccountId': '0019E000009WTBVQA4',
#             })
#         opportunity_id = call.get('id')

#         print("opportunity_id ", opportunity_id)
#         return Response({'response':'Sales_force'})

#**************************slack***********************



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


# **************************************Pipedrive**************************

