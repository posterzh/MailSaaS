import csv
import datetime
from datetime import datetime

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
import csv
import datetime 
from django.db.models import Q

from .models import (Campaign, CampaignLeadCatcher, CampaignRecipient,
                     DripEmailModel, EmailOnLinkClick, FollowUpEmail)
from .serializers import (CampaignEmailSerializer,
                          CampaignLeadCatcherSerializer, CampaignSerializer,
                          DripEmailSerilizer, FollowUpSerializer,
                          OnclickSerializer)


class CreateCampaignStartView(APIView):

    permission_classes = (permissions.IsAuthenticated,)    
        
    def post(self, request, format=None):
        if request.user.is_active:
            if 'campaign.add_campaign' in request.user.get_group_permissions():
                postdata = request.data
                postdata._mutable = True
                postdata["assigned"] = request.user.id
                postdata._mutable = False
                serializer = CampaignSerializer(data = postdata)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message':"Has No Permissions",'status':401})
        return Response({'message':"Your account is not active",'status':status.HTTP_200_OK})

   
class CreateCampaignRecipientsView(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        postdata = request.data
        
        if 'campaign.add_campaign' in request.user.get_group_permissions():
            if int(postdata["option"]) == 1:
                try:
                    camp = Campaign.objects.get(id=postdata['campaign'])
                except:
                    return Response({"message":"No campiagn availabe for this id", "success":"false"})
                camp.csvfile_op1 = postdata['csvFile']
                camp.save()
                with open('media/'+str(camp.csvfile_op1)) as csv_file:
                    csv_reader = csv.reader(csv_file, delimiter=',')
                    line_count = 0
                    resp = []
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
                    return Response(resp)

            elif int(postdata["option"]) == 2:
                serializer = CampaignEmailSerializer(data = postdata)
                if serializer.is_valid():
                    camp = Campaign.objects.get(id=postdata['campaign'])
                    CampaignEmail = CampaignRecipient(campaign=camp, email=postdata["email"])
                    CampaignEmail.save()
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message':"Has No Permissions",'status':401})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        resp["campEamil"] = campEmaildatalist

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
        for campemail in request.data["campEamil"]:
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
            queryset = Campaign.objects.get(id = request.data['campaign'])
            request.data["title"] = queryset.title
            request.data["from_address"] = queryset.from_address
            request.data["csvfile_op1"] = queryset.csvfile_op1
            request.data["assigned"] = request.user.id
            request.data["update_date_time"] = datetime.now()
            request.data["created_date_time"] = queryset.created_date_time
            if request.data["schedule_send"] and not (request.data["schedule_date"] or request.data["schedule_time"]):
                return Response({"message":"Please Enter Date Time", "success":"false"})
            if request.data["schedule_send"]:
                print(request.data)
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
        camp = Campaign.objects.get(id = pk)
        campSerializer = CampaignSerializer(camp)
        resp["from_address"] = {campSerializer.data["from_address"]}
        resp["full_name"] = {campSerializer.data["full_name"]}
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
        camp = Campaign.objects.get(id=pk)
        getCampData = CampaignSerializer(camp)
        campData = dict(getCampData.data)
        campData["campaign_status"] = request.data["startCampaign"]
        campData["csvfile_op1"] = camp.csvfile_op1
        CampSerializer = CampaignSerializer(camp, data=campData)
        if CampSerializer.is_valid():
            CampSerializer.save()
            if not camp.schedule_send:
                campEmail = CampaignRecipient.objects.filter(campaign=pk)
                
                for campemail in campEmail:
                    

                    open_tracking_url = pytracking.get_open_tracking_url(
                        {"campEmailId": campemail.id, "campaign": campemail.campaign.id}, 
                        base_open_tracking_url="http://localhost:8000/campaign/email/open/",
                        webhook_url="http://localhost:8000/campaign/email/open/", 
                        include_webhook_url=True
                    )
                    print("oo = ",open_tracking_url)


                    

                    # full_url = open_tracking_url

                    # print("full urlllll 222 ", full_url)

                    # tracking_result = pytracking.get_open_tracking_result(
                    #     full_url, base_open_tracking_url="http://localhost:8000/campaign/email/open/")

                    # print("tracking_resultttttttttt222 ",tracking_result)
                    # print("tracking_resultttttttttt tracking_result.metadata222 ",tracking_result.metadata)
                    # print("tracking_resultttttttttt webhook_url2222 ",tracking_result.webhook_url)

                    
                        
                    # tracking_result = pytracking.get_open_tracking_result(
                    #     open_tracking_url, base_click_tracking_url=open_tracking_url)

                    # print("tttt = ",tracking_result)
                    # send_webhook(tracking_result)

                    # from cryptography.fernet import Fernet
                    # key = Fernet.generate_key()

                    # (pixel_byte_string, mime_type) = pytracking.get_open_tracking_pixel()

                    # print("pixel_byte_string     ",pixel_byte_string)

                    # Decode
                    # tracking_result = pytracking.get_open_tracking_result(
                    #     full_url, base_click_tracking_url="https://trackingdomain.com/path/",
                    #     encryption_bytestring_key=key)

                    emailData = campemail.email_body + "<img width=0 height=0 src='"+open_tracking_url+"' />"

                    subject = campemail.subject
                    text_content = 'plain text body message.'
                   
                    html_content = emailData
                    msg = EmailMultiAlternatives(subject, text_content, 'developer@externlabs.com', ['gauravsurolia@externlabs.com'])

                    msg.attach_alternative(html_content, "text/html")
                    msg.send()

                    campemail.sent = True
                    campemail.save()
                    
                    # send_mail(
                    #     campemail.subject,
                    #     campemail.email_body,
                    #     'developer@externlabs.com',
                    #     [campemail.email],
                    #     fail_silently=False,
                    # )
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
                    
                    # resp["openLeadPer"] = (resp["openLeadCount"]*100)/resp["leadCount"]
                    # resp["wonLeadPer"] = (resp["wonLeadCount"]*100)/resp["leadCount"]
                    # resp["lostLeadPer"] = (resp["lostLeadCount"]*100)/resp["leadCount"]
                    # resp["ignoredLeadPer"] = (resp["ignoredLeadCount"]*100)/resp["leadCount"]
            allData.append(resp)

        return Response(allData)
        # return Response(serializer.data)
        


class LeadsCatcherView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
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

            queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign__title__contains=title, leadStatus=leadstatus, campaign__assigned=request.user.id, leads=True)
        elif len(params) == 2:
            print("LEN = 2",params, ['search', 'title'] in params)
            if 'search' and 'title' in params:
                toSearch = request.GET['search']
                title = request.GET['title']

                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign__title__contains=title, campaign__assigned=request.user.id, leads=True)
            
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

                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch), leadStatus=leadstatus, campaign__assigned=request.user.id, leads=True)
            
            
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

                queryset = Campaign_email.objects.filter(campaign__title__contains=title, leadStatus=leadstatus, campaign__assigned=request.user.id, leads=True)
        elif len(params) == 1:
            if "search" in params:
                toSearch = request.GET['search']
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch), campaign__assigned=request.user.id, leads=True)
            elif "title" in params:
                title = request.GET['title']
                queryset = Campaign_email.objects.filter(campaign__title__contains=title, campaign__assigned=request.user.id, leads=True) 
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
                queryset = Campaign_email.objects.filter(leadStatus=leadstatus,campaign__assigned=request.user.id, leads=True)     
        else:
            queryset = Campaign_email.objects.filter(leads=True,campaign__assigned=request.user.id)
        campEmailserializer = CampaignEmailSerializer(queryset, many = True)
        return Response(campEmailserializer.data)


