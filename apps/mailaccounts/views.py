import base64
import imaplib
import os
import pprint
import smtplib
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import progressbar
from django.conf import settings
from django.core import mail
from django.core.mail.backends.smtp import EmailBackend
from django.shortcuts import render
from Google import Create_Service
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.campaignschedule.models import Schedule
from apps.users.models import CustomUser

from .models import EmailAccount
from .serializers import EmailAccountSerializer


def check_smtp_email(server, port, email, password):
    import smtplib
    import ssl

    smtp_server = server
    port = port  # For starttls
    sender_email = email
    password = password

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        server = smtplib.SMTP(smtp_server,port)
        server.ehlo() # Can be omitted
        server.starttls(context=context) # Secure the connection
        server.ehlo() # Can be omitted
        # server.login(sender_email, password)
        login_status = server.login(sender_email, password)
        return login_status
        # TODO: Send email here
    except Exception as e:
        # Print any error messages to stdout
        print("error = ",e)
        return str(e)
    # finally:
    #     server.quit() 


class EmailAccountsView(generics.ListCreateAPIView):
    # serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = EmailAccount.objects.all()

    def post(self,request,*args,**kwargs):
        request.data["user"] = request.user.id
        if request.data['smtp_username'] == request.data['email'] and request.data['imap_username'] == request.data['email']:
            request.data["provider"] = "SMTP"
            serializer = EmailAccountSerializer(data=request.data)
            if serializer.is_valid():
                # login_status = check_smtp_email(request.data["smtp_host"], request.data["smtp_port"], request.data["email"], request.data["smtp_password"])[1].decode("utf-8")
                # imap()
                # print("login_statussssssss",login_status)
                # print(str(login_status))
                # print(type(check_smtp_email(request.data["smtp_host"], request.data["smtp_port"], request.data["email"], request.data["smtp_password"])[1].decode("utf-8")))
                # print(check_smtp_email(request.data["smtp_host"], request.data["smtp_port"], request.data["email"], request.data["smtp_password"])[1].decode("utf-8"))
                # check_smtp_email_var = check_smtp_email(request.data["smtp_host"], request.data["smtp_port"], request.data["email"], request.data["smtp_password"])[1].decode("utf-8")
                try:
                    if check_smtp_email(request.data["smtp_host"], request.data["smtp_port"], request.data["email"], request.data["smtp_password"])[1].decode("utf-8") == "Authentication succeeded":
                        serializer.save()
                        email_account_data = EmailAccount.objects.filter(user=request.user.id)
                        count_email_accounts_of_current_user = email_account_data.count()
                        if count_email_accounts_of_current_user==1:
                            user = CustomUser.objects.get(id=request.user.id)
                            mail_account = EmailAccount.objects.get(id=email_account_data.get().id)
                            schedule_ob = Schedule(
                                user=user,
                                mail_account=mail_account,
                                start_time='06:00:00',
                                end_time='11:00:00',
                                time_zone='America/Los_Angeles',
                                max_email=20,
                                strategy='SPACE',
                                mint_between_sends=12,
                                min_email_send=1,
                                max_email_send=1)
                            schedule_ob.save()
                except:
                    return Response({"message":check_smtp_email(request.data["smtp_host"], request.data["smtp_port"], request.data["email"], request.data["smtp_password"])[8:-2],"success":False})
                return Response({"message":serializer.data,"success":True})
            return Response({'message':serializer.errors,"success":False})
        return Response({"message":"Smtp username and Imap username does not match to email"})

    def get(self,request,*args,**kwargs):

        try:
            queryset = EmailAccount.objects.filter(user=request.user.id)
            serializer = EmailAccountSerializer(queryset,many = True)
            return Response({"message":serializer.data,"success":True})

        except:
            return Response ({"message":"mail accounts not available"})


class EmailAccountsUpdateView(generics.UpdateAPIView):

    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = EmailAccount.objects.all()

    def put(self,request,pk,format=None):
        queryset = EmailAccount.objects.get(id=pk)
        request.data["user"] = request.user.id
        serializer = EmailAccountSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Connection Updated successfully"})
        return Response({"error":serializer.errors})
        
    def delete(self,request,pk,format=None):
        try:
            queryset = EmailAccount.objects.get(id=pk)
        except:
            return Response({"message":"No Mail Account For this Id"})
        queryset.delete()
        return Response({"message":"Connection Delete successfully","success":True})



def send_mail_with_smtp(host, host_port, host_user, host_pass, send_to, subject, msg):
    try:
        con = mail.get_connection()
        con.open()
        mail_obj = EmailBackend(
            host=host,
            port=host_port,
            password=host_pass,
            username=host_user,
            use_tls=False,
            use_ssl = False,
            timeout=10
        )
        msg = mail.EmailMessage(
            subject=subject,
            body=msg,
            from_email=host_user,
            
            to=send_to,
            connection=con,
        )
        mail_obj.send_messages([msg])

        print('Message has been sent.')

        mail_obj.close()
        con.close()
        print('SMTP server closed')
        return True

    except Exception as _error:
        print('Error in sending mail >> {}'.format(_error))
        return False
