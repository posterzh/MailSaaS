import csv
import datetime
import json
import re
import ast 
from datetime import date, datetime, time
import pytracking
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.sites.models import Site
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives, send_mail
from django.db.models import Q
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# from django_filters import rest_framework as filters
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.campaignschedule.models import Email_schedule
from apps.integration.views import SendSlackMessage
from apps.unsubscribes.models import UnsubscribeEmail
from apps.unsubscribes.serializers import UnsubscribeEmailSerializers

from .models import (Campaign, CampaignLeadCatcher, CampaignRecipient,
                     DripEmailModel, EmailOnLinkClick, FollowUpEmail)
from .serializers import (CampaignEmailSerializer,
                          CampaignLeadCatcherSerializer, CampaignSerializer,
                          DripEmailSerilizer, FollowUpSerializer,
                          OnclickSerializer)
from apps.mailaccounts.models import EmailAccount
from apps.mailaccounts.views import send_mail_with_smtp


class CreateCampaignStartView(APIView):

    permission_classes = (permissions.IsAuthenticated,)    
        
    def post(self, request, format=None):
        if request.user.is_active:
            # if 'campaign.add_campaign' in request.user.get_group_permissions():
            postdata = request.data
            # postdata._mutable = True
            postdata["assigned"] = request.user.id
            # postdata._mutable = False
            serializer = CampaignSerializer(data = postdata)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # return Response({'message':"Has No Permissions",'status':401})
        return Response({'message':"Your account is not active",'status':status.HTTP_200_OK})

   
class CreateCampaignRecipientsView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        postdata = request.data
        # option_list = json.loads(postdata["option"])
        # email_list = json.loads(postdata["email"])
        postdata._mutable = True
        # postdata["option"] = option_list
        # postdata["email"] = email_list
        postdata["option"] = ast.literal_eval(postdata["option"])
        postdata["email"] = ast.literal_eval(postdata["email"])
        postdata._mutable = False

        resp = []
        # if 'campaign.add_campaign' in request.user.get_group_permissions():
        if 1 in postdata["option"]:
            
            try:
                camp = Campaign.objects.get(id=postdata['campaign'])
            except:
                return Response({"message":"No campiagn availabe for this id", "success":"false"})
            camp.csvfile_op1 = postdata['csvfile_op1']
            camp.save()
            with open('media/'+str(camp.csvfile_op1)) as csv_file:
                csv_reader = csv.reader(csv_file, delimiter=',')
                line_count = 0
                
                for row in csv_reader:
                    if line_count == 0:
                        line_count += 1
                        # return Response({"message":"No Rows in file", "success":False})
                    else:
                        data = {'email':row[0], 'full_name':row[1], 'company_name':row[2], 'role':row[3], 'campaign':postdata['campaign']}
                        serializer = CampaignEmailSerializer(data = data)
                        if serializer.is_valid():
                            line_count += 1
                            serializer.save()
                            resp.append(serializer.data)
                resp.append({"success":True})
                if 2 not in postdata["option"]:
                    return Response({"resp":resp, "success":True})
        if 2 in postdata["option"]:
            
            postdata._mutable = True
            
            print(postdata["email"])
            postdata._mutable = False
            for email in postdata["email"]:
                print("email = ",email)
                camp = Campaign.objects.get(id=postdata['campaign'])
                CampaignEmail = CampaignRecipient(campaign=camp, email=email)
                CampaignEmail.save()
                campData = CampaignEmailSerializer(CampaignEmail)
                resp.append(campData.data)
            return Response({"resp":resp,"message":"Saved Successfully","success":True})
        return Response({"message":"error","sucess":False})


class CreateCampaignMessageView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        postdata = request.data
        camp = Campaign.objects.get(id=postdata["normal"]['campaign'])
        campEmail = CampaignRecipient.objects.filter(campaign=postdata["normal"]['campaign'])
        for campemail in campEmail:
            campEmailserializer = CampaignEmailSerializer(campemail)
            serializer_data = campEmailserializer.data
            serializer_data["subject"] = postdata["normal"]['subject']
            serializer_data["email_body"] = postdata["normal"]['email_body']
            CampEmailData = CampaignEmailSerializer(campemail, data = serializer_data)
            if CampEmailData.is_valid():
                CampEmailData.save()

        for follow_up in postdata["follow_up"]:
            FollowupEmail = FollowUpEmail(campaign=camp, waitDays=follow_up["waitDays"], subject=follow_up["subject"], email_body=follow_up["email_body"])
            FollowupEmail.save()

        for drips in postdata["drips"]:
            DripEmail = DripEmailModel(campaign=camp, waitDays=drips["waitDays"], subject=drips["subject"], email_body=drips["email_body"])
            DripEmail.save()

        for onLinkClick in postdata["onLinkClick"]:
            onLinkClick = EmailOnLinkClick(campaign=camp, url=onLinkClick["url"], waitDays=onLinkClick["waitDays"], subject=onLinkClick["subject"], email_body=onLinkClick["email_body"])
            onLinkClick.save()

        return Response({"message":"Saved Successfully"})