class TrackEmailOpen(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None, id=None):
        

        full_url = settings.SITE_URL + request.get_full_path()

        # print("fulllll urllll ",full_url)

        tracking_result = pytracking.get_open_tracking_result(
            full_url, base_open_tracking_url="http://localhost:8000/campaign/email/open/")

        # print("tracking_resultttttttttt ",tracking_result)
        # print("tracking_resultttttttttt tracking_result.metadata ",tracking_result.metadata)
        # print("tracking_resultttttttttt webhook_url ",tracking_result.webhook_url)

        trackData = tracking_result.metadata

        camp = Campaign.objects.get(id = trackData["campaign"])

        campEmail = CampaignRecipient.objects.get(id = trackData["campEmailId"])
        campEmail.opens = True
        campEmail.save()
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
                
                resp["openLeadPer"] = (resp["openLeadCount"]*100)/resp["leadCount"]
                resp["wonLeadPer"] = (resp["wonLeadCount"]*100)/resp["leadCount"]
                resp["lostLeadPer"] = (resp["lostLeadCount"]*100)/resp["leadCount"]
                resp["ignoredLeadPer"] = (resp["ignoredLeadCount"]*100)/resp["leadCount"]

        return Response(resp)
    

class AllRecipientView(generics.ListAPIView):

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
            print ('dfghjkl ', params)
            toSearch = request.GET['search']
            tofilter=request.GET['tofilter']
            if request.GET['tofilter'] == 'paused_reciepent':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,reciepent_status=False)    
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
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,leads=True,leadStatus=choice) 
            elif request.GET['tofilter']  == 'was_sent_message':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,sent=True) 
            elif request.GET['tofilter'] == 'has_opened':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=True) 
            # elif request.GET['tofilter'] == 'has_clicked':
            #     queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=True) 
            elif request.GET['tofilter'] == 'has_replied':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,replies=True)
            elif request.GET['tofilter'] == 'has_bounced':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,bounces=True)
            elif request.GET['tofilter'] == 'has_unsubscribed':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,unsubscribe=True)
            elif request.GET['tofilter']  == 'was_not_sent_messagese':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,sent=False) 
            elif request.GET['tofilter'] == 'has_not_opened':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=False) 
            # elif request.GET['tofilter'] == 'has_not_clicked':
            #     queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,opens=False) 
            elif request.GET['tofilter'] == 'has_not_replied':
                queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk,replies=False)
        elif 'tofilter' in params:
            tofilter=request.GET['tofilter']
            print('tofilter ', tofilter)
            if request.GET['tofilter'] == 'paused_reciepent':
                queryset = Campaign_email.objects.filter(campaign=pk,reciepent_status=False)    
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
                queryset = Campaign_email.objects.filter(campaign=pk,leads=True,leadStatus=choice) 
            elif request.GET['tofilter']  == 'was_sent_message':
                queryset = Campaign_email.objects.filter(campaign=pk,sent=True) 
            elif request.GET['tofilter'] == 'has_opened':
                queryset = Campaign_email.objects.filter(campaign=pk,opens=True) 
            # elif request.GET['tofilter'] == 'has_clicked':
            #     queryset = Campaign_email.objects.filter(campaign=pk,opens=True) 
            elif request.GET['tofilter'] == 'has_replied':
                queryset = Campaign_email.objects.filter(campaign=pk,replies=True)
            elif request.GET['tofilter'] == 'has_bounced':
                queryset = Campaign_email.objects.filter(campaign=pk,bounces=True)
            elif request.GET['tofilter'] == 'has_unsubscribed':
                queryset = Campaign_email.objects.filter(campaign=pk,unsubscribe=True)
            elif request.GET['tofilter']  == 'was_not_sent_messagese':
                queryset = Campaign_email.objects.filter(campaign=pk,sent=False) 
            elif request.GET['tofilter'] == 'has_not_opened':
                queryset = Campaign_email.objects.filter(campaign=pk,opens=False) 
            # elif request.GET['tofilter'] == 'has_not_clicked':
            #     queryset = Campaign_email.objects.filter(campaign=pk,opens=False) 
            elif request.GET['tofilter'] == 'has_not_replied':
                queryset = Campaign_email.objects.filter(campaign=pk,replies=False)    

        elif 'search' in params:
            toSearch = request.GET['search']
            queryset = Campaign_email.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign=pk)

        else:
            queryset = Campaign_email.objects.filter(campaign=pk)
        campEmailserializer = CampaignEmailSerializer(queryset, many = True)
        return Response(campEmailserializer.data)








