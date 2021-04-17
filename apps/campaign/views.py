import csv
import datetime
import json
import re
import pandas as pd
from io import StringIO
from datetime import date, datetime, time, timedelta
import pytracking
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.sites.models import Site
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives, send_mail
from django.db.models import Q, Count, Sum, Case, When, Value, IntegerField
from django.db.models import F
from django.db.models.functions import Coalesce, Cast
from django.db import connection
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.campaignschedule.models import Email_schedule
# from apps.integration.views import SendSlackMessage
from apps.unsubscribes.serializers import UnsubscribeEmailSerializers

from .models import (Campaign, CampaignLeadCatcher, CampaignRecipient, DripEmailModel, Recipient,
                     EmailOnLinkClick, FollowUpEmail, CampaignLabel, Emails, LeadSettings, EmailOutbox, LeadsLog)
from .serializers import (CampaignEmailSerializer, CampaignLeadCatcherSerializer, CampaignSerializer,
                          DripEmailSerilizer, FollowUpSerializer, CampaignDetailsSerializer, OnclickSerializer,
                          CampaignLabelSerializer, ProspectsSerializer, CampaignOverviewSerializer,
                          RecipientSerializer, CampaignListSerializer, LeadSettingsSerializer, EmailsSerializer,
                          LeadsLogSerializer)
from ..unsubscribes.models import UnsubscribeEmail
from apps.mailaccounts.models import EmailAccount
from apps.mailaccounts.utils.smtp import send_mail_with_smtp, convert_template


class CreateCampaignStartView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        # if request.user.is_active:
        #     postdata = request.data
        #     # postdata._mutable = True
        #     postdata["assigned"] = request.user.id
        #     # postdata._mutable = False
        #     serializer = CampaignSerializer(data=postdata)
        #     if serializer.is_valid():
        #         serializer.save()
        #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #     # return Response({'message':"Has No Permissions",'status':401})
        return Response({'message': "Your account is not active", 'status': status.HTTP_200_OK})


class CreateCampaignRecipientsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        # postdata = request.data
        # # option_list = json.loads(postdata["option"])
        # # email_list = json.loads(postdata["email"])
        # postdata._mutable = True
        # # postdata["option"] = option_list
        # # postdata["email"] = email_list
        # # postdata["option"] = ast.literal_eval(postdata["option"])
        # # postdata["email"] = ast.literal_eval(postdata["email"])
        # postdata._mutable = False
        #
        # resp = []
        #
        # try:
        #     camp = Campaign.objects.get(id=postdata['campaign'])
        #
        # except:
        #     return Response({"message": "No campiagn availabe for this id", "success": "false"})
        #
        # try:
        #     camp.csvfile_op1 = postdata['csvfile_op1']
        #     camp.save()
        #     return Response({"resp": resp, "success": True})
        # except:
        #     return Response({"message": "error", "success": False})

        # if 'campaign.add_campaign' in request.user.get_group_permissions():
        # if 1 in postdata["option"]:
        #
        #     try:
        #         camp = Campaign.objects.get(id=postdata['campaign'])
        #
        #     except:
        #         return Response({"message":"No campiagn availabe for this id", "success":"false"})
        #
        #     try:
        #         camp.csvfile = postdata['csvfile']
        #         camp.save()
        #         resp.append({"success": True})
        #     except:
        #         return Response({"message": "error", "success": False})
        #
        #     with open('media/'+str(camp.csvfile_op1)) as csv_file:
        #         csv_reader = csv.reader(csv_file, delimiter=',')
        #         line_count = 0
        #
        #         for row in csv_reader:
        #             if line_count == 0:
        #                 line_count += 1
        #                 # return Response({"message":"No Rows in file", "success":False})
        #             else:
        #                 data = {'email':row[0], 'full_name':row[1], 'company_name':row[2], 'role':row[3], 'campaign':postdata['campaign']}
        #                 serializer = CampaignEmailSerializer(data = data)
        #                 if serializer.is_valid():
        #                     line_count += 1
        #                     serializer.save()
        #                     resp.append(serializer.data)
        #         resp.append({"success":True})
        #         if 2 not in postdata["option"]:
        #             return Response({"resp":resp, "success":True})
        # if 2 in postdata["option"]:
        #
        #     postdata._mutable = True
        #
        #     print(postdata["email"])
        #     postdata._mutable = False
        #     for email in postdata["email"]:
        #         print("email = ",email)
        #         camp = Campaign.objects.get(id=postdata['campaign'])
        #         CampaignEmail = CampaignRecipient(campaign=camp, email=email)
        #         CampaignEmail.save()
        #         campData = CampaignEmailSerializer(CampaignEmail)
        #         resp.append(campData.data)
        #     return Response({"resp":resp,"message":"Saved Successfully","success":True})
        return Response({"message": "error", "success": False})


class CreateCampaignMessageView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        # postdata = request.data
        # camp = Campaign.objects.get(id=postdata["normal"]['campaign'])
        # campEmail = CampaignRecipient.objects.filter(campaign=postdata["normal"]['campaign'])
        # for campemail in campEmail:
        #     campEmailserializer = CampaignEmailSerializer(campemail)
        #     serializer_data = campEmailserializer.data
        #     serializer_data["subject"] = postdata["normal"]['subject']
        #     serializer_data["email_body"] = postdata["normal"]['email_body']
        #     CampEmailData = CampaignEmailSerializer(campemail, data=serializer_data)
        #     if CampEmailData.is_valid():
        #         CampEmailData.save()
        #
        # for follow_up in postdata["follow_up"]:
        #     FollowupEmail = FollowUpEmail(campaign=camp, waitDays=follow_up["waitDays"], subject=follow_up["subject"],
        #                                   email_body=follow_up["email_body"])
        #     FollowupEmail.save()
        #
        # for drips in postdata["drips"]:
        #     DripEmail = DripEmailModel(campaign=camp, waitDays=drips["waitDays"], subject=drips["subject"],
        #                                email_body=drips["email_body"])
        #     DripEmail.save()

        return Response({"message": "Saved Successfully"})


