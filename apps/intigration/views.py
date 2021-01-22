from django.shortcuts import render
from .models import Team
from rest_framework import generics
from django.conf import settings
import json
from django.contrib.auth import HttpResponse
import requests
# Create your views here.


class SocialLoginView(generics.CreateAPIView):
    """Log in using facebook"""
    permission_classes = (AllowAny,)
          
    def post(self, request):
        payload = {'access_token': request.data.get("access_token")}  # validate the token
        facebook_url = requests.get('https://graph.facebook.com/me?', params=payload)
        data = json.loads(facebook_url.text)
        print(data,"data")
        if 'error' in data:
            content = {'message': 'wrong google token / this google token is already expired.'}
            return Response(content)
        try:
            user = CustomUser.objects.get(email=request.data['email'])
            
        except CustomUser.DoesNotExist:
            user = CustomUser()
            user.username = data['name']
            user.password = make_password(BaseUserManager().make_random_password())
            user.email = request.data['email']
            user.user_profile = request.data['url']
            user.auth_provider = request.data['graphDomain']
            user.is_varified = True
            user.save()
        
        serializer = TokenSerializer(data={
                "token": jwt_encode_handler(
                    jwt_payload_handler(user)
                )})
            
        serializer.is_valid()
        return Response(serializer.data)

def slack_oauth(request):
    code = request.GET['code']
    
    params = { 
        'code': code,
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET
    }
    url = 'https://slack.com/api/oauth.access'
    json_response = requests.get(url, params)
    data = json.loads(json_response.text)
    Team.objects.create(
        name=data['name'], 
        team_id=data['team_id'],
        bot_user_id=data['bot']['bot_user_id'],     
        bot_access_token=data['bot']['bot_access_token']
    )
    return HttpResponse('Bot added to your Slack team!')