class CampaignGetAllEmailsPreview(generics.ListAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args,**kwargs):

        getData = request.data
        try:
            camp = Campaign.objects.get(id=pk)
        except:
            return Response({"message":"No campiagn availabe for this id", "success":"false"})

        serializercamp = CampaignSerializer(camp)

        resp = {}
        resp["campaign"] = serializercamp.data

        campEmaildatalist = []
        campEmail = CampaignRecipient.objects.filter(campaign=pk)
        for campemail in campEmail:
            serializercampEmail = CampaignEmailSerializer(campemail)
            campEmaildatalist.append(serializercampEmail.data)
        resp["campEmail"] = campEmaildatalist

        followupdatalist = []
        follow_up = FollowUpEmail.objects.filter(campaign=pk)
        for followup in follow_up:
            serializerfollowup = FollowUpSerializer(followup)
            followupdatalist.append(serializerfollowup.data)
        resp["follow_up"] = followupdatalist

        dripdatalist = []
        drip_email = DripEmailModel.objects.filter(campaign=pk)
        for dripemail in drip_email:
            serilizedripmail = DripEmailSerilizer(dripemail)
            dripdatalist.append(serilizedripmail.data)
        resp["drip"] = dripdatalist

        onclickdatalist = []
        on_click = EmailOnLinkClick.objects.filter(campaign=pk)
        for onclick in on_click:
            serializeronclick = OnclickSerializer(onclick)
            onclickdatalist.append(serializeronclick.data)
        resp["onLinkClick"] = onclickdatalist

        return Response(resp)
        
    def put(self, request, pk, *args,**kwargs):
        for campemail in request.data["campEmail"]:
            campEmalOb = CampaignRecipient.objects.get(id=campemail["id"])
            campEmailSave = CampaignEmailSerializer(campEmalOb, data=campemail)
            if campEmailSave.is_valid():
                campEmailSave.save()
            else:
                return Response({"message":"Campain Email Error"})
        for followup in request.data["follow_up"]:
            followUpOb = FollowUpEmail.objects.get(id=followup["id"])
            followUpSave = FollowUpSerializer(followUpOb, data=followup)
            if followUpSave.is_valid():
                followUpSave.save()
            else:
                return Response({"message":"Follow Up Email Error"})
        for drip in request.data["drip"]:
            dripEmailOb = DripEmailModel.objects.get(id=drip["id"])
            dripEmailSave = DripEmailSerilizer(dripEmailOb, data=drip)
            if dripEmailSave.is_valid():
                dripEmailSave.save()
            else:
                return Response({"message":"Drip Email Error"})
        for onLinkClick in request.data["onLinkClick"]:
            onLinkClickOb = EmailOnLinkClick.objects.get(id=onLinkClick["id"])
            onLinkClickSave = OnclickSerializer(onLinkClickOb, data=onLinkClick)
            if onLinkClickSave.is_valid():
                onLinkClickSave.save()
            else:
                return Response({"message":"On Link Click Email Error"})

        return Response({"message":"Updated Successfully", "success":"True"})

class CreateCampaignOptionView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
    
        if request.data['terms_and_laws'] == True:
            try:
                queryset = Campaign.objects.get(id = request.data['campaign'])
            except:
                return Response({"message":"No campiagn availabe for this id", "success":"false"})
            if queryset.csvfile_op1 == "":
                csvfile_op1 = None
            else:
                csvfile_op1 = queryset.csvfile_op1
            request.data["title"] = queryset.title
            request.data["from_address"] = queryset.from_address.id
            request.data["full_name"] = queryset.full_name
            request.data["csvfile_op1"] = csvfile_op1
            request.data["assigned"] = request.user.id
            request.data["update_date_time"] = datetime.now()
            request.data["created_date_time"] = queryset.created_date_time
            
            if request.data["schedule_send"] and not (request.data["schedule_date"] or request.data["schedule_time"]):
                return Response({"message":"Please Enter Date Time", "success":"false"})
            if request.data["schedule_send"]:
                req_date_list = request.data["schedule_date"].split("-")
                req_time_list = request.data["schedule_time"].split(":")
                request.data["schedule_date"] = date(int(req_date_list[0]), int(req_date_list[1]), int(req_date_list[2]))
                request.data["schedule_time"] = time(int(req_time_list[0]), int(req_time_list[1]), int(req_time_list[2]))

            else:
                request.data["schedule_date"] = None
                request.data["schedule_time"] = None
            serilizer = CampaignSerializer(queryset, data=request.data)
            if serilizer.is_valid():
                serilizer.save()
                return Response(serilizer.data)
            return Response({'message':'invalid serilizer', "success":"false"})
        return Response({"message":"Please agree to the terms.", "success":"false"})