class CreateCampaignSendView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, format=None):
        resp = {}
        # try:
        #     camp = Campaign.objects.get(id=pk)
        # except:
        #     return Response({"message": "No Campaign with this id", "success": False})
        # # campSerializer = CampaignSerializer(camp)
        # resp["from_address"] = camp.from_address.email
        # resp["full_name"] = camp.from_address.full_name
        # campEmailrecipientsList = []
        # campEmail = CampaignRecipient.objects.filter(campaign=pk)
        # for campemail in campEmail:
        #     campEmailSerialiser = CampaignEmailSerializer(campemail)
        #     campEmailrecipientsList.append(campEmailSerialiser.data["email"])
        # resp["recipients"] = campEmailrecipientsList
        #
        # campEmaildatalist = []
        # campEmail = CampaignRecipient.objects.filter(campaign=pk).distinct('subject')
        # for campemail in campEmail:
        #     serializercampEmail = CampaignEmailSerializer(campemail)
        #     campEmaildatalist.append(serializercampEmail.data['subject'])
        # resp["campEamil"] = campEmaildatalist
        #
        # followupdatalist = []
        # follow_up = FollowUpEmail.objects.filter(campaign=pk).distinct('subject')
        # for followup in follow_up:
        #     serializerfollowup = FollowUpSerializer(followup)
        #     followupdatalist.append(serializerfollowup.data['subject'])
        # resp["follow_up"] = followupdatalist
        #
        # dripdatalist = []
        # drip_email = DripEmailModel.objects.filter(campaign=pk).distinct('subject')
        # for dripemail in drip_email:
        #     serilizedripmail = DripEmailSerilizer(dripemail)
        #     dripdatalist.append(serilizedripmail.data['subject'])
        # resp["drip"] = dripdatalist
        #
        # onclickdatalist = []
        # on_click = EmailOnLinkClick.objects.filter(campaign=pk).distinct('subject')
        # for onclick in on_click:
        #     serializeronclick = OnclickSerializer(onclick)
        #     onclickdatalist.append(serializeronclick.data['subject'])
        # resp["onLinkClick"] = onclickdatalist
        return Response(resp)

    def put(self, request, pk, format=None):
        # try:
        #     camp = Campaign.objects.get(id=pk)
        #
        # except:
        #     return Response({"message": "No Campaign with this id", "success": False})
        #
        # try:
        #     if request.data["startCampaign"]:
        #         pass
        # except:
        #     return Response({"message": "please provide startCampaign", "success": False})
        #
        # getCampData = CampaignSerializer(camp)
        # campData = dict(getCampData.data)
        # campData["campaign_status"] = request.data["startCampaign"]
        # if camp.csvfile_op1 != "":
        #     campData["csvfile_op1"] = camp.csvfile_op1
        #
        # CampSerializer = CampaignSerializer(camp, data=campData)
        # if request.data["startCampaign"]:
        #     camp.campaign_status = True
        #
        # camp.save()
        # if CampSerializer.is_valid():
        #     CampSerializer.save()
        # if (not camp.schedule_send) and camp.campaign_status:
        #     campEmail = CampaignRecipient.objects.filter(campaign=pk)
        #     for campemail in campEmail:
        #
        #         open_tracking_url = pytracking.get_open_tracking_url(
        #             {"campEmailId": campemail.id, "campaign": campemail.campaign.id},
        #             base_open_tracking_url="http://localhost:8000/campaign/email/open/",
        #             webhook_url="http://localhost:8000/campaign/email/open/",
        #             include_webhook_url=True
        #         )
        #
        #         email_body_links = re.findall(r'(https?://\S+)', campemail.email_body)
        #         if email_body_links:
        #             # URL is Present
        #             emailData = campemail.email_body
        #             # for link in email_body_links:
        #             # new_link = pytracking.get_click_tracking_url(
        #             #     link, {"campEmailId": campemail.id, "campaign": campemail.campaign.id},
        #             #     base_click_tracking_url=campemail.email_body,
        #             #     webhook_url=campemail.email_body, include_webhook_url=True)
        #             # emailData = emailData.replace(link, new_link)
        #             emailData += " <img width=0 height=0 src='" + open_tracking_url + "' />"
        #         else:
        #             # No URL Present
        #             emailData = campemail.email_body + " <img width=0 height=0 src='" + open_tracking_url + "' />"
        #         subject = campemail.subject
        #         text_content = 'plain text body message.'
        #         html_content = emailData
        #         # msg = EmailMultiAlternatives(subject, text_content, campemail.campaign.from_address.email, [campemail.email])
        #
        #         # msg.attach_alternative(html_content, "text/html")
        #         # msg.send()
        #         email_account_ob = EmailAccount.objects.get(user=request.user.id, email=camp.from_address.email)
        #         if email_account_ob.provider == "SMTP":
        #             print("Sending maile to ", campemail.email)
        #             # send_mail_with_smtp(email_account_ob.smtp_host, email_account_ob.smtp_port, email_account_ob.smtp_username, email_account_ob.smtp_password, [campemail.email], campemail.subject, emailData)
        #             import smtplib
        #             import email.message
        #             # server = smtplib.SMTP(email_account_ob.smtp_host)
        #             msg = email.message.Message()
        #             msg['Subject'] = campemail.subject
        #
        #             msg['From'] = email_account_ob.smtp_username
        #             msg['To'] = campemail.email
        #             password = email_account_ob.smtp_password
        #             msg.add_header('Content-Type', 'text/html')
        #             msg.set_payload(emailData)
        #
        #             s = smtplib.SMTP(email_account_ob.smtp_host + ':' + email_account_ob.smtp_port)
        #             s.starttls()
        #
        #             # Login Credentials for sending the mail
        #             s.login(msg['From'], password)
        #
        #             s.sendmail(msg['From'], [msg['To']], msg.as_string())
        #
        #             campemail.sent = True
        #         campemail.reciepent_status = True
        #         campemail.save()
        #
        # elif camp.schedule_send and camp.campaign_status:
        #     campEmail = CampaignRecipient.objects.filter(campaign=pk)
        #     for campemail in campEmail:
        #
        #         open_tracking_url = pytracking.get_open_tracking_url(
        #             {"campEmailId": campemail.id, "campaign": campemail.campaign.id},
        #             base_open_tracking_url="http://localhost:8000/campaign/email/open/",
        #             webhook_url="http://localhost:8000/campaign/email/open/",
        #             include_webhook_url=True
        #         )
        #
        #         email_body_links = re.findall(r'(https?://\S+)', campemail.email_body)
        #         if email_body_links:
        #             # URL is Present
        #             emailData = campemail.email_body
        #             for link in email_body_links:
        #                 new_link = pytracking.get_click_tracking_url(
        #                     link, {"campEmailId": campemail.id, "campaign": campemail.campaign.id},
        #                     base_click_tracking_url="http://localhost:8000/campaign/email/click/",
        #                     webhook_url="http://localhost:8000/campaign/email/click/", include_webhook_url=True)
        #                 emailData = emailData.replace(link, new_link)
        #         else:
        #             # No URL Present
        #             emailData = campemail.email_body + "<img width=0 height=0 src='" + open_tracking_url + "' />"
        #
        #         email_schedule_ob = Email_schedule(time=camp.schedule_time, date=camp.schedule_date,
        #                                            user_id=camp.assigned, mail_account=camp.from_address,
        #                                            recipient_email=campemail.email, subject=campemail.subject,
        #                                            email_body=emailData)
        #         email_schedule_ob.save()

        #     return Response({"message": "Updated Successfully", "success": True})
        # else:
        #     return Response({"message": CampSerializer.errors, "success": True})
        return Response({"message": "Updated Successfully", "success": True})


class CampaignGetAllEmailsPreview(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        resp = {}
        # getData = request.data
        # try:
        #     camp = Campaign.objects.get(id=pk)
        # except:
        #     return Response({"message": "No campiagn availabe for this id", "success": "false"})
        #
        # serializercamp = CampaignSerializer(camp)
        #
        #
        # resp["campaign"] = serializercamp.data
        #
        # campEmaildatalist = []
        # campEmail = CampaignRecipient.objects.filter(campaign=pk)
        # for campemail in campEmail:
        #     serializercampEmail = CampaignEmailSerializer(campemail)
        #     campEmaildatalist.append(serializercampEmail.data)
        # resp["campEmail"] = campEmaildatalist
        #
        # followupdatalist = []
        # follow_up = FollowUpEmail.objects.filter(campaign=pk)
        # for followup in follow_up:
        #     serializerfollowup = FollowUpSerializer(followup)
        #     followupdatalist.append(serializerfollowup.data)
        # resp["follow_up"] = followupdatalist
        #
        # dripdatalist = []
        # drip_email = DripEmailModel.objects.filter(campaign=pk)
        # for dripemail in drip_email:
        #     serilizedripmail = DripEmailSerilizer(dripemail)
        #     dripdatalist.append(serilizedripmail.data)
        # resp["drip"] = dripdatalist
        #
        # onclickdatalist = []
        # on_click = EmailOnLinkClick.objects.filter(campaign=pk)
        # for onclick in on_click:
        #     serializeronclick = OnclickSerializer(onclick)
        #     onclickdatalist.append(serializeronclick.data)
        # resp["onLinkClick"] = onclickdatalist

        return Response(resp)

    def put(self, request, pk, *args, **kwargs):
        # for campemail in request.data["campEmail"]:
        #     campEmalOb = CampaignRecipient.objects.get(id=campemail["id"])
        #     campEmailSave = CampaignEmailSerializer(campEmalOb, data=campemail)
        #     if campEmailSave.is_valid():
        #         campEmailSave.save()
        #     else:
        #         return Response({"message": "Campain Email Error"})
        # for followup in request.data["follow_up"]:
        #     followUpOb = FollowUpEmail.objects.get(id=followup["id"])
        #     followUpSave = FollowUpSerializer(followUpOb, data=followup)
        #     if followUpSave.is_valid():
        #         followUpSave.save()
        #     else:
        #         return Response({"message": "Follow Up Email Error"})
        # for drip in request.data["drip"]:
        #     dripEmailOb = DripEmailModel.objects.get(id=drip["id"])
        #     dripEmailSave = DripEmailSerilizer(dripEmailOb, data=drip)
        #     if dripEmailSave.is_valid():
        #         dripEmailSave.save()
        #     else:
        #         return Response({"message": "Drip Email Error"})
        # for onLinkClick in request.data["onLinkClick"]:
        #     onLinkClickOb = EmailOnLinkClick.objects.get(id=onLinkClick["id"])
        #     onLinkClickSave = OnclickSerializer(onLinkClickOb, data=onLinkClick)
        #     if onLinkClickSave.is_valid():
        #         onLinkClickSave.save()
        #     else:
        #         return Response({"message": "On Link Click Email Error"})

        return Response({"message": "Updated Successfully", "success": "True"})


class CreateCampaignOptionView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        # if request.data['terms_and_laws'] == True:
        #     try:
        #         queryset = Campaign.objects.get(id=request.data['campaign'])
        #     except:
        #         return Response({"message": "No campiagn availabe for this id", "success": "false"})
        #     if queryset.csvfile_op1 == "":
        #         csvfile_op1 = None
        #     else:
        #         csvfile_op1 = queryset.csvfile_op1
        #     request.data["title"] = queryset.title
        #     request.data["from_address"] = queryset.from_address.id
        #     request.data["full_name"] = queryset.full_name
        #     request.data["csvfile_op1"] = csvfile_op1
        #     request.data["assigned"] = request.user.id
        #     request.data["update_date_time"] = datetime.now()
        #     request.data["created_date_time"] = queryset.created_date_time
        #
        #     if request.data["schedule_send"] and not (request.data["schedule_date"] or request.data["schedule_time"]):
        #         return Response({"message": "Please Enter Date Time", "success": "false"})
        #     if request.data["schedule_send"]:
        #         req_date_list = request.data["schedule_date"].split("-")
        #         req_time_list = request.data["schedule_time"].split(":")
        #         request.data["schedule_date"] = date(int(req_date_list[0]), int(req_date_list[1]),
        #                                              int(req_date_list[2]))
        #         request.data["schedule_time"] = time(int(req_time_list[0]), int(req_time_list[1]),
        #                                              int(req_time_list[2]))
        #
        #     else:
        #         request.data["schedule_date"] = None
        #         request.data["schedule_time"] = None
        #     serilizer = CampaignSerializer(queryset, data=request.data)
        #     if serilizer.is_valid():
        #         serilizer.save()
        #         return Response(serilizer.data)
        #     return Response({'message': 'invalid serilizer', "success": "false"})
        return Response({"message": "Please agree to the terms.", "success": "false"})


class CampaignCreateView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):

        if request.user.is_active:
            # if 'campaign.add_campaign' in request.user.get_group_permissions():
            post_data = request.data
            # postdata._mutable = False
            campaign = json.loads(post_data['campaign'])
            campaign['assigned'] = request.user.id
            if post_data['csvfile'] and len(post_data['csvfile']) > 0:
                campaign['csvfile'] = post_data['csvfile']
                campaign['csvfile_name'] = post_data['csvfile'].name

            camp = CampaignSerializer(data=campaign)
            if camp.is_valid():
                new_camp = camp.save()
                campaign_id = new_camp.id

                intro_email = Emails(campaign=new_camp, email_subject=campaign["email_subject"],
                                     email_body=campaign["email_body"], email_type=0)
                intro_email.save()

                if len(campaign['follow_up']) > 0:
                    self.createFollowUps(new_camp, campaign['follow_up'])

                if len(campaign['drips']) > 0:
                    self.createDrips(new_camp, campaign['drips'])

                if new_camp.csvfile:
                    self.createRecipients(new_camp)

                return Response({"message": "Created new campaign successfully", "success": True},
                                status=status.HTTP_200_OK)
            return Response({"message": "Failed to create campaign", "success": False},
                            status=status.HTTP_400_BAD_REQUEST)

    def createFollowUps(self, camp, follow_ups):
        if len(follow_ups) == 0:
            return

        email_order = 0
        for follow_up in follow_ups:
            follow_email = Emails(campaign=camp, wait_days=follow_up["wait_days"],
                                  email_subject=follow_up["email_subject"],
                                  email_body=follow_up["email_body"], email_type=1, email_order=email_order)
            follow_email.save()
            email_order += 1

    def createDrips(self, camp, drips):
        if len(drips) == 0:
            return

        email_order = 0

        for drip in drips:
            drip_email = Emails(campaign=camp, wait_days=drip["wait_days"], email_subject=drip["email_subject"],
                                email_body=drip["email_body"], email_type=2, email_order=email_order)
            drip_email.save()
            email_order += 1

    def createRecipients(self, new_camp):
        campaign_id = new_camp.id
        # read csv file
        csv_content = new_camp.csvfile.read()
        file_data = csv_content.decode("utf-8")
        string_data = StringIO(file_data)
        df_csv = pd.read_csv(string_data)

        df_csv.drop(df_csv.columns[df_csv.columns.str.contains('unnamed', case=False)], axis=1, inplace=True)
        csv_columns = df_csv.columns

        if "Email" in csv_columns:
            df_csv.rename(columns={'Email': 'email'}, inplace=True)
        df_csv.dropna(subset=["email"], inplace=True)
        df_csv.drop_duplicates(subset=["email"], inplace=True)

        res_emails = df_csv[['email']]
        res_replacements = json.loads(df_csv.to_json(orient="records"))

        for email, replacement in zip(res_emails.values, res_replacements):
            res_data = {
                'campaign': campaign_id,
                'email': email[0],
                'replacement': json.dumps(replacement)
            }

            res = RecipientSerializer(data=res_data)
            if res.is_valid():
                res.save()
            else:
                print(res.errors)

    def convertTemplate(self, template, replacement):
        for key in replacement.keys():
            key_match = "{{" + key + "}}"
            if key_match in template:
                template = template.replace(key_match, replacement[key])

        return template


