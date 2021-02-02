
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






# Create your views here.


# class SocialLoginView(generics.CreateAPIView):
#     """Log in using facebook"""
#     permission_classes = (AllowAny,)
          
#     def post(self, request):
#         payload = {'access_token': request.data.get("access_token")}  # validate the token
#         facebook_url = requests.get('https://graph.facebook.com/me?', params=payload)
#         data = json.loads(facebook_url.text)
#         print(data,"data")
#         if 'error' in data:
#             content = {'message': 'wrong google token / this google token is already expired.'}
#             return Response(content)
#         try:
#             user = CustomUser.objects.get(email=request.data['email'])
            
#         except CustomUser.DoesNotExist:
#             user = CustomUser()
#             user.username = data['name']
#             user.password = make_password(BaseUserManager().make_random_password())
#             user.email = request.data['email']
#             user.user_profile = request.data['url']
#             user.auth_provider = request.data['graphDomain']
#             user.is_varified = True
#             user.save()
        
#         serializer = TokenSerializer(data={
#                 "token": jwt_encode_handler(
#                     jwt_payload_handler(user)
#                 )})
            
#         serializer.is_valid()
#         return Response(serializer.data)

# def slack_oauth(request):
#     code = request.GET['code']
    
#     params = { 
#         'code': code,
#         'client_id': settings.CLIENT_ID,
#         'client_secret': settings.CLIENT_SECRET
#     }
#     url = 'https://slack.com/api/oauth.access'
#     json_response = requests.get(url, params)
#     data = json.loads(json_response.text)
#     Team.objects.create(
#         name=data['name'], 
#         team_id=data['team_id'],
#         bot_user_id=data['bot']['bot_user_id'],     
#         bot_access_token=data['bot']['bot_access_token']
#     )
#     return HttpResponse('Bot added to your Slack team!')



def login():
  return Salesforce(
      username='divyakhandelwal@externlabs',
      password='Gaurav@1234',
      organizationId='00D5g000004Dsji')



class ContactViewSet(generics.CreateAPIView):
    # queryset = Contact.objects.all()
    # serializer_class = ContactSerializer
    permission_classes = (permissions.IsAuthenticated,)
      
    def post(self, request, format=None):
        print("reqqqqq ", request.data)
        sf = login()
        print(sf)

        # if request.method == 'POST':
        data = request.data.copy()
        serializer = ContactSerializer(data=data)
        if serializer.is_valid():
            return_dict = serializer.validated_data
            query = sf.Contact.create(return_dict)
            return Response(query)
        else:
            return Response(serializer.errors)
    def get(self, request, format=None):
        data = sf.query("Select Id,Name from Contact")
        result = ContactSerializer(data['records'][0])
        return Response(result.data)


from django.http import HttpResponse, JsonResponse
import slack

@csrf_exempt
def event_hook(request):
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
        print(user['username'])
        channel = event_msg['channel']

        response_msg = ":wave:, Hello gaurav" #% user
        client.chat_postMessage(channel=channel, text=response_msg)
        return HttpResponse(status=200)
    return HttpResponse(status=200)
