import base64
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.conf import settings
from django.core import mail
from django.core.mail.backends.smtp import EmailBackend
from django.shortcuts import render
from Google import Create_Service
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.users.models import CustomUser

from .models import EmailAccount
from .serializers import EmailAccountSerializer


class EmailAccountsView(generics.ListCreateAPIView):
    # serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = EmailAccount.objects.all()

    def post(self,request,*args,**kwargs):
        # request.data._mutable = True
        request.data["user"] = request.user.id
        # request.data._mutable = False

        # payload = {'access_token':request.data.get('access_token', )}
        # google_url = request.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        # data = json.loads(google_url.text)
        
        # if request.data['provider'] == 'google':

        #     # if 'error' in data:
        #     #     content = {'message': 'wrong google token / this google token is already expired.'}
        #     #     return Response(content)
        #     # try:
        #     #     mail = EmailAccount.objects.get(email=data['email'])
        #     # except EmailAccount.DoesNotExist:
        #     #     mail = EmailAccount()
        #     mail.email = data['email']
        #     mail.full_name = data['name']
        #     mail.provider = data['idpId']
        #     serializer = EmailAccountSerializer(data=request.data)
        #     serializer.save()
        #     serializer.is_valid()
        #     return Response(serializer.data)

        # elif request.data['provider'] == 'smtp':
        
        if request.data['smtp_username'] == request.data['email'] and request.data['imap_username'] == request.data['email']:
            serializer = EmailAccountSerializer(data=request.data)
            print(serializer,"<<<<<<<<<")
            if serializer.is_valid():
                serializer.save()
                return Response({"message":serializer.data,"sucess":True})
            return Response({'message':'Invalid Serializer',"error":serializer.errors})
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



def send_mail_with_smtp():
    try:
        con = mail.get_connection()
        print(con,"22222")
        con.open()
        print('Django connected to the SMTP server')

        mail_setting = EmailAccount.objects.last()
        host = mail_setting.smtp_host
        host_user = mail_setting.smtp_username
        host_pass = mail_setting.smtp_password
        host_port = mail_setting.smtp_port

        mail_obj = EmailBackend(
            host=host,
            port=host_port,
            password=host_pass,
            username=host_user,
            use_tls=False,
            use_ssl = False,
            timeout=10
        )
        # print(mail_obj, "<<<<<====================")
        msg = mail.EmailMessage(
            subject="this is subject",
            body="Hi, This is for testing purpose",
            from_email=host_user,
            
            to=['divyakhandelwal@externlabs.com','ashutoshsharma@externlabs.com'],
            connection=con,
        )
        print(msg.values,">>>>>>>>>>>>>>>>>")
        mail_obj.send_messages([msg])
        print('Message has been sent.')

        mail_obj.close()
        print('SMTP server closed')
        return True

    except Exception as _error:
        print('Error in sending mail >> {}'.format(_error))
        return False



def send_mail_with_gmail():

    CLIENT_SECRET_FILE = 'client_secret.json'
    API_NAME = 'gmail'
    API_VERSION = 'v1'
    SCOPES = ['https://mail.google.com/']
    print(SCOPES,">>>>>>>>>>>>>>>")

    service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
    # print(service, '<<==================')
    emailMsg = 'You won $100,000'
    mimeMessage = MIMEMultipart()
    print(mimeMessage,"<<<<>>>>><<>>>")
    mimeMessage['to'] = 'ashutoshsharma@externlabs.com'
    mimeMessage['subject'] = 'You won'
    mimeMessage.attach(MIMEText(emailMsg, 'plain'))
    raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
    print(raw_string,"<<<<<<<<<<<<<raw_string")
    # raw_string2 = base64.urlsafe_b64encode(mimeMessage.as_bytes())
    print(mimeMessage,"raw_string2>>>>>>>>>>>>>")
    # message = service.users().messages().send(userId='me', body={'raw': raw_string}).execute()
    # print('Message Id: %s' % message['id'])
    # print(message)
    




def send_mail_with_microsoft():
    pass