class CreateCampaignSendView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, format=None):
        resp = {}
        try:
            camp = Campaign.objects.get(id = pk)
        except:
            return Response({"message":"No Campaign with this id", "success":False})
        # campSerializer = CampaignSerializer(camp)
        resp["from_address"] = camp.from_address.email
        resp["full_name"] = camp.from_address.full_name
        campEmailrecipientsList = []
        campEmail = CampaignRecipient.objects.filter(campaign = pk)
        for campemail in campEmail:
            campEmailSerialiser = CampaignEmailSerializer(campemail)
            campEmailrecipientsList.append(campEmailSerialiser.data["email"])
        resp["recipients"] = campEmailrecipientsList


        campEmaildatalist = []
        campEmail = CampaignRecipient.objects.filter(campaign=pk).distinct('subject')
        for campemail in campEmail:
            serializercampEmail = CampaignEmailSerializer(campemail)
            campEmaildatalist.append(serializercampEmail.data['subject'])
        resp["campEamil"] = campEmaildatalist

        followupdatalist = []
        follow_up = FollowUpEmail.objects.filter(campaign=pk).distinct('subject')
        for followup in follow_up:
            serializerfollowup = FollowUpSerializer(followup)
            followupdatalist.append(serializerfollowup.data['subject'])
        resp["follow_up"] = followupdatalist

        dripdatalist = []
        drip_email = DripEmailModel.objects.filter(campaign=pk).distinct('subject')
        for dripemail in drip_email:
            serilizedripmail = DripEmailSerilizer(dripemail)
            dripdatalist.append(serilizedripmail.data['subject'])
        resp["drip"] = dripdatalist

        onclickdatalist = []
        on_click = EmailOnLinkClick.objects.filter(campaign=pk).distinct('subject')
        for onclick in on_click:
            serializeronclick = OnclickSerializer(onclick)
            onclickdatalist.append(serializeronclick.data['subject'])
        resp["onLinkClick"] = onclickdatalist
        return Response(resp)

    def put(self, request, pk, format=None):
        try:
            camp = Campaign.objects.get(id = pk)
            
        except:
            return Response({"message":"No Campaign with this id", "success":False})

        try:
            if request.data["startCampaign"]:
                pass
        except:
            return Response({"message":"please provide startCampaign", "success":False})

        
        getCampData = CampaignSerializer(camp)
        campData = dict(getCampData.data)
        campData["campaign_status"] = request.data["startCampaign"]
        if camp.csvfile_op1 != "":
            campData["csvfile_op1"] = camp.csvfile_op1
        
        CampSerializer = CampaignSerializer(camp, data=campData)
        if request.data["startCampaign"]:
            camp.campaign_status = True


        camp.save()
        if CampSerializer.is_valid():
            CampSerializer.save()
            if (not camp.schedule_send) and camp.campaign_status:
                campEmail = CampaignRecipient.objects.filter(campaign=pk)
                for campemail in campEmail:
                    
                    
                    open_tracking_url = pytracking.get_open_tracking_url(
                        {"campEmailId": campemail.id, "campaign": campemail.campaign.id}, 
                        base_open_tracking_url="http://localhost:8000/campaign/email/open/",
                        webhook_url="http://localhost:8000/campaign/email/open/", 
                        include_webhook_url=True
                        )
                    
                    email_body_links = re.findall(r'(https?://\S+)', campemail.email_body)
                    if email_body_links:
                        #URL is Present
                        emailData = campemail.email_body
                        for link in email_body_links:
                            new_link = pytracking.get_click_tracking_url(
                                link, {"campEmailId": campemail.id, "campaign": campemail.campaign.id},
                                base_click_tracking_url=campemail.email_body,
                                webhook_url=campemail.email_body, include_webhook_url=True)
                            emailData = emailData.replace(link, new_link)
                    else:
                        #No URL Present
                        emailData = campemail.email_body + "<img width=0 height=0 src='"+open_tracking_url+"' />"
                    subject = campemail.subject
                    text_content = 'plain text body message.'
                    html_content = emailData
                    # msg = EmailMultiAlternatives(subject, text_content, campemail.campaign.from_address.email, [campemail.email])

                    # msg.attach_alternative(html_content, "text/html")
                    # msg.send()

                    email_account_ob = EmailAccount.objects.get(user=request.user.id, email=camp.from_address.email)
                    if email_account_ob.provider == "SMTP":
                        send_mail_with_smtp(email_account_ob.smtp_host, email_account_ob.smtp_port, email_account_ob.smtp_username, email_account_ob.smtp_password, [campemail.email], campemail.subject, emailData)

                    campemail.sent = True
                    campemail.reciepent_status = True
                    campemail.save()
                   
            elif camp.schedule_send and camp.campaign_status:
                campEmail = CampaignRecipient.objects.filter(campaign=pk)
                for campemail in campEmail:

                    open_tracking_url = pytracking.get_open_tracking_url(
                        {"campEmailId": campemail.id, "campaign": campemail.campaign.id}, 
                        base_open_tracking_url="http://localhost:8000/campaign/email/open/",
                        webhook_url="http://localhost:8000/campaign/email/open/", 
                        include_webhook_url=True
                        )
                    
                    email_body_links = re.findall(r'(https?://\S+)', campemail.email_body)
                    if email_body_links:
                        #URL is Present
                        emailData = campemail.email_body
                        for link in email_body_links:
                            new_link = pytracking.get_click_tracking_url(
                                link, {"campEmailId": campemail.id, "campaign": campemail.campaign.id},
                                base_click_tracking_url="http://localhost:8000/campaign/email/click/",
                                webhook_url="http://localhost:8000/campaign/email/click/", include_webhook_url=True)
                            emailData = emailData.replace(link, new_link)
                    else:
                        #No URL Present
                        emailData = campemail.email_body + "<img width=0 height=0 src='"+open_tracking_url+"' />"


                    email_schedule_ob = Email_schedule(time=camp.schedule_time, date=camp.schedule_date, user_id=camp.assigned, mail_account=camp.from_address, recipient_email=campemail.email , subject=campemail.subject , email_body=emailData)
                    email_schedule_ob.save()
                    
            return Response({"message":"Updated Successfully", "success":True})
        else:
            return Response({"message":CampSerializer.errors, "success":True})



