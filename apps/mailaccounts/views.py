from django.shortcuts import render
from django.conf import settings
from apps.users.models import CustomUser
from rest_framework import generics
from rest_framework import permissions
from .models import EmailAccount
from .serializers import EmailAccountSerializer
from rest_framework.response import Response 




class EmailAccountsView(generics.ListCreateAPIView):
    # serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = EmailAccount.objects.all()

    def post(self,request,*args,**kwargs):
        request.data._mutable = True
        request.data["user"] = request.user.id
        request.data._mutable = False

        payload = {'access_token':request.data.get('access_token', )}
        google_url = request.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        data = json.loads(google_url.text)
        
        if request.data['provider'] == 'google':

            # if 'error' in data:
            #     content = {'message': 'wrong google token / this google token is already expired.'}
            #     return Response(content)
            # try:
            #     mail = EmailAccount.objects.get(email=data['email'])
            # except EmailAccount.DoesNotExist:
            #     mail = EmailAccount()
            mail.email = data['email']
            mail.full_name = data['name']
            mail.provider = data['idpId']
            serializer = EmailAccountSerializer(data=request.data)
            serializer.save()
            serializer.is_valid()
            return Response(serializer.data)

        elif request.data['provider'] == 'smtp':
        
            if request.data['smtp_username'] == request.data['email'] and request.data['imap_username'] == request.data['email']:
                serializer = EmailAccountSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message":serializer.data,"sucess":True})
                return Response({'message':'Invalid Serializer'})
            return Response({"message":"Smtp username and Imap username does not match to email"})
    
    def get(self,request,*args,**kwargs):
        queryset = EmailAccount.objects.get(user=request.user.id)
        serializer = EmailAccountSerializer(queryset)
        return Response({"message":serializer.data,"sucess":True})
        

class EmailAccountsUpdateView(generics.UpdateAPIView):

    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = EmailAccount.objects.all()

    def put(self,request,pk,format=None):
        queryset = EmailAccount.objects.get(id=pk)
        serializer = EmailAccountSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Connection Updated Sucessfully"})
        return Response({"error":serializer.errors})
        
    def delete(self,request,pk,format=None):
        queryset = EmailAccount.objects.get(id=pk)
        queryset.delete()
        return Response({"message":"Connection Delete Sucessfully","Sucess":True})