class RecipientDetailView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    queryset = CampaignRecipient.objects.all()
    serializer_class = CampaignEmailSerializer

    def get_object(self,request,pk):

        try:        
            return CampaignRecipient.objects.get(id = pk)
        except CampaignRecipient.DoesNotExist:
                raise Http404

    def put(self, request, pk, format=None):
        queryset = self.get_object(request,pk)
        request.data['leads'] = True
        serializer = CampaignEmailSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        queryset = self.get_object(request, pk)
        queryset.delete()
        return Response('Deleted',status=status.HTTP_200_OK)

class CampaignleadCatcherView(generics.CreateAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignLeadCatcherSerializer

    def post(self, request, format=None):
        request.data._mutable = True
        request.data['assigned'] = request.user.id
        request.data._mutable = False

        serializer = CampaignLeadCatcherSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LeadCatcherUpdateView(generics.RetrieveUpdateDestroyAPIView):
    
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CampaignLeadCatcherSerializer
        
    def get(self, request, format=None):

        queryset = CampaignLeadCatcher.objects.all()
        serializer = CampaignLeadCatcherSerializer(queryset, many = True)
        return Response(serializer.data)
    
    def put(self, request,format=None):
        queryset = CampaignLeadCatcher.objects.get(campaign=request.data['campaign'])
        request.data['assigned'] = request.user.id
        serializer = CampaignLeadCatcherSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,format=None):
        queryset = CampaignLeadCatcher.objects.get(id=request.data['id'])
        queryset.delete()
        return Response('Deleted',status=status.HTTP_200_OK)
        

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
                queryset = CampaignRecipient.objects.filter(reciepent_status=choice,campaign__assigned=request.user.id)

            elif tofilter == "do_not_contact":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(unsubscribe=choice, campaign__assigned=request.user.id)
            
            elif tofilter == "has_opened":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(opens=choice, campaign__assigned=request.user.id)

            elif tofilter == "has_clicked":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(has_link_clicked=choice, campaign__assigned=request.user.id)

            elif tofilter == "has_replied":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(replies=choice, campaign__assigned=request.user.id)

            elif tofilter == "status":
                if choice == "lead":
                    queryset = CampaignRecipient.objects.filter(leads = True, campaign__assigned=request.user.id)
                elif choice == "openlead" or choice == "wonlead" or choice == "lostlead" or choice == "ignoredlead":
                    queryset = CampaignRecipient.objects.filter(leads = True, campaign__assigned=request.user.id)
            
            else:
                queryset = CampaignRecipient.objects.filter(campaign__assigned=request.user.id)
    
        elif "search" in params:
            toSearch = request.GET['search']
            queryset = CampaignRecipient.objects.filter(Q(email__contains=toSearch)|Q(full_name__contains=toSearch),campaign__assigned=request.user.id)

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
                queryset = CampaignRecipient.objects.filter(reciepent_status=choice,campaign__assigned=request.user.id)

            elif tofilter == "do_not_contact":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(unsubscribe=choice, campaign__assigned=request.user.id)
            
            elif tofilter == "has_opened":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(opens=choice, campaign__assigned=request.user.id)

            elif tofilter == "has_clicked":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(has_link_clicked=choice, campaign__assigned=request.user.id)

            elif tofilter == "has_replied":
                if choice == 'yes':
                    choice = True
                elif choice == 'no':
                    choice = False
                else:
                    choice = True
                queryset = CampaignRecipient.objects.filter(replies=choice, campaign__assigned=request.user.id)

            elif tofilter == "status":
                if choice == "lead":
                    queryset = CampaignRecipient.objects.filter(leads = True, campaign__assigned=request.user.id)

                elif choice == "openlead" or choice == "wonlead" or choice == "lostlead" or choice == "ignoredlead":
                    queryset = CampaignRecipient.objects.filter(leads = True, campaign__assigned=request.user.id)
            else:
                queryset = CampaignRecipient.objects.filter(campaign__assigned=request.user.id)
        else:
            queryset = CampaignRecipient.objects.filter(campaign__assigned=request.user.id)
        serializer = CampaignEmailSerializer(queryset,many=True)
        return Response(serializer.data)
