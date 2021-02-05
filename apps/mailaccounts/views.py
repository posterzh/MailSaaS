from django.shortcuts import render
from django.conf import settings
from apps.users.models import CustomUser
from rest_framework import generics
from rest_framework import permissions
from .models import SmtpMail
from .serializers import SmtpMailSerilizer
from rest_framework.response import Response 




class SendSmtpMailView(generics.ListCreateAPIView):
    serializer_class = SmtpMailSerilizer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = SmtpMail.objects.all()

    def post(self,request,*args,**kwargs):
        request.data._mutable = True
        request.data["user"] = request.user.id
        request.data._mutable = False
        if request.data['smtp_username'] == request.data['email'] and request.data['imap_username'] == request.data['email']:
            serializer = SmtpMailSerilizer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message":serializer.data,"sucess":True})
            return Response({'message':'Invalid Serializer'})
        return Response({"message":"Smtp username and Imap username does not match to email"})
    
    def get(self,request,*args,**kwargs):
        queryset = SmtpMail.objects.get(user=request.user.id)
        serializer = SmtpMailSerilizer(queryset)
        return Response({"message":serializer.data,"sucess":True})
        

class SendSmtpMailUpdate(generics.UpdateAPIView):

    serializer_class = SmtpMailSerilizer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = SmtpMail.objects.all()

    def put(self,request,pk,format=None):
        queryset = SmtpMail.objects.get(id=pk)
        serializer = SmtpMailSerilizer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Connection Updated Sucessfully"})
        return Response({"error":serializer.errors})
        
    def delete(self,request,pk,format=None):
        queryset = SmtpMail.objects.get(id=pk)
        queryset.delete()
        return Response({"message":"Connection Delete Sucessfully","Sucess":True})