class CampaignView(generics.ListAPIView):

    """
        For Get all Campaign by user 
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args,**kwargs):
        campaigns = Campaign.objects.filter(assigned = request.user.id)
        allData = []
        for camp in campaigns:
            campEmail = CampaignRecipient.objects.filter(campaign=camp.id)
            campEmailserializer = CampaignEmailSerializer(campEmail, many = True)
            resp = {
                "id":camp.pk,
                "camp_title": camp.title,
                "camp_created_date_time": camp.created_date_time,
                "assigned": camp.assigned.full_name,
                "recipientCount": campEmail.count(),
                "sentCount":0,
                "leadCount": 0,
                "openLeadCount": 0,
                "wonLeadCount": 0,
                "lostLeadCount": 0,
                "ignoredLeadCount": 0,
                }
            for campData in campEmailserializer.data:
                if campData["sent"]:
                    resp["sentCount"] = resp["sentCount"] + 1

                if campData["leads"]:
                    resp["leadCount"] = resp["leadCount"] + 1

                    if campData["lead_status"]=="openLead":
                        resp["openLeadCount"] = resp["openLeadCount"] + 1                    
                    if campData["lead_status"]=="wonLead":
                        resp["wonLeadCount"] = resp["wonLeadCount"] + 1
                    if campData["lead_status"]=="lostLead":
                        resp["lostLeadCount"] = resp["lostLeadCount"] + 1
                    if campData["lead_status"]=="ignoredLead":
                        resp["ignoredLeadCount"] = resp["ignoredLeadCount"] + 1
                          
            allData.append(resp)
        return Response(allData)
        


class LeadsCatcherView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args,**kwargs):
        params = list(dict(request.GET).keys())
        if len(params) == 3:
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
            else:
                leadstatus = "openLead"

            queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign__title__contains=title, leadStatus=leadstatus, campaign__assigned=request.user.id, leads=True)
        elif len(params) == 2:
            if 'search' and 'title' in params:
                toSearch = request.GET['search']
                title = request.GET['title']

                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign__title__contains=title, campaign__assigned=request.user.id, leads=True)
            
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
                else:
                    leadstatus = "openLead"

                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch), leadStatus=leadstatus, campaign__assigned=request.user.id, leads=True)
            
            
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
                else:
                    leadstatus = "openLead"

                queryset = CampaignRecipient.objects.filter(campaign__title__contains=title, leadStatus=leadstatus, campaign__assigned=request.user.id, leads=True)
        elif len(params) == 1:
            if "search" in params:
                toSearch = request.GET['search']
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch), campaign__assigned=request.user.id, leads=True)
            elif "title" in params:
                title = request.GET['title']
                queryset = CampaignRecipient.objects.filter(campaign__title__contains=title, campaign__assigned=request.user.id, leads=True) 
            elif  "leadstatus" in params:
                if request.GET['leadstatus'] == "openlead":
                        leadstatus = "openLead"
                elif request.GET['leadstatus'] == "wonlead":
                    leadstatus = "wonLead"
                elif request.GET['leadstatus'] == "lostlead":
                    leadstatus = "lostLead"
                elif request.GET['leadstatus'] == "ignorelead":
                    leadstatus = "ignoreLead"
                else:
                    leadstatus = "openLead"
                queryset = CampaignRecipient.objects.filter(leadStatus=leadstatus,campaign__assigned=request.user.id, leads=True)     
        else:
            queryset = CampaignRecipient.objects.filter(leads=True,campaign__assigned=request.user.id)
        campEmailserializer = CampaignEmailSerializer(queryset, many = True)
        return Response(campEmailserializer.data)


class TrackEmailOpen(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None, id=None):
        full_url = settings.SITE_URL + request.get_full_path()
        tracking_result = pytracking.get_open_tracking_result(
            full_url, base_open_tracking_url = settings.SITE_URL + "/campaign/email/open/")

        trackData = tracking_result.metadata

        camp = Campaign.objects.get(id = trackData["campaign"])

        campEmail = CampaignRecipient.objects.get(id = trackData["campEmailId"])
        campEmail.opens = True
        campEmail.save()
        return Response({"message":"Saved Successfully"})


class TrackEmailClick(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, format=None, id=None):
        
        tracking_result = pytracking.get_open_tracking_result(
            full_url, base_click_tracking_url="https://trackingdomain.com/path/")
        full_url = settings.SITE_URL + request.get_full_path()

        tracking_result = pytracking.get_open_tracking_result(
            full_url, base_click_tracking_url= settings.SITE_URL + "/campaign/email/click/")

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

     
        return Response({"message":"Saved Successfully"})


class GetCampaignOverview(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, format=None):
        postdata = request.data

        campEmail = CampaignRecipient.objects.filter(campaign=pk)
        campEmailserializer = CampaignEmailSerializer(campEmail, many = True)
        resp = {
            "recipientCount": campEmail.count(),
            "leadCount": 0,
            "openLeadCount": 0,
            "openLeadPer": 0,
            "wonLeadCount": 0,
            "wonLeadPer": 0,
            "lostLeadCount": 0,
            "lostLeadPer": 0,
            "ignoredLeadCount": 0,
            "ignoredLeadPer": 0,
            "sentCount": 0,
            "sentPer": 0,
            "openCount": 0,
            "openPer": 0,
            "replyCount": 0,
            "replyPer": 0,
            "unsubscribeCount": 0,
            "unsubscribePer": 0,
            }
        for campData in campEmailserializer.data:
            if campData["leads"]:
                resp["leadCount"] = resp["leadCount"] + 1

                if campData["lead_status"]=="openLead":
                    resp["openLeadCount"] = resp["openLeadCount"] + 1                 
                if campData["lead_status"]=="wonLead":
                    resp["wonLeadCount"] = resp["wonLeadCount"] + 1
                if campData["lead_status"]=="lostLead":
                    resp["lostLeadCount"] = resp["lostLeadCount"] + 1
                if campData["lead_status"]=="ignoredLead":
                    resp["ignoredLeadCount"] = resp["ignoredLeadCount"] + 1
                
                resp["openLeadPer"] = round((resp["openLeadCount"]*100)/resp["leadCount"], 2)
                resp["wonLeadPer"] = round((resp["wonLeadCount"]*100)/resp["leadCount"], 2)
                resp["lostLeadPer"] = round((resp["lostLeadCount"]*100)/resp["leadCount"], 2)
                resp["ignoredLeadPer"] = round((resp["ignoredLeadCount"]*100)/resp["leadCount"], 2)
            if campData["sent"]:
                resp["sentCount"] += 1
            resp["sentPer"] = round((resp["sentCount"]*100)/resp["recipientCount"], 2)
            if campData["opens"]:
                resp["openCount"] += 1
            resp["openPer"] = round((resp["openCount"]*100)/resp["recipientCount"], 2)
            if campData["replies"]:
                resp["replyCount"] += 1
            resp["replyPer"] = round((resp["replyCount"]*100)/resp["recipientCount"], 2)
            if campData["unsubscribe"]:
                resp["unsubscribeCount"] += 1
            resp["unsubscribePer"] = round((resp["unsubscribeCount"]*100)/resp["recipientCount"], 2)
        return Response(resp)
    

class AllRecipientView(generics.RetrieveUpdateDestroyAPIView):

    """  For View  all Recipients """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args,**kwargs):
        params = list(dict(request.GET).keys())
        """
        These filter are pending
        Recipients with problem, customized message, has clicked,
        has out-of-office reply, you replied,has not clicked, you have not replied 
        """
        if ['search','tofilter'] in params:
            toSearch = request.GET['search']
            tofilter=request.GET['tofilter']
            if request.GET['tofilter'] == 'paused_reciepent':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,reciepent_status=False)    
            elif request.GET['tofilter'] == 'leads':
                choice=request.GET['choice']
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
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,leads=True,leadStatus=choice) 
            elif request.GET['tofilter']  == 'was_sent_message':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,sent=True) 
            elif request.GET['tofilter'] == 'has_opened':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=True) 
            # elif request.GET['tofilter'] == 'has_clicked':
            #     queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=True) 
            elif request.GET['tofilter'] == 'has_replied':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,replies=True)
            elif request.GET['tofilter'] == 'has_bounced':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,bounces=True)
            elif request.GET['tofilter'] == 'has_unsubscribed':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,unsubscribe=True)
            elif request.GET['tofilter']  == 'was_not_sent_messagese':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,sent=False) 
            elif request.GET['tofilter'] == 'has_not_opened':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=False) 
            # elif request.GET['tofilter'] == 'has_not_clicked':
            #     queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=False) 
            elif request.GET['tofilter'] == 'has_not_replied':
                queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,replies=False)
        elif 'tofilter' in params:
            tofilter=request.GET['tofilter']
            if request.GET['tofilter'] == 'paused_reciepent':
                queryset = CampaignRecipient.objects.filter(campaign=pk,reciepent_status=False)    
            elif request.GET['tofilter'] == 'leads':
                choice=request.GET['choice']
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
                queryset = CampaignRecipient.objects.filter(campaign=pk,leads=True,leadStatus=choice) 
            elif request.GET['tofilter']  == 'was_sent_message':
                queryset = CampaignRecipient.objects.filter(campaign=pk,sent=True) 
            elif request.GET['tofilter'] == 'has_opened':
                queryset = CampaignRecipient.objects.filter(campaign=pk,opens=True) 
            # elif request.GET['tofilter'] == 'has_clicked':
            #     queryset = CampaignRecipient.objects.filter(campaign=pk,opens=True) 
            elif request.GET['tofilter'] == 'has_replied':
                queryset = CampaignRecipient.objects.filter(campaign=pk,replies=True)
            elif request.GET['tofilter'] == 'has_bounced':
                queryset = CampaignRecipient.objects.filter(campaign=pk,bounces=True)
            elif request.GET['tofilter'] == 'has_unsubscribed':
                queryset = CampaignRecipient.objects.filter(campaign=pk,unsubscribe=True)
            elif request.GET['tofilter']  == 'was_not_sent_messagese':
                queryset = CampaignRecipient.objects.filter(campaign=pk,sent=False) 
            elif request.GET['tofilter'] == 'has_not_opened':
                queryset = CampaignRecipient.objects.filter(campaign=pk,opens=False) 
            # elif request.GET['tofilter'] == 'has_not_clicked':
            #     queryset = CampaignRecipient.objects.filter(campaign=pk,opens=False) 
            elif request.GET['tofilter'] == 'has_not_replied':
                queryset = CampaignRecipient.objects.filter(campaign=pk,replies=False)    

        elif 'search' in params:
            toSearch = request.GET['search']
            queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk)

        else:
            queryset = CampaignRecipient.objects.filter(campaign=pk)
        campEmailserializer = CampaignEmailSerializer(queryset, many = True)
        return Response(campEmailserializer.data)



class RecipientDetailView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    queryset = ""
    serializer_class = CampaignEmailSerializer

    def get_object(self,request,pk):

        try:        
            return CampaignRecipient.objects.get(id = pk)
        except CampaignRecipient.DoesNotExist:
            return Response({'message':'Reciepent does not exist',"success":False})

    def put(self, request, pk, format=None):

        queryset = self.get_object(request,pk)
        queryset.leads = True
        queryset.save()
        data_serializer = CampaignEmailSerializer(queryset)
        SendSlackMessage(data_serializer.data)
        return Response({"message":"Lead Updated sucessfully","Sucess":True})


    def delete(self, request, pk, format=None):
        queryset = self.get_object(request, pk)
        queryset.delete()
        return Response({'Sucess':True,"status":status.HTTP_200_OK})


class CampaignleadCatcherView(generics.CreateAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignLeadCatcherSerializer

    def post(self, request, format=None):
        
        for data in request.data:
            data['assigned'] = request.user.id
            serializer = CampaignLeadCatcherSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({"sucess":False, "status":serializer.errors})
        return Response({"sucess":True,"message":"leadcatcher settings created"})

    def get(self, request, format=None):
        try :
            queryset = CampaignLeadCatcher.objects.get(campaign = request.data['campaign'])
            serializer = CampaignLeadCatcherSerializer(queryset)
            return Response(serializer.data)
        except :
            return Response({"message":"lead catcher not available "})
            




class LeadCatcherUpdateView(generics.RetrieveUpdateDestroyAPIView):
    
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignLeadCatcherSerializer
        
    
    def put(self, request,pk,format=None):
        queryset = CampaignLeadCatcher.objects.get(id=pk)
        request.data['assigned'] = request.user.id
        serializer = CampaignLeadCatcherSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Data Updated Sucessful","Sucess":True})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,pk,format=None):
        queryset = CampaignLeadCatcher.objects.get(id=pk)
        queryset.delete()
        return Response({"Sucess":True,"status":status.HTTP_200_OK})
        

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
            normallist.append({'id':serilizer.data['id'],'subject':serilizer.data['subject'],'email_body':serilizer.data['email_body']})
        alldata['normal'] = normallist[0]

        follow_up_list = []
        followup = FollowUpEmail.objects.filter(campaign=pk)
        for follow_up in followup:
            serilizer = FollowUpSerializer(follow_up)
            follow_up_list.append({'id':serilizer.data['id'],'subject':serilizer.data['subject'],'email_body':serilizer.data['email_body']})
        alldata['followup'] = follow_up_list[0]

        drip_list = []
        drip = DripEmailModel.objects.filter(campaign=pk)
        for drip_mail in drip:
            serilizer = DripEmailSerilizer(drip_mail)
            drip_list.append({'id':serilizer.data['id'],'subject':serilizer.data['subject'],'email_body':serilizer.data['email_body']})
        alldata['drip'] = drip_list[0]

        onclick_list = []
        on_click = EmailOnLinkClick.objects.filter(campaign=pk)
        for onclick in on_click:
            serilizer = OnclickSerializer(onclick)
            onclick_list.append({'id':serilizer.data['id'],'subject':serilizer.data['subject'],'email_body':serilizer.data['email_body']})
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
                return Response({"error":campEmailSave.errors})

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
                return Response({"error2":followupserilize.errors})

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
                return Response({"error2":dripmailserilize.errors})

        onlinkclickmail = EmailOnLinkClick.objects.filter(id=request.data['on_click']['id'])
        for on_click in onlinkclickmail:
            onlinkclickmaildata = OnclickSerializer(on_click)
            onlinkclickmaildata = dict(onlinkclickmaildata.data)
            onlinkclickmaildata["subject"] = request.data['on_click']['subject']
            onlinkclickmaildata["email_body"] = request.data['on_click']['email_body']
            onlinkclickserilize = OnclickSerializer(on_click, data=onlinkclickmaildata)
            if onlinkclickserilize.is_valid():
                onlinkclickserilize.save()
                return Response({"message":"Data updated sucessfully"})
            else:
                return Response({"error2":onlinkclickserilize.errors})

class ProspectsView(generics.ListAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args,**kwargs):

        
        params = list(dict(request.GET).keys())
        if ("search" in params) and ("filter" in params):
            toSearch = request.GET['search']
            tofilter = request.GET['filter']
            choice = request.GET["choice"]
            if tofilter == "is_paused":
                if choice == 'yes':
                    choice = False
                elif choice == 'no':
                    choice = True
                else:
                    choice = False
                queryset = CampaignRecipient.objects.filter(reciepent_status=choice,campaign__assigned=request.user.id, is_delete=False)

            elif tofilter == "do_not_contact":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(unsubscribe=choice, campaign__assigned=request.user.id, is_delete=False)
            
            elif tofilter == "has_opened":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(opens=choice, campaign__assigned=request.user.id, is_delete=False)

            elif tofilter == "has_clicked":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(has_link_clicked=choice, campaign__assigned=request.user.id, is_delete=False)

            elif tofilter == "has_replied":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(replies=choice, campaign__assigned=request.user.id, is_delete=False)

            elif tofilter == "status":
                if choice == "lead":
                    queryset = CampaignRecipient.objects.filter(leads = True, campaign__assigned=request.user.id, is_delete=False)
                elif choice == "openlead" or choice == "wonlead" or choice == "lostlead" or choice == "ignoredlead":
                    queryset = CampaignRecipient.objects.filter(leads = True, campaign__assigned=request.user.id, is_delete=False)
            
            else:
                queryset = CampaignRecipient.objects.filter(campaign__assigned=request.user.id, is_delete=False)
    
        elif "search" in params:
            toSearch = request.GET['search']
            queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign__assigned=request.user.id, is_delete=False)

        elif ("filter" in params) and ("choice" in params):
            tofilter = request.GET['filter']
            choice = request.GET["choice"]

            if tofilter == "is_paused":
                if choice == 'yes':
                    choice = False
                elif choice == 'no':
                    choice = True
                else:
                    choice = False
                queryset = CampaignRecipient.objects.filter(reciepent_status=choice,campaign__assigned=request.user.id, is_delete=False)

            elif tofilter == "do_not_contact":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(unsubscribe=choice, campaign__assigned=request.user.id, is_delete=False)
            
            elif tofilter == "has_opened":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(opens=choice, campaign__assigned=request.user.id, is_delete=False)

            elif tofilter == "has_clicked":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(has_link_clicked=choice, campaign__assigned=request.user.id, is_delete=False)

            elif tofilter == "has_replied":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(replies=choice, campaign__assigned=request.user.id, is_delete=False)

            elif tofilter == "status":
                if choice == "lead":
                    queryset = CampaignRecipient.objects.filter(leads = True, campaign__assigned=request.user.id, is_delete=False)

                elif choice == "openlead" or choice == "wonlead" or choice == "lostlead" or choice == "ignoredlead":
                    queryset = CampaignRecipient.objects.filter(leads = True, campaign__assigned=request.user.id, is_delete=False)
            else:
                queryset = CampaignRecipient.objects.filter(campaign__assigned=request.user.id, is_delete=False)
        else:
            queryset = CampaignRecipient.objects.filter(campaign__assigned=request.user.id, is_delete=False)
        

        counts_data = {
            "total_count": 0,
            "in_campaign_count": 0,
            "leads_count": 0,
            "unsubscribe": 0
        }
        resp = [counts_data]

        for recep in queryset:
            counts_data["total_count"] += 1
            counts_data["in_campaign_count"] += 1
            if recep.leads:
                counts_data["leads_count"] += 1
            if recep.unsubscribe:
                counts_data["unsubscribe"] += 1

            data = {
                "id": recep.id,
                "email": recep.email,
                "name": recep.full_name,
                "created": recep.created_date_time.strftime("%B %d, %Y"),
                "status": recep.lead_status,
                "campaign_count": CampaignRecipient.objects.filter(email=recep.email).distinct('campaign').count(),
                "sent": CampaignRecipient.objects.filter(campaign__in = Campaign.objects.filter(id__in = CampaignRecipient.objects.filter(email=recep.email).values_list('campaign').distinct('campaign')), sent=True).count()
            }
            

            resp.append(data)

        return Response(resp)


    def delete(self, request, format=None):
        recp_to_delete = CampaignRecipient.objects.filter(id__in=request.data["recp_ids"]).update(is_delete=True)
        return Response({"message":"Successfully Deleted","success":True})
        


class ProspectsCampaignView(generics.ListAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        email_for_campaigns = CampaignRecipient.objects.get(id=pk)

        queryset = CampaignRecipient.objects.filter(email=email_for_campaigns.email, is_delete=False)
        resp = []
        
        for queryset in queryset:
            data = {
                'campaign_id': queryset.campaign.id,
                'reciepent_email': queryset.email,
                'campaign_title':queryset.campaign.title,
                'added': Campaign.objects.filter(id=queryset.campaign.id).values_list("created_date_time")[0][0].strftime("%B %d, %Y"),
                'sent_in_a_camp': CampaignRecipient.objects.filter(campaign=queryset.campaign.id, sent=True).count(),
                'lead_status':queryset.lead_status,
                'opens':CampaignRecipient.objects.filter(campaign=queryset.campaign.id, opens=True).count(),
                'replies':CampaignRecipient.objects.filter(campaign=queryset.campaign.id, replies=True).count(),
            }
       
            resp.append(data)

        return Response(resp)

    


class RecipientUnsubcribe(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UnsubscribeEmailSerializers     

    def put(self, request, format=None):
        recipient_id =request.data["recipient_id"]
        for id in recipient_id:
            recipient = CampaignRecipient.objects.get(id = id)
            recipient.unsubscribe=True
            recipient.save()
            data = {
                "email" : recipient.email,
                "full_name" : recipient.full_name,
                'user':request.user.id
            }
            serializer = UnsubscribeEmailSerializers(data=data)
            if serializer.is_valid():
                serializer.save()
        return Response("Done")
     