class CampaignDeleteView(generics.UpdateAPIView):
    permissions = (permissions.IsAuthenticated,)
    serializer_class = CampaignSerializer

    def get_queryset(self):
        return Campaign.objects.filter(assigned=self.request.user.id)


class CampaignSequenceUpdateView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        emails = request.data
        for index, email in enumerate(emails):
            if 'id' in email:
                instance = Emails.objects.get(pk=email['id'])
                serializer = EmailsSerializer(instance, data=email)
            else:
                serializer = EmailsSerializer(data=email)

            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(status=status.HTTP_200_OK)


class CampaignListView(generics.ListAPIView):
    queryset = Campaign.objects.annotate(recipients=Count('recipient'),
                                         sent=Coalesce(Sum('recipient__sent'), 0),
                                         opens=Coalesce(Sum('recipient__opens'), 0),
                                         leads=Coalesce(Sum('recipient__leads'), 0),
                                         replies=Coalesce(Sum('recipient__replies'), 0),
                                         bounces=Coalesce(Sum('recipient__bounces'), 0))

    serializer_class = CampaignListSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        return super().get_queryset().filter(assigned=self.request.user.id, is_deleted=False).order_by('-id')


class CampaignView(generics.ListAPIView):
    """
        For Get all Campaign by user 
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        campaigns = Campaign.objects.filter(assigned=request.user.id)
        allData = []
        for camp in campaigns:
            campEmail = CampaignRecipient.objects.filter(campaign=camp.id)
            campEmailserializer = CampaignEmailSerializer(campEmail, many=True)
            resp = {
                "id": camp.pk,
                "camp_title": camp.title,
                "camp_created_date_time": camp.created_date_time.strftime("%B %d"),
                "assigned": camp.assigned.full_name,
                "recipientCount": campEmail.count(),
                "sentCount": 0,
                "leadCount": 0,
                "opensCount": 0,
                "openLeadCount": 0,
                "wonLeadCount": 0,
                "lostLeadCount": 0,
                "ignoredLeadCount": 0,
                "forwardedLeadCount": 0,

            }
            for campData in campEmailserializer.data:
                if campData["sent"]:
                    resp["sentCount"] = resp["sentCount"] + 1

                if campData["opens"]:
                    resp["opensCount"] = resp["opensCount"] + 1

                if campData["leads"]:
                    resp["leadCount"] = resp["leadCount"] + 1

                    if campData["lead_status"] == "openLead":
                        resp["openLeadCount"] = resp["openLeadCount"] + 1
                    if campData["lead_status"] == "wonLead":
                        resp["wonLeadCount"] = resp["wonLeadCount"] + 1
                    if campData["lead_status"] == "lostLead":
                        resp["lostLeadCount"] = resp["lostLeadCount"] + 1
                    if campData["lead_status"] == "ignoredLead":
                        resp["ignoredLeadCount"] = resp["ignoredLeadCount"] + 1
                    if campData["lead_status"] == "forwardedLead":
                        resp["forwardedLeadCount"] = resp["forwardedLeadCount"] + 1

            allData.append(resp)
        return Response(allData)


class LeadsCatcherView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        params = list(dict(request.GET).keys())
        if len(params) == 4:
            toSearch = request.GET['search']
            title = request.GET['title']

            if request.GET['date'] == "last14days":
                to_date = datetime.today()
                from_date = to_date - timedelta(days=14)

            elif request.GET['date'] == "last30days":
                to_date = datetime.today()
                from_date = to_date - timedelta(days=30)

            elif request.GET['date'] == "last90days":
                to_date = datetime.today()
                from_date = to_date - timedelta(days=90)

            elif request.GET['date'] == "last6weeks":
                to_date = datetime.today()
                from_date = to_date - timedelta(weeks=6)

            elif request.GET['date'] == "last3months":
                to_date = datetime.today()
                month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                last_year = to_date.year - 1
                from_date = to_date.replace(month=month_3_ago)
                if from_date > to_date:
                    from_date = from_date.replace(year=last_year)

            elif request.GET['date'] == "last6months":
                to_date = datetime.today()
                month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                last_year = to_date.year - 1
                from_date = to_date.replace(month=month_6_ago)
                if from_date > to_date:
                    from_date = from_date.replace(year=last_year)

            elif request.GET['date'] == "last12months":
                to_date = datetime.today()
                month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                last_year = to_date.year - 1
                from_date = to_date.replace(month=month_12_ago)
                if from_date > to_date:
                    from_date = from_date.replace(year=last_year)
            elif request.GET['date'] == "monthtodate":
                to_date = datetime.today()
                from_date = to_date.replace(day=1)

            elif request.GET['date'] == "yeartodate":
                to_date = datetime.today()
                from_date = to_date.replace(month=1, day=1)

            if request.GET['leadstatus'] == "openlead":
                leadstatus = "openLead"
            elif request.GET['leadstatus'] == "wonlead":
                leadstatus = "wonLead"
            elif request.GET['leadstatus'] == "lostlead":
                leadstatus = "lostLead"
            elif request.GET['leadstatus'] == "ignorelead":
                leadstatus = "ignoreLead"
            elif request.GET['leadstatus'] == "forwardedlad":
                leadstatus = "forwardedLead"
            else:
                leadstatus = "openLead"
            queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch) | Q(full_name__contains=toSearch),
                                                        campaign__title__contains=title, lead_status=leadstatus,
                                                        created_date_time__range=(from_date, to_date),
                                                        campaign__assigned=request.user.id, leads=True)


        elif len(params) == 3:
            if 'search' and 'leadstatus' and 'date' in params:
                toSearch = request.GET['search']

                if request.GET['leadstatus'] == "openlead":
                    leadstatus = "openLead"
                elif request.GET['leadstatus'] == "wonlead":
                    leadstatus = "wonLead"
                elif request.GET['leadstatus'] == "lostlead":
                    leadstatus = "lostLead"
                elif request.GET['leadstatus'] == "ignorelead":
                    leadstatus = "ignoreLead"
                elif request.GET['leadstatus'] == "forwardedlead":
                    leadstatus = "forwardedLead"
                else:
                    leadstatus = "openLead"

                if request.GET['date'] == "last14days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=14)

                elif request.GET['date'] == "last30days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=30)

                elif request.GET['date'] == "last90days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=90)

                elif request.GET['date'] == "last6weeks":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(weeks=6)

                elif request.GET['date'] == "last3months":
                    to_date = datetime.today()
                    month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_3_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last6months":
                    to_date = datetime.today()
                    month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_6_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last12months":
                    to_date = datetime.today()
                    month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_12_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)
                elif request.GET['date'] == "monthtodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(day=1)

                elif request.GET['date'] == "yeartodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(month=1, day=1)

                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), lead_status=leadstatus,
                    created_date_time__range=(from_date, to_date), campaign__assigned=request.user.id, leads=True)

            elif 'search' and 'date' and 'title' in params:
                toSearch = request.GET['search']
                title = request.GET['title']

                if request.GET['date'] == "last14days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=14)

                elif request.GET['date'] == "last30days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=30)

                elif request.GET['date'] == "last90days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=90)

                elif request.GET['date'] == "last6weeks":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(weeks=6)

                elif request.GET['date'] == "last3months":
                    to_date = datetime.today()
                    month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_3_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last6months":
                    to_date = datetime.today()
                    month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_6_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last12months":
                    to_date = datetime.today()
                    month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_12_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)
                elif request.GET['date'] == "monthtodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(day=1)

                elif request.GET['date'] == "yeartodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(month=1, day=1)

                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign__title__contains=title,
                    created_date_time__range=(from_date, to_date), campaign__assigned=request.user.id, leads=True)

            elif 'search' and 'leadstatus' and 'title' in params:
                toSearch = request.GET['search']
                title = request.GET['title']

                if request.GET['leadstatus'] == "openlead":
                    leadstatus = "openLead"
                elif request.GET['leadstatus'] == "wonlead":
                    leadstatus = "wonLead"
                elif request.GET['leadstatus'] == "lostlead":
                    leadstatus = "lostLead"
                elif request.GET['leadstatus'] == "ignorelead":
                    leadstatus = "ignoreLead"
                elif request.GET['leadstatus'] == "forwardedlead":
                    leadstatus = "forwardedLead"
                else:
                    leadstatus = "openLead"

                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign__title__contains=title,
                    lead_status=leadstatus, campaign__assigned=request.user.id, leads=True)

            elif 'leadstatus' and 'date' and 'title' in params:
                title = request.GET['title']

                if request.GET['leadstatus'] == "openlead":
                    leadstatus = "openLead"
                elif request.GET['leadstatus'] == "wonlead":
                    leadstatus = "wonLead"
                elif request.GET['leadstatus'] == "lostlead":
                    leadstatus = "lostLead"
                elif request.GET['leadstatus'] == "ignorelead":
                    leadstatus = "ignoreLead"
                elif request.GET['leadstatus'] == "forwardedlead":
                    leadstatus = "forwardedLead"
                else:
                    leadstatus = "openLead"

                if request.GET['date'] == "last14days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=14)

                elif request.GET['date'] == "last30days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=30)

                elif request.GET['date'] == "last90days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=90)

                elif request.GET['date'] == "last6weeks":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(weeks=6)

                elif request.GET['date'] == "last3months":
                    to_date = datetime.today()
                    month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_3_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last6months":
                    to_date = datetime.today()
                    month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_6_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last12months":
                    to_date = datetime.today()
                    month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_12_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)
                elif request.GET['date'] == "monthtodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(day=1)

                elif request.GET['date'] == "yeartodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(month=1, day=1)

                queryset = CampaignRecipient.objects.filter(campaign__title__contains=title, lead_status=leadstatus,
                                                            created_date_time__range=(from_date, to_date),
                                                            campaign__assigned=request.user.id, leads=True)


        elif len(params) == 2:
            if 'search' and 'title' in params:
                toSearch = request.GET['search']
                title = request.GET['title']

                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign__title__contains=title,
                    campaign__assigned=request.user.id, leads=True)

            elif 'search' and "leadstatus" in params:
                toSearch = request.GET['search']
                if request.GET['leadstatus'] == "openlead":
                    leadstatus = "openLead"
                elif request.GET['leadstatus'] == "wonlead":
                    leadstatus = "wonLead"
                elif request.GET['leadstatus'] == "lostlead":
                    leadstatus = "lostLead"
                elif request.GET['leadstatus'] == "ignorelead":
                    leadstatus = "ignoreLead"
                elif request.GET['leadstatus'] == "forwardedlead":
                    leadstatus = "forwardedLead"
                else:
                    leadstatus = "openLead"

                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), lead_status=leadstatus,
                    campaign__assigned=request.user.id, leads=True)


            elif "title" and "leadstatus" in params:

                title = request.GET['title']
                if request.GET['leadstatus'] == "openlead":
                    leadstatus = "openLead"
                elif request.GET['leadstatus'] == "wonlead":
                    leadstatus = "wonLead"
                elif request.GET['leadstatus'] == "lostlead":
                    leadstatus = "lostLead"
                elif request.GET['leadstatus'] == "ignorelead":
                    leadstatus = "ignoreLead"
                elif request.GET['leadstatus'] == "forwardedLead":
                    leadstatus = "forwardedLead"
                else:
                    leadstatus = "openLead"
                queryset = CampaignRecipient.objects.filter(campaign__title__contains=title, lead_status=leadstatus,
                                                            campaign__assigned=request.user.id, leads=True)

            elif "search" and "date" in params:

                toSearch = request.GET['search']

                if request.GET['date'] == "last14days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=14)

                elif request.GET['date'] == "last30days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=30)

                elif request.GET['date'] == "last90days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=90)

                elif request.GET['date'] == "last6weeks":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(weeks=6)

                elif request.GET['date'] == "last3months":
                    to_date = datetime.today()
                    month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_3_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last6months":
                    to_date = datetime.today()
                    month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_6_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last12months":
                    to_date = datetime.today()
                    month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_12_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)
                elif request.GET['date'] == "monthtodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(day=1)

                elif request.GET['date'] == "yeartodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(month=1, day=1)

                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch),
                    created_date_time__range=(from_date, to_date), campaign__assigned=request.user.id, leads=True)

            elif "title" and "date" in params:

                title = request.GET['title']

                if request.GET['date'] == "last14days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=14)

                elif request.GET['date'] == "last30days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=30)

                elif request.GET['date'] == "last90days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=90)

                elif request.GET['date'] == "last6weeks":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(weeks=6)

                elif request.GET['date'] == "last3months":
                    to_date = datetime.today()
                    month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_3_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last6months":
                    to_date = datetime.today()
                    month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_6_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last12months":
                    to_date = datetime.today()
                    month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_12_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)
                elif request.GET['date'] == "monthtodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(day=1)

                elif request.GET['date'] == "yeartodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(month=1, day=1)

                queryset = CampaignRecipient.objects.filter(campaign__title__contains=title,
                                                            created_date_time__range=(from_date, to_date),
                                                            campaign__assigned=request.user.id, leads=True)

            elif "leadstatus" and "date" in params:
                if request.GET['leadstatus'] == "openlead":
                    leadstatus = "openLead"
                elif request.GET['leadstatus'] == "wonlead":
                    leadstatus = "wonLead"
                elif request.GET['leadstatus'] == "lostlead":
                    leadstatus = "lostLead"
                elif request.GET['leadstatus'] == "ignorelead":
                    leadstatus = "ignoreLead"
                elif request.GET['leadstatus'] == "forwardedLead":
                    leadstatus = "forwardedLead"
                else:
                    leadstatus = "openLead"

                if request.GET['date'] == "last14days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=14)

                elif request.GET['date'] == "last30days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=30)

                elif request.GET['date'] == "last90days":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(days=90)

                elif request.GET['date'] == "last6weeks":
                    to_date = datetime.today()
                    from_date = to_date - timedelta(weeks=6)

                elif request.GET['date'] == "last3months":
                    to_date = datetime.today()
                    month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_3_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last6months":
                    to_date = datetime.today()
                    month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_6_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)

                elif request.GET['date'] == "last12months":
                    to_date = datetime.today()
                    month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                    last_year = to_date.year - 1
                    from_date = to_date.replace(month=month_12_ago)
                    if from_date > to_date:
                        from_date = from_date.replace(year=last_year)
                elif request.GET['date'] == "monthtodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(day=1)

                elif request.GET['date'] == "yeartodate":
                    to_date = datetime.today()
                    from_date = to_date.replace(month=1, day=1)

                queryset = CampaignRecipient.objects.filter(lead_status=leadstatus,
                                                            created_date_time__range=(from_date, to_date),
                                                            campaign__assigned=request.user.id, leads=True)

        elif len(params) == 1:
            if "search" in params:
                toSearch = request.GET['search']
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign__assigned=request.user.id,
                    leads=True)
            elif "title" in params:
                title = request.GET['title']
                queryset = CampaignRecipient.objects.filter(campaign__title__contains=title,
                                                            campaign__assigned=request.user.id, leads=True)
            elif "leadstatus" in params:
                if request.GET['leadstatus'] == "openlead":
                    leadstatus = "openLead"
                elif request.GET['leadstatus'] == "wonlead":
                    leadstatus = "wonLead"
                elif request.GET['leadstatus'] == "lostlead":
                    leadstatus = "lostLead"
                elif request.GET['leadstatus'] == "ignorelead":
                    leadstatus = "ignoreLead"
                elif request.GET['leadstatus'] == "forwardedLead":
                    leadstatus = "forwardedLead"
                else:
                    leadstatus = "openLead"
                queryset = CampaignRecipient.objects.filter(lead_status=leadstatus, campaign__assigned=request.user.id,
                                                            leads=True)

            elif "date" in params:
                try:
                    if request.GET['date'] == "last14days":
                        to_date = datetime.today()
                        from_date = to_date - timedelta(days=14)

                    elif request.GET['date'] == "last30days":
                        to_date = datetime.today()
                        from_date = to_date - timedelta(days=30)

                    elif request.GET['date'] == "last90days":
                        to_date = datetime.today()
                        from_date = to_date - timedelta(days=90)

                    elif request.GET['date'] == "last6weeks":
                        to_date = datetime.today()
                        from_date = to_date - timedelta(weeks=6)

                    elif request.GET['date'] == "last3months":
                        to_date = datetime.today()
                        month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                        last_year = to_date.year - 1
                        from_date = to_date.replace(month=month_3_ago)
                        if from_date > to_date:
                            from_date = from_date.replace(year=last_year)

                    elif request.GET['date'] == "last6months":
                        to_date = datetime.today()
                        month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                        last_year = to_date.year - 1
                        from_date = to_date.replace(month=month_6_ago)
                        if from_date > to_date:
                            from_date = from_date.replace(year=last_year)

                    elif request.GET['date'] == "last12months":
                        to_date = datetime.today()
                        month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                        last_year = to_date.year - 1
                        from_date = to_date.replace(month=month_12_ago)
                        if from_date > to_date:
                            from_date = from_date.replace(year=last_year)
                    elif request.GET['date'] == "monthtodate":
                        to_date = datetime.today()
                        from_date = to_date.replace(day=1)

                    elif request.GET['date'] == "yeartodate":
                        to_date = datetime.today()
                        from_date = to_date.replace(month=1, day=1)

                    queryset = CampaignRecipient.objects.filter(created_date_time__range=(from_date, to_date),
                                                                campaign__assigned=request.user.id, leads=True)
                except Exception as E:
                    print('E', E)
        else:
            queryset = CampaignRecipient.objects.filter(leads=True, campaign__assigned=request.user.id)
        campEmailserializer = CampaignEmailSerializer(queryset, many=True)
        return Response(campEmailserializer.data)


class TrackEmailOpen(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None, id=None):
        full_url = settings.SITE_URL + request.get_full_path()
        tracking_result = pytracking.get_open_tracking_result(
            full_url, base_open_tracking_url=settings.SITE_URL + "/campaign/email/open/")

        trackData = tracking_result.metadata

        camp = Campaign.objects.get(id=trackData["campaign"])

        campEmail = CampaignRecipient.objects.get(id=trackData["campEmailId"])
        campEmail.opens = True
        campEmail.leads = True
        campEmail.save()
        return Response({"message": "Saved Successfully"})


class TrackEmailClick(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None, id=None):
        # tracking_result = pytracking.get_open_tracking_result(
        #     full_url, base_click_tracking_url="https://trackingdomain.com/path/")
        # full_url = settings.SITE_URL + request.get_full_path()
        #
        # tracking_result = pytracking.get_open_tracking_result(
        #     full_url, base_click_tracking_url=settings.SITE_URL + "/campaign/email/click/")

        # full_url = settings.SITE_URL + request.get_full_path()

        # # print("fulllll urllll ",full_url)

        # tracking_result = pytracking.get_open_tracking_result(
        #     full_url, base_open_tracking_url = settings.SITE_URL + "campaign/email/open/")

        # trackData = tracking_result.metadata
        # print(trackData)

        # camp = Campaign.objects.get(id = trackData["campaign"])
        # print("campaignnnnnnnnn ",camp)

        # campEmail = CampaignRecipient.objects.get(id = trackData["campEmailId"])
        # campEmail.opens = True
        # campEmail.save()
        # if camp.trackOpens:
        #     counttracking = countTracking + 1

        return Response({"message": "Saved Successfully"})


class GetCampaignOverview(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, format=None):
        # postdata = request.data
        #
        # campEmail = CampaignRecipient.objects.filter(campaign=pk)
        # campEmailserializer = CampaignEmailSerializer(campEmail, many=True)
        # resp = {
        #     "recipientCount": campEmail.count(),
        #     "leadCount": 0,
        #     "openLeadCount": 0,
        #     "openLeadPer": 0,
        #     "wonLeadCount": 0,
        #     "wonLeadPer": 0,
        #     "lostLeadCount": 0,
        #     "lostLeadPer": 0,
        #     "ignoredLeadCount": 0,
        #     "ignoredLeadPer": 0,
        #     "sentCount": 0,
        #     "sentPer": 0,
        #     "openCount": 0,
        #     "openPer": 0,
        #     "replyCount": 0,
        #     "replyPer": 0,
        #     "unsubscribeCount": 0,
        #     "unsubscribePer": 0,
        # }
        # for campData in campEmailserializer.data:
        #     if campData["leads"]:
        #         resp["leadCount"] = resp["leadCount"] + 1
        #
        #         if campData["lead_status"] == "openLead":
        #             resp["openLeadCount"] = resp["openLeadCount"] + 1
        #         if campData["lead_status"] == "wonLead":
        #             resp["wonLeadCount"] = resp["wonLeadCount"] + 1
        #         if campData["lead_status"] == "lostLead":
        #             resp["lostLeadCount"] = resp["lostLeadCount"] + 1
        #         if campData["lead_status"] == "ignoredLead":
        #             resp["ignoredLeadCount"] = resp["ignoredLeadCount"] + 1
        #
        #         resp["openLeadPer"] = round((resp["openLeadCount"] * 100) / resp["leadCount"], 2)
        #         resp["wonLeadPer"] = round((resp["wonLeadCount"] * 100) / resp["leadCount"], 2)
        #         resp["lostLeadPer"] = round((resp["lostLeadCount"] * 100) / resp["leadCount"], 2)
        #         resp["ignoredLeadPer"] = round((resp["ignoredLeadCount"] * 100) / resp["leadCount"], 2)
        #     if campData["sent"]:
        #         resp["sentCount"] += 1
        #     resp["sentPer"] = round((resp["sentCount"] * 100) / resp["recipientCount"], 2)
        #     if campData["opens"]:
        #         resp["openCount"] += 1
        #     resp["openPer"] = round((resp["openCount"] * 100) / resp["recipientCount"], 2)
        #     if campData["replies"]:
        #         resp["replyCount"] += 1
        #     resp["replyPer"] = round((resp["replyCount"] * 100) / resp["recipientCount"], 2)
        #     if campData["unsubscribe"]:
        #         resp["unsubscribeCount"] += 1
        #     resp["unsubscribePer"] = round((resp["unsubscribeCount"] * 100) / resp["recipientCount"], 2)
        return Response({})


class CampaignOverviewSummary(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['leads', 'bounces', 'is_unsubscribe']

    def get(self, request, pk):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        funnel_queryset = Emails.objects \
            .filter(campaign=pk, campaign__assigned=self.request.user.id) \
            .annotate(recipient_count=Count(Case(When(emailoutbox__status=1,
                                                      then='emailoutbox__recipient'),
                                                 default=None,
                                                 output_field=IntegerField()), distinct=True),
                      opened_count=Sum('emailoutbox__opened'),
                      clicked_count=Sum('emailoutbox__clicked'),
                      replied_count=Sum('emailoutbox__replied'),
                      bounced_count=Sum('emailoutbox__bounced'))

        funnel_serializer = CampaignOverviewSerializer(funnel_queryset, many=True)
        funnel = funnel_serializer.data

        totals = EmailOutbox.objects \
            .filter(campaign=pk, campaign__assigned=self.request.user.id, status=1) \
            .aggregate(recipient_count=Count('recipient', distinct=True),
                       in_campaign_count=Count('recipient', distinct=True),
                       opened_count=Sum('opened'),
                       clicked_count=Sum('clicked'),
                       replied_count=Sum('replied'),
                       bounced_count=Sum('bounced'))

        try:
            campaign = Campaign.objects.get(pk=pk)
        except:
            return Response("Bad request", status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "id": campaign.id,
            "title": campaign.title,
            "funnel": funnel,
            "totals": totals,
        })

    # permission_classes = (permissions.IsAuthenticated,)
    #
    # def get(self, request, pk, format=None):
    #     postdata = request.data
    #
    #     try:
    #         camp = Campaign.objects.get(id=pk)
    #     except:
    #         return Response({"message": "No Campaign with this id", "success": False})
    #
    #     campEmail = Recipient.objects.filter(campaign=pk)
    #     campEmailserializer = CampaignRecipientSerializer(campEmail, many=True)
    #
    #     resp = {
    #         "id": pk,
    #         "title": camp.title,
    #         "recipients": campEmail.count(),
    #         "intro": {},
    #         "follow-ups": [],
    #         "drips": [],
    #         "leads": {}
    #     }
    #
    #     resp = {
    #         "id": pk,
    #         "title": camp.title,
    #         "recipientCount": campEmail.count(),
    #         "leadCount": 0,
    #         "openLeadCount": 0,
    #         "openLeadPer": 0,
    #         "wonLeadCount": 0,
    #         "wonLeadPer": 0,
    #         "lostLeadCount": 0,
    #         "lostLeadPer": 0,
    #         "ignoredLeadCount": 0,
    #         "ignoredLeadPer": 0,
    #         "sentCount": 0,
    #         "sentPer": 0,
    #         "openCount": 0,
    #         "openPer": 0,
    #         "replyCount": 0,
    #         "replyPer": 0,
    #         "unsubscribeCount": 0,
    #         "unsubscribePer": 0
    #     }
    #     for campData in campEmailserializer.data:
    #         if campData["leads"]:
    #             resp["leadCount"] = resp["leadCount"] + 1
    #
    #             if campData["lead_status"] == "openLead":
    #                 resp["openLeadCount"] = resp["openLeadCount"] + 1
    #             if campData["lead_status"] == "wonLead":
    #                 resp["wonLeadCount"] = resp["wonLeadCount"] + 1
    #             if campData["lead_status"] == "lostLead":
    #                 resp["lostLeadCount"] = resp["lostLeadCount"] + 1
    #             if campData["lead_status"] == "ignoredLead":
    #                 resp["ignoredLeadCount"] = resp["ignoredLeadCount"] + 1
    #
    #             resp["openLeadPer"] = round((resp["openLeadCount"] * 100) / resp["leadCount"], 2)
    #             resp["wonLeadPer"] = round((resp["wonLeadCount"] * 100) / resp["leadCount"], 2)
    #             resp["lostLeadPer"] = round((resp["lostLeadCount"] * 100) / resp["leadCount"], 2)
    #             resp["ignoredLeadPer"] = round((resp["ignoredLeadCount"] * 100) / resp["leadCount"], 2)
    #         if campData["sent"]:
    #             resp["sentCount"] += 1
    #         resp["sentPer"] = round((resp["sentCount"] * 100) / resp["recipientCount"], 2)
    #         if campData["opens"]:
    #             resp["openCount"] += 1
    #         resp["openPer"] = round((resp["openCount"] * 100) / resp["recipientCount"], 2)
    #         if campData["replies"]:
    #             resp["replyCount"] += 1
    #         resp["replyPer"] = round((resp["replyCount"] * 100) / resp["recipientCount"], 2)
    #         if campData["is_unsubscribe"]:
    #             resp["unsubscribeCount"] += 1
    #         resp["unsubscribePer"] = round((resp["unsubscribeCount"] * 100) / resp["recipientCount"], 2)
    #     return Response({"result": resp, "success": True})


class AllRecipientView(generics.RetrieveUpdateDestroyAPIView):
    """  For View  all Recipients """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        params = list(dict(request.GET).keys())
        """
        These filter are pending
        Recipients with problem, customized message, has clicked,
        has out-of-office reply, you replied,has not clicked, you have not replied 
        """
        if ['search', 'tofilter'] in params:
            toSearch = request.GET['search']
            tofilter = request.GET['tofilter']
            if request.GET['tofilter'] == 'paused_reciepent':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, reciepent_status=False)
            elif request.GET['tofilter'] == 'leads':
                choice = request.GET['choice']
                if request.GET['choice'] == "openlead":
                    choice = "openLead"
                elif request.GET['choice'] == "wonlead":
                    choice = "wonLead"
                elif request.GET['choice'] == "lostlead":
                    choice = "lostLead"
                elif request.GET['choice'] == "ignorelead":
                    choice = "ignoreLead"
                else:
                    choice = "none"
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, leads=True,
                    lead_status=choice)
            elif request.GET['tofilter'] == 'was_sent_message':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, sent=True)
            elif request.GET['tofilter'] == 'has_opened':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, opens=True)
                # elif request.GET['tofilter'] == 'has_clicked':
            #     queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=True) 
            elif request.GET['tofilter'] == 'has_replied':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, replies=True)
            elif request.GET['tofilter'] == 'has_bounced':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, bounces=True)
            elif request.GET['tofilter'] == 'has_unsubscribed':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, unsubscribe=True)
            elif request.GET['tofilter'] == 'was_not_sent_messagese':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, sent=False)
            elif request.GET['tofilter'] == 'has_not_opened':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, opens=False)
                # elif request.GET['tofilter'] == 'has_not_clicked':
            #     queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=False) 
            elif request.GET['tofilter'] == 'has_not_replied':
                queryset = CampaignRecipient.objects.filter(
                    Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign=pk, replies=False)
        elif 'tofilter' in params:
            tofilter = request.GET['tofilter']
            if request.GET['tofilter'] == 'paused_reciepent':
                queryset = CampaignRecipient.objects.filter(campaign=pk, reciepent_status=False)
            elif request.GET['tofilter'] == 'leads':
                choice = request.GET['choice']
                if request.GET['choice'] == "openlead":
                    choice = "openLead"
                elif request.GET['choice'] == "wonlead":
                    choice = "wonLead"
                elif request.GET['choice'] == "lostlead":
                    choice = "lostLead"
                elif request.GET['choice'] == "ignorelead":
                    choice = "ignoreLead"
                else:
                    choice = "none"
                queryset = CampaignRecipient.objects.filter(campaign=pk, leads=True, lead_status=choice)
            elif request.GET['tofilter'] == 'was_sent_message':
                queryset = CampaignRecipient.objects.filter(campaign=pk, sent=True)
            elif request.GET['tofilter'] == 'has_opened':
                queryset = CampaignRecipient.objects.filter(campaign=pk, opens=True)
                # elif request.GET['tofilter'] == 'has_clicked':
            #     queryset = CampaignRecipient.objects.filter(campaign=pk,opens=True) 
            elif request.GET['tofilter'] == 'has_replied':
                queryset = CampaignRecipient.objects.filter(campaign=pk, replies=True)
            elif request.GET['tofilter'] == 'has_bounced':
                queryset = CampaignRecipient.objects.filter(campaign=pk, bounces=True)
            elif request.GET['tofilter'] == 'has_unsubscribed':
                queryset = CampaignRecipient.objects.filter(campaign=pk, unsubscribe=True)
            elif request.GET['tofilter'] == 'was_not_sent_messagese':
                queryset = CampaignRecipient.objects.filter(campaign=pk, sent=False)
            elif request.GET['tofilter'] == 'has_not_opened':
                queryset = CampaignRecipient.objects.filter(campaign=pk, opens=False)
                # elif request.GET['tofilter'] == 'has_not_clicked':
            #     queryset = CampaignRecipient.objects.filter(campaign=pk,opens=False) 
            elif request.GET['tofilter'] == 'has_not_replied':
                queryset = CampaignRecipient.objects.filter(campaign=pk, replies=False)

        elif 'search' in params:
            toSearch = request.GET['search']
            queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch) | Q(full_name__contains=toSearch),
                                                        campaign=pk)

        else:
            queryset = CampaignRecipient.objects.filter(campaign=pk)
        campEmailserializer = CampaignEmailSerializer(queryset, many=True)
        return Response(campEmailserializer.data)


class RecipientDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = ""
    serializer_class = CampaignEmailSerializer

    def get_object(self, request, pk):
        try:
            return CampaignRecipient.objects.get(id=pk)
        except CampaignRecipient.DoesNotExist:
            return Response({'message': 'Reciepent does not exist', "success": False})

    def put(self, request, pk, format=None):

        queryset = self.get_object(request, pk)
        queryset.leads = True
        queryset.save()
        data_serializer = CampaignEmailSerializer(queryset)
        # SendSlackMessage(data_serializer.data)
        return Response({"message": "Lead Updated successfully", "success": True})

    def delete(self, request, pk, format=None):
        queryset = self.get_object(request, pk)
        queryset.delete()
        return Response({'success': True, "status": status.HTTP_200_OK})


class CampaignleadCatcher(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignLeadCatcherSerializer

    def post(self, request, format=None):

        # for data in request.data:
        try:
            already_exist_lead_catcher = CampaignLeadCatcher.objects.get(campaign=request.data['campaign'])
        # if not already_exist_lead_catcher:
        except:
            request.data['assigned'] = request.user.id
            serializer = CampaignLeadCatcherSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"success": True, "message": "leadcatcher settings created"})
            else:
                return Response({"success": False, "status": serializer.errors})
        return Response({"success": False, "message": "leadcatcher for this campaign already exist"})


class LeadCatcherView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignLeadCatcherSerializer

    def get(self, request, pk):
        try:
            queryset = CampaignLeadCatcher.objects.get(campaign=pk)
            serializer = CampaignLeadCatcherSerializer(queryset)
            return Response(serializer.data)
        except:
            return Response({"message": "lead catcher not available "})


class LeadCatcherUpdateView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignLeadCatcherSerializer

    def put(self, request, pk, format=None):
        queryset = CampaignLeadCatcher.objects.get(id=pk)
        request.data['assigned'] = request.user.id
        serializer = CampaignLeadCatcherSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Data Updated successful", "success": True})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        queryset = CampaignLeadCatcher.objects.get(id=pk)
        queryset.delete()
        return Response({"success": True, "status": status.HTTP_200_OK})


class CampaignMessages(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = CampaignRecipient.objects.all()
    serializer_class = CampaignEmailSerializer

    """  For View subject and email_body of normal/Follow_up/Drip/On_click email """

    def get(self, request, pk, format=None):
        alldata = {}
        normallist = []
        normal = CampaignRecipient.objects.filter(campaign=pk)
        for nrml in normal:
            serilizer = CampaignEmailSerializer(nrml)
            normallist.append({'id': serilizer.data['id'], 'subject': serilizer.data['subject'],
                               'email_body': serilizer.data['email_body']})
        alldata['normal'] = normallist[0]

        follow_up_list = []
        followup = FollowUpEmail.objects.filter(campaign=pk)
        for follow_up in followup:
            serilizer = FollowUpSerializer(follow_up)
            follow_up_list.append({'id': serilizer.data['id'], 'subject': serilizer.data['subject'],
                                   'email_body': serilizer.data['email_body']})
        alldata['followup'] = follow_up_list[0]

        drip_list = []
        drip = DripEmailModel.objects.filter(campaign=pk)
        for drip_mail in drip:
            serilizer = DripEmailSerilizer(drip_mail)
            drip_list.append({'id': serilizer.data['id'], 'subject': serilizer.data['subject'],
                              'email_body': serilizer.data['email_body']})
        alldata['drip'] = drip_list[0]

        onclick_list = []
        on_click = EmailOnLinkClick.objects.filter(campaign=pk)
        for onclick in on_click:
            serilizer = OnclickSerializer(onclick)
            onclick_list.append({'id': serilizer.data['id'], 'subject': serilizer.data['subject'],
                                 'email_body': serilizer.data['email_body']})
        alldata['on_click'] = onclick_list[0]

        return Response(alldata)

    def put(self, request, pk, format=None):

        """  For Update subject and email_body of normal/Follow_up/Drip/On_click email """

        normalemail = CampaignRecipient.objects.filter(id=request.data['normal']['id'])
        for normal_mail in normalemail:
            normalemaildata = CampaignEmailSerializer(normal_mail)
            normalemaildata = dict(normalemaildata.data)
            normalemaildata["subject"] = request.data['normal']['subject']
            normalemaildata["email_body"] = request.data['normal']['email_body']
            normalemailserilize = CampaignEmailSerializer(normal_mail, data=normalemaildata)
            if normalemailserilize.is_valid():
                normalemailserilize.save()
            else:
                return Response({"error": campEmailSave.errors})

        followup = FollowUpEmail.objects.filter(id=request.data['followup']['id'])
        for follow_up in followup:
            followupdata = FollowUpSerializer(follow_up)
            followupdata = dict(followupdata.data)
            followupdata["subject"] = request.data['followup']['subject']
            followupdata["email_body"] = request.data['followup']['email_body']
            followupserilize = FollowUpSerializer(follow_up, data=followupdata)
            if followupserilize.is_valid():
                followupserilize.save()
            else:
                return Response({"error2": followupserilize.errors})

        dripmail = DripEmailModel.objects.filter(id=request.data['drip']['id'])
        for drip_mail in dripmail:
            dripmaildata = DripEmailSerilizer(drip_mail)
            dripmaildata = dict(dripmaildata.data)
            dripmaildata["subject"] = request.data['drip']['subject']
            dripmaildata["email_body"] = request.data['drip']['email_body']
            dripmailserilize = DripEmailSerilizer(drip_mail, data=dripmaildata)
            if dripmailserilize.is_valid():
                dripmailserilize.save()
            else:
                return Response({"error2": dripmailserilize.errors})

        onlinkclickmail = EmailOnLinkClick.objects.filter(id=request.data['on_click']['id'])
        for on_click in onlinkclickmail:
            onlinkclickmaildata = OnclickSerializer(on_click)
            onlinkclickmaildata = dict(onlinkclickmaildata.data)
            onlinkclickmaildata["subject"] = request.data['on_click']['subject']
            onlinkclickmaildata["email_body"] = request.data['on_click']['email_body']
            onlinkclickserilize = OnclickSerializer(on_click, data=onlinkclickmaildata)
            if onlinkclickserilize.is_valid():
                onlinkclickserilize.save()
                return Response({"message": "Data updated successfully"})
            else:
                return Response({"error2": onlinkclickserilize.errors})


class ProspectsView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProspectsSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['leads', 'bounces', 'is_unsubscribe']

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user

        unsubscribe_emails = UnsubscribeEmail.objects.values_list('email', flat=True)

        return Recipient.objects \
            .filter(campaign__assigned=user.id, is_delete=False) \
            .exclude(email__in=unsubscribe_emails) \
            .values('email') \
            .annotate(sent_count=Coalesce(Sum('sent'), 0),
                      open_count=Coalesce(Sum('opens'), 0),
                      click_count=Coalesce(Sum('clicked'), 0),
                      reply_count=Coalesce(Sum('replies'), 0),
                      lead_count=Coalesce(Sum('leads'), 0))
        # campaign_count=0,
        # engaged_count=0

    def delete(self, request):
        CampaignRecipient.objects.filter(id__in=request.data["recp_ids"]).update(is_delete=True)
        return Response({"message": "Successfully Deleted", "success": True})


class ProspectsDetailView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = RecipientSerializer
    pagination_class = None

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        email = self.request.query_params.get('email')
        return Recipient.objects.filter(campaign__assigned=user.id, is_delete=False, email__iexact=email)


class ProspectsCountView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = self.request.user
        total = Recipient.objects.filter(campaign__assigned=user.id, is_delete=False).count()
        in_campaign = Recipient.objects.filter(campaign__assigned=user.id, is_delete=False).count()
        engaged = 0
        leads = Recipient.objects.filter(campaign__assigned=user.id, is_delete=False) \
            .aggregate(Sum('leads'))['leads__sum']
        bounces = Recipient.objects.filter(campaign__assigned=user.id, is_delete=False) \
            .aggregate(Sum('bounces'))['bounces__sum']
        unsubscribes = Recipient.objects.filter(campaign__assigned=user.id, is_delete=False, is_unsubscribe=True) \
            .count()

        return Response({
            'total': total,
            'in_campaign': in_campaign,
            'engaged': engaged,
            'leads': leads,
            'bounces': bounces,
            'unsubscribes': unsubscribes
        })


class ProspectsCampaignView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        email_for_campaigns = CampaignRecipient.objects.get(id=pk)

        queryset = CampaignRecipient.objects.filter(email=email_for_campaigns.email, is_delete=False)
        resp = []

        for queryset in queryset:
            data = {
                'campaign_id': queryset.campaign.id,
                'reciepent_email': queryset.email,
                'campaign_title': queryset.campaign.title,
                'added': Campaign.objects.filter(id=queryset.campaign.id).values_list("created_date_time")[0][
                    0].strftime("%B %d, %Y"),
                'sent_in_a_camp': CampaignRecipient.objects.filter(campaign=queryset.campaign.id, sent=True).count(),
                'lead_status': queryset.lead_status,
                'opens': CampaignRecipient.objects.filter(campaign=queryset.campaign.id, opens=True).count(),
                'replies': CampaignRecipient.objects.filter(campaign=queryset.campaign.id, replies=True).count(),
            }

            resp.append(data)

        return Response(resp)


class RecipientUnsubcribe(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UnsubscribeEmailSerializers

    def put(self, request, format=None):
        recipient_id = request.data["recipient_id"]
        for id in recipient_id:
            recipient = CampaignRecipient.objects.get(id=id)
            recipient.unsubscribe = True
            recipient.save()
            print(recipient.email)
            data = {
                "email": recipient.email,
                "full_name": recipient.full_name,
                "mail_account": recipient.campaign.from_address.email,
                'user': request.user.id
            }
            print(data)
            serializer = UnsubscribeEmailSerializers(data=data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors)
        return Response({"message": "unsubscribe update successfully", "status": True})


class RecipientUnassignedView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignEmailSerializer

    def put(self, request, format=None):
        recipient_id = request.data["recipient_id"]
        for id in recipient_id:
            recipient = CampaignRecipient.objects.get(id=id)
            recipient.assigned = False
            recipient.save()
            serializer = CampaignEmailSerializer(data=recipient)
            if serializer.is_valid():
                serializer.save()
        return Response({"message": "recipient unassigned successfully"})


class AddLabelView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignLabelSerializer

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        serializer = CampaignLabelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "label added successfully", "success": True})
        return Response({"message": serializer.errors, "success": False})

    def get(self, request, *args, **kwargs):
        queryset = CampaignLabel.objects.all()
        serializer = CampaignLabelSerializer(queryset, many=True)
        return Response({"data": serializer.data, "success": True})


class LeadCatcherStatusUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignEmailSerializer

    def put(self, request, *args, **kwargs):
        eamil_ids = request.data["eamil_ids"]
        lead_status = request.data['lead_status']
        recipient = CampaignRecipient.objects.filter(id__in=eamil_ids).update(lead_status=lead_status)
        return Response({"message": "Lead Updated successfully", "success": True})


class CampaignDetailsSequenceView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignDetailsSerializer

    def get_queryset(self):
        user = self.request.user
        return Campaign.objects.filter(assigned=user.id)


class CampaignDetailsRecipientsView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = RecipientSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Recipient.objects.filter(campaign=pk, is_delete=False)


class CampaignDetailsRecipientsAddView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, pk):
        data = request.data

        csv_file = data['csv_file']
        file_data = csv_file.read().decode("utf-8")
        string_data = StringIO(file_data)

        df_data = pd.read_csv(string_data)
        df_data.drop(df_data.columns[df_data.columns.str.contains('unnamed', case=False)], axis=1, inplace=True)
        csv_columns = df_data.columns

        if "Email" in csv_columns:
            df_data.rename(columns={'Email': 'email'}, inplace=True)
        df_data.dropna(subset=["email"], inplace=True)
        df_data.drop_duplicates(subset=["email"], inplace=True)

        emails = df_data['email'].values
        replacements = json.loads(df_data.to_json(orient="records"))

        duplicated_emails = Recipient.objects \
            .filter(email__in=emails, campaign=pk, is_delete=False) \
            .values_list('email', flat=True)

        recipients = []
        for email, replacement in zip(emails, replacements):
            if email in duplicated_emails:
                continue

            data = {
                'campaign': pk,
                'email': email,
                'replacement': json.dumps(replacement)
            }

            serializer = RecipientSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                recipients.append(serializer.data)

        return Response(data=recipients, status=status.HTTP_201_CREATED)


class CampaignDetailsRecipientsUpdateView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = RecipientSerializer

    def get_queryset(self):
        user = self.request.user
        return Recipient.objects.filter(campaign__assigned=user.id, is_delete=False)


class CampaignDetailsSettingsView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignSerializer

    def get_queryset(self):
        user = self.request.user
        return Campaign.objects.filter(assigned=user.id)


class CampaignDetailsSettingsUpdateView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignSerializer

    def get_queryset(self):
        user = self.request.user
        return Campaign.objects.filter(assigned=user.id)


class CampaignLeadsView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        params = list(dict(request.GET).keys())
        queryset = Recipient.objects.filter(leads__gt=0, campaign__assigned=request.user.id)

        # Q(email__contains=toSearch) | Q(full_name__contains=toSearch), campaign__title__contains=title,
        # lead_status=leadstatus, campaign__assigned=request.user.id, leads=True)
        if 'search' in params:
            toSearch = request.GET['search']
            queryset = queryset.filter(
                Q(email__contains=toSearch) |
                Q(full_name__contains=toSearch) |
                Q(campaign__title__contains=toSearch))

        if 'leadstatus' in params:
            lead_status = request.GET['leadstatus']
            queryset = queryset.filter(lead_status=lead_status)

        if 'date' in params:
            if request.GET['date'] == "last14days":
                to_date = datetime.today()
                from_date = to_date - timedelta(days=14)

            elif request.GET['date'] == "last30days":
                to_date = datetime.today()
                from_date = to_date - timedelta(days=30)

            elif request.GET['date'] == "last90days":
                to_date = datetime.today()
                from_date = to_date - timedelta(days=90)

            elif request.GET['date'] == "last6weeks":
                to_date = datetime.today()
                from_date = to_date - timedelta(weeks=6)

            elif request.GET['date'] == "last3months":
                to_date = datetime.today()
                month_3_ago = to_date.month - 3 if to_date.month > 3 else 12
                last_year = to_date.year - 1
                from_date = to_date.replace(month=month_3_ago)
                if from_date > to_date:
                    from_date = from_date.replace(year=last_year)

            elif request.GET['date'] == "last6months":
                to_date = datetime.today()
                month_6_ago = to_date.month - 6 if to_date.month > 6 else 12
                last_year = to_date.year - 1
                from_date = to_date.replace(month=month_6_ago)
                if from_date > to_date:
                    from_date = from_date.replace(year=last_year)

            elif request.GET['date'] == "last12months":
                to_date = datetime.today()
                month_12_ago = to_date.month - 12 if to_date.month > 12 else 12
                last_year = to_date.year - 1
                from_date = to_date.replace(month=month_12_ago)
                if from_date > to_date:
                    from_date = from_date.replace(year=last_year)
            elif request.GET['date'] == "monthtodate":
                to_date = datetime.today()
                from_date = to_date.replace(day=1)

            elif request.GET['date'] == "yeartodate":
                to_date = datetime.today()
                from_date = to_date.replace(month=1, day=1)

            queryset = queryset.filter(created_date_time__range=(from_date, to_date))

        # queryset = queryset.select_related('title')
        res = queryset.values('id', 'email', 'full_name', 'replacement', 'lead_status', 'update_date_time',
                              campaign_title=F('campaign__title'),
                              assigned_name=F('campaign__assigned__full_name'), camp_id=F('campaign'))
        # campEmailserializer = CampaignEmailSerializer(queryset, many=True)
        return Response({'res': res, 'success': True})


class CampaignUpdateStatus(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, pk):
        camp = Campaign.objects.filter(id=pk)
        if len(camp) > 0:
            camp[0].campaign_status = request.data['status']
            camp[0].save()

        return Response({'success': True})


class CampaignLeadSettingView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LeadSettingsSerializer

    def get(self, request, campaign_id):
        return Response(LeadSettings.objects.filter(campaign_id=campaign_id).values())

    def post(self, request, campaign_id):
        setting_item = LeadSettings.objects.filter(campaign_id=campaign_id)
        if len(setting_item) > 0:
            setting_item[0].replies = 0
            setting_item[0].open = 0
            setting_item[0].click_any_link = 0
            setting_item[0].clicks_specific_link = 0

            for field in request.data:
                if field == "replies":
                    setting_item[0].replies = request.data[field]
                if field == "open":
                    setting_item[0].open = request.data[field]
                if field == "click_any_link":
                    setting_item[0].click_any_link = request.data[field]
                if field == "clicks_specific_link":
                    setting_item[0].clicks_specific_link = request.data[field]
                if field == "join_operator":
                    setting_item[0].join_operator = request.data[field]

            setting_item[0].save()
        else:
            new_item = LeadSettings()
            new_item.campaign_id = campaign_id

            for field in request.data:
                if field == "replies":
                    new_item.replies = request.data[field]
                if field == "open":
                    new_item.open = request.data[field]
                if field == "click_any_link":
                    new_item.click_any_link = request.data[field]
                if field == "clicks_specific_link":
                    new_item.clicks_specific_link = request.data[field]
                if field == "join_operator":
                    new_item.join_operator = request.data[field]

            new_item.save()

        return Response({'success': True})


# class LeadDetailView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def get(self, request, lead_id):
#         recipient = Recipient.objects.filter(id=lead_id)
#         if len(recipient) == 0:
#             return Response({'success': False})
#
#         recipient = recipient.values()[0]
#
#         campaign = Campaign.objects.filter(id=recipient['campaign_id'])
#         if len(campaign) == 0:
#             return Response({'success': False})
#
#         campaign = campaign.values("email_body", "email_subject", "from_address_id")[0]
#
#         # populate email body
#         campaign['email_body'] = convert_template(campaign['email_body'], json.loads(recipient['replacement']))
#
#         email_account = EmailAccount.objects.filter(id=campaign['from_address_id']).values("email", "first_name", "last_name")[0]
#
#         return Response({'success': True, 'recipient': recipient, 'campaign': campaign, 'from_address': email_account})


class LeadDetailView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, camp_id, lead_id):
        recipient = Recipient.objects.filter(id=lead_id).first()
        if recipient is None:
            return Response({'success': False})

        outbound_email = EmailOutbox.objects.filter(campaign_id=camp_id, recipient_id=lead_id,
                                                    email__email_type=0).select_related('from_email',
                                                                                        'campaign').order_by('id')
        if len(outbound_email) == 0:
            return Response({'success': False})

        outbound_email = outbound_email.values(from_email_addr=F("from_email__email"),
                                               from_first_name=F("from_email__first_name"),
                                               from_last_name=F("from_email__last_name")).values()[0]
        logs = LeadsLog.objects.filter(recipient_id=lead_id).order_by('created_date_time')
        outbound_email['logs'] = []
        for log in logs:
            outbound_email['logs'].append(LeadsLogSerializer(log).data)

        return Response({'success': True, 'content': outbound_email})


class LeadStatusUpdate(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, lead_id):
        recipient = Recipient.objects.filter(id=lead_id).first()
        if recipient is None:
            return Response({'success': False, 'content': {}})

        lead_status = request.data['status']
        if lead_status == 'reopen':
            recipient.lead_status = 'open'
        else:
            recipient.lead_status = lead_status
        recipient.save()

        if lead_status == 'reopen':
            return Response({'success': True})

        log = LeadsLog(lead_action=lead_status, recipient_id=lead_id)
        log.save()

        return Response({'success': True, 'content': {'log': LeadsLogSerializer(log).data}})


class LeadReply(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, camp_id, lead_id):
        campaign = Campaign.objects.filter(id=camp_id).first()
        recipient = Recipient.objects.filter(id=lead_id).first()
        if recipient is None or campaign is None:
            return Response({'success': False, 'content': {}})

        email_account = EmailAccount.objects.filter(id=campaign.from_address_id).first()
        if email_account is None:
            return Response({'success': False, 'content': {}})

        template_subject = request.data['subject']
        template_body = request.data['body']
        subject = convert_template(template_subject, recipient.replacement)
        body = convert_template(template_body, recipient.replacement)

        email = Emails()
        email.email_type = 3
        email.campaign_id = camp_id
        email.email_subject = template_subject
        email.email_body = template_body
        email.save()

        outbox = EmailOutbox()
        outbox.email_id = email.id
        outbox.campaign_id = camp_id
        outbox.from_email_id = email_account.id
        outbox.recipient_id = recipient.id
        outbox.email_subject = subject
        outbox.email_body = body
        outbox.status = 0
        outbox.save()

        send_mail_with_smtp(host=email_account.smtp_host,
                            port=email_account.smtp_port,
                            username=email_account.smtp_username,
                            password=email_account.smtp_password,
                            use_tls=email_account.use_smtp_ssl,
                            from_email=email_account.email,
                            to_email=[recipient.email],
                            subject=subject,
                            body=body,
                            uuid=outbox.id,
                            track_opens=None,
                            track_linkclick=None)

        log = LeadsLog(lead_action='me_replied', recipient_id=lead_id, outbox_id=outbox.id)
        log.save()

        return Response({'success': True, 'content': {'log': LeadsLogSerializer(log).data}})


class CampaignScheduleView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        # Moved to mailaccounts > tasks.py
        return Response()


class RecipientsCheck(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):

        post_data = request.data
        if post_data['csvfile'] and len(post_data['csvfile']) > 0:
            csv_file = post_data['csvfile']
            file_data = csv_file.read().decode("utf-8")
            string_data = StringIO(file_data)
            df_csv = pd.read_csv(string_data)

            # read csv file
            # csv_content = new_camp.csvfile.read()
            # file_data = csv_content.decode("utf-8")
            # string_data = StringIO(file_data)
            # df_csv = pd.read_csv(string_data)

            df_csv.drop(df_csv.columns[df_csv.columns.str.contains('unnamed', case=False)], axis=1, inplace=True)
            csv_columns = df_csv.columns

            if "Email" in csv_columns:
                df_csv.rename(columns={'Email': 'email'}, inplace=True)
            df_csv.dropna(subset=["email"], inplace=True)
            df_csv.drop_duplicates(subset=["email"], inplace=True)

            res_emails = df_csv['email'].to_list()

            resp = Recipient.objects.filter(email__in=res_emails).values('email', 'replacement').distinct()

            return Response({"result": resp, "success": True})

        else:
            return Response({"result": 'CSV not uploaded', "success": False})
