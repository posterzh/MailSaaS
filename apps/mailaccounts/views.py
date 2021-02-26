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

from apps.campaignschedule.models import Schedule

def check_smtp_email(server, port, email, password):
    import smtplib, ssl

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
            # print(request.data)
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
                    return Response({"message":check_smtp_email(request.data["smtp_host"], request.data["smtp_port"], request.data["email"], request.data["smtp_password"])[1],"sucess":False})
                return Response({"message":serializer.data,"sucess":True})
            return Response({'message':serializer.errors,"success":False})
        return Response({"message":"Smtp username and Imap username does not match to email"})

    def get(self,request,*args,**kwargs):

        try:
            queryset = EmailAccount.objects.filter(user=request.user.id)
            serializer = EmailAccountSerializer(queryset,many = True)
            return Response({"message":serializer.data,"sucess":True})

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
            return Response({"message":"Connection Updated Sucessfully"})
        return Response({"error":serializer.errors})
        
    def delete(self,request,pk,format=None):
        try:
            queryset = EmailAccount.objects.get(id=pk)
        except:
            return Response({"message":"No Mail Account For this Id"})
        queryset.delete()
        return Response({"message":"Connection Delete Sucessfully","Sucess":True})



def send_mail_with_smtp(host, host_port, host_user, host_pass, send_to, subject, msg):
    try:
        con = mail.get_connection()
        con.open()
        print('Django connected to the SMTP server')

        # mail_setting = EmailAccount.objects.last()
        # print(mail_setting)
        # host = mail_setting.smtp_host
        # host_user = mail_setting.smtp_username
        # host_pass = mail_setting.smtp_password
        # host_port = mail_setting.smtp_port

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
        # print("mail_obj.ssl_keyfile >>>>>>", mail_obj.close(), "mail_obj.ssl_certfile"  )
        mail_obj.send_messages([msg])

        print('Message has been sent.')

        mail_obj.close()
        con.close()
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

    service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
    emailMsg = 'You won $100,000'
    mimeMessage = MIMEMultipart()
    mimeMessage['to'] = 'ashutoshsharma@externlabs.com'
    mimeMessage['subject'] = 'You won'
    mimeMessage.attach(MIMEText(emailMsg, 'plain'))
    raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
    # print(raw_string,"<<<<<<<<<<<<<raw_string")
    # raw_string2 = base64.urlsafe_b64encode(mimeMessage.as_bytes())
    # message = service.users().messages().send(userId='me', body={'raw': raw_string}).execute()
    # print('Message Id: %s' % message['id'])
    # print(message)



import imaplib
import os
import pprint
import time

import progressbar


def imap():
    mail_setting = EmailAccount.objects.last()
    # print(mail_setting, "HI This is mail setting ")

    imap_host = mail_setting.imap_host
    imap_user = mail_setting.imap_username
    imap_pass = mail_setting.imap_password
    imap_port = mail_setting.imap_port
    # connect to host using SSL
    imap = imaplib.IMAP4_SSL(imap_host,imap_port)


    def animated_marker(): 
        widgets = ['Loading: ', progressbar.AnimatedMarker()] 
        bar = progressbar.ProgressBar(widgets=widgets).start() 
        
        for i in range(10): 
            time.sleep(0.1) 
            bar.update(i)
    ## login to server
    imap.login(imap_user, imap_pass)


#     imap.select('Inbox')

    tmp, data = imap.search(None, 'ALL')

    for num in data[0].split():
        animated_marker()
        tmpo, data = imap.fetch(num, '(RFC822)')
        emal = data[0][1].decode('utf-8')
        msg = message_from_string(emal)

        # emailData = str(email_message)

    # for response_part in data:

    # if isinstance(response_part, tuple):

    msges = message_from_string(data[1].decode('utf-8'))

    subject = str(msg).split("Subject: ", 1)[1].split("\nTo:", 1)[0]
    print(msges , "<------------")

    email_subject = msg['subject']

    print(email_subject, "<-------------emailsubject")

    email_from = msg['from']

    print(email_from, "<--------------email_from")





        # dirName = 'attachments/'
        # if not os.path.exists(dirName):
        #     # print("Creating folder ", dirName)
        #     os.mkdir(dirName)
        
        # for part in msg.walk():
        #     # print(part ,"i am in parttttttttttt")

       
        #     if part.get_content_maintype() == 'multipart':
        #         continue
        #     if part.get('Content-Disposition') is None:
        #         continue
        #     fileName = part.get_filename()

        #     if bool(fileName):

        #         filePath = os.path.join(dirName, fileName)
        #         if not os.path.isfile(filePath) :
        #             fp = open(filePath, 'wb')
        #             fp.write(part.get_payload(decode=True))
        #             fp.close()
        #         emailData = str(msg)
        #         # print(emailData , "hi this is email data\n")

        #         subject = str(msg).split("Subject: ", 1)[1].split("\nTo:", 1)[0]
        #         # print(subject , "hi this is subject\n")

        #         emailDate = str(msg).split("Date: ", 1)[1].split("\nFrom:", 1)[0]
        #         # print(emailDate , "hi this is emailDate\n")

        #         DeliveredTo = str(msg).split("Delivered-To: ", 1)[1].split("\nReceived:", 1)[0]
        #         # print(DeliveredTo , "hi this is DeliveredTo\n")

        #         sentBy = str(msg).split("From: ", 1)[1].split(">\n", 1)[0]
        #         # print(sentBy , "hi this is sentBy\n")

                # Content-Disposition
                # with open("test.txt",'a',encoding = 'utf-8') as f:
                #     f.write('emailData : ' + emailData + ' EMAILlllllDataaaaEND '+ '\n')
                #     f.write("\n************************************************************************\n")
                #     f.write('subject11 : ' + subject + ' SUBJECTEND '+ '\n')
                #     f.write("\n************************************************************************\n")
                #     f.write('Date11 : ' + emailDate + ' DATEEND '+'\n')
                #     f.write("\n************************************************************************\n")




















    imap.close()
