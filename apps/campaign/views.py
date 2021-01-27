from django.shortcuts import render
from .models import Campaign, Campaign_email, Follow_up_email, Drip_email, On_Link_Click,CampaignLeadCatcher
from .serializers import (
    CampaignSerializer, 
    CampaignEmailSerializer,
    FollowUpSerializer,
    OnclickSerializer,
    DripEmailSerilizer,
    CampaignLeadCatcherSerializer)
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
import csv
import datetime 
from datetime import datetime 
from django.core.mail import send_mail
import pytracking
from django.core.mail import EmailMultiAlternatives
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.sites.models import Site
from django.conf import settings







class create_campaign_start(APIView):

    permission_classes = (permissions.IsAuthenticated,)    
        
    def post(self, request, format=None):
        if request.user.is_active:
            if 'campaign.add_campaign' in request.user.get_group_permissions():
                postData = request.data
                postData._mutable = True
                postData["assigned"] = request.user.id
                postData._mutable = False
                serializer = CampaignSerializer(data = postData)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message':"Has No Permissions",'status':401})
        return Response({'message':"Your account is not active",'status':status.HTTP_200_OK})

   
class create_campaign_recipients(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        postData = request.data
        if 'campaign.add_campaign' in request.user.get_group_permissions():
            if int(postData["option"]) == 1:
                try:
                    camp = Campaign.objects.get(id=postData['campaign'])
                except:
                    return Response({"message":"No campiagn availabe for this id", "success":"false"})
                camp.csvFile_op1 = postData['csvFile']
                camp.save()
                print('media/'+str(camp.csvFile_op1))
                with open('media/'+str(camp.csvFile_op1)) as csv_file:
                    csv_reader = csv.reader(csv_file, delimiter=',')
                    print("csv row = ",csv_reader)
                    line_count = 0
                    resp = []
                    for row in csv_reader:
                        if line_count == 0:
                            line_count += 1
                            # return Response({"message":"No Rows in file", "success":False})
                        else:
                            data = {'email':row[0], 'full_name':row[1], 'company_name':row[2], 'role':row[3], 'campaign':postData['campaign']}
                            serializer = CampaignEmailSerializer(data = data)
                            if serializer.is_valid():
                                line_count += 1
                                serializer.save()
                                resp.append(serializer.data)
                    resp.append({"success":True})
                    return Response(resp)

            elif int(postData["option"]) == 2:
                serializer = CampaignEmailSerializer(data = postData)
                if serializer.is_valid():
                    camp = Campaign.objects.get(id=postData['campaign'])
                    CampaignEmail = Campaign_email(campaign=camp, email=postData["email"])
                    CampaignEmail.save()
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message':"Has No Permissions",'status':401})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class create_campaign_message(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        postData = request.data
        camp = Campaign.objects.get(id=postData["normal"]['campaign'])
        campEmail = Campaign_email.objects.filter(campaign=postData["normal"]['campaign'])
        for campemail in campEmail:
            campEmailserializer = CampaignEmailSerializer(campemail)
            sData = campEmailserializer.data
            sData["subject"] = postData["normal"]['subject']
            sData["emailBody"] = postData["normal"]['emailBody']
            CampEmailData = CampaignEmailSerializer(campemail, data = sData)
            if CampEmailData.is_valid():
                CampEmailData.save()

        for follow_up in postData["follow_up"]:
            FollowUpEmail = Follow_up_email(campaign=camp, waitDays=follow_up["waitDays"], subject=follow_up["subject"], emailBody=follow_up["emailBody"])
            FollowUpEmail.save()
        for drips in postData["drips"]:
            DripEmail = Drip_email(campaign=camp, waitDays=drips["waitDays"], subject=drips["subject"], emailBody=drips["emailBody"])
            DripEmail.save()
        for onLinkClick in postData["onLinkClick"]:
            onLinkClick = On_Link_Click(campaign=camp, url=onLinkClick["url"], waitDays=onLinkClick["waitDays"], subject=onLinkClick["subject"], emailBody=onLinkClick["emailBody"])
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
        campEmail = Campaign_email.objects.filter(campaign=pk)
        for campemail in campEmail:
            serializercampEmail = CampaignEmailSerializer(campemail)
            campEmaildatalist.append(serializercampEmail.data)
        resp["campEamil"] = campEmaildatalist

        followupdatalist = []
        follow_up = Follow_up_email.objects.filter(campaign=pk)
        for followup in follow_up:
            serializerfollowup = FollowUpSerializer(followup)
            followupdatalist.append(serializerfollowup.data)
        resp["follow_up"] = followupdatalist

        dripdatalist = []
        drip_email = Drip_email.objects.filter(campaign=pk)
        for dripemail in drip_email:
            serilizedripmail = DripEmailSerilizer(dripemail)
            dripdatalist.append(serilizedripmail.data)
        resp["drip"] = dripdatalist

        onclickdatalist = []
        on_click = On_Link_Click.objects.filter(campaign=pk)
        for onclick in on_click:
            serializeronclick = OnclickSerializer(onclick)
            onclickdatalist.append(serializeronclick.data)
        resp["onLinkClick"] = onclickdatalist

        return Response(resp)
        
    def put(self, request, pk, *args,**kwargs):
        for campemail in request.data["campEamil"]:
            campEmalOb = Campaign_email.objects.get(id=campemail["id"])
            campEmailSave = CampaignEmailSerializer(campEmalOb, data=campemail)
            if campEmailSave.is_valid():
                campEmailSave.save()
            else:
                return Response({"message":"Campain Email Error"})
        for followup in request.data["follow_up"]:
            followUpOb = Follow_up_email.objects.get(id=followup["id"])
            followUpSave = FollowUpSerializer(followUpOb, data=followup)
            if followUpSave.is_valid():
                followUpSave.save()
            else:
                return Response({"message":"Follow Up Email Error"})
        for drip in request.data["drip"]:
            dripEmailOb = Drip_email.objects.get(id=drip["id"])
            dripEmailSave = DripEmailSerilizer(dripEmailOb, data=drip)
            if dripEmailSave.is_valid():
                dripEmailSave.save()
            else:
                return Response({"message":"Drip Email Error"})
        for onLinkClick in request.data["onLinkClick"]:
            onLinkClickOb = On_Link_Click.objects.get(id=onLinkClick["id"])
            onLinkClickSave = OnclickSerializer(onLinkClickOb, data=onLinkClick)
            if onLinkClickSave.is_valid():
                onLinkClickSave.save()
            else:
                return Response({"message":"On Link Click Email Error"})

        return Response({"message":"Updated Successfully", "success":"True"})

class create_campaign_options(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def put(self, request, format=None):
        if request.data['termsAndLaws'] == True:
            queryset = Campaign.objects.get(id = request.data['campaign'])
            request.data["title"] = queryset.title
            request.data["fromAddress"] = queryset.fromAddress
            request.data["csvFile_op1"] = queryset.csvFile_op1
            request.data["assigned"] = request.user.id
            request.data["update_date_time"] = datetime.now()
            request.data["created_date_time"] = queryset.created_date_time
            if request.data["scheduleThisSend"] and not (request.data["scheduleDate"] or request.data["scheduleTime"]):
                return Response({"message":"Please Enter Date Time", "success":"false"})
            if not request.data["scheduleThisSend"]:
                request.data["scheduleDate"] = None
                request.data["scheduleTime"] = None
            serilizer = CampaignSerializer(queryset, data=request.data)
            if serilizer.is_valid():
                serilizer.save()
                return Response(serilizer.data)
            return Response({'message':'invalid serilizer', "success":"false"})
        return Response({"message":"Please agree to the terms.", "success":"false"})


class create_campaign_send(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk, format=None):
        resp = {}
        camp = Campaign.objects.get(id = pk)
        campSerializer = CampaignSerializer(camp)
        # print(campSerializer.data)
        resp["fromAddress"] = {campSerializer.data["fromAddress"]}
        resp["full_name"] = {campSerializer.data["full_name"]}
        campEmailrecipientsList = []
        campEmail = Campaign_email.objects.filter(campaign = pk)
        for campemail in campEmail:
            print("campEmail ",campemail)
            campEmailSerialiser = CampaignEmailSerializer(campemail)
            campEmailrecipientsList.append(campEmailSerialiser.data["email"])
        resp["recipients"] = campEmailrecipientsList


        campEmaildatalist = []
        campEmail = Campaign_email.objects.filter(campaign=pk).distinct('subject')
        for campemail in campEmail:
            serializercampEmail = CampaignEmailSerializer(campemail)
            campEmaildatalist.append(serializercampEmail.data['subject'])
        resp["campEamil"] = campEmaildatalist

        followupdatalist = []
        follow_up = Follow_up_email.objects.filter(campaign=pk).distinct('subject')
        for followup in follow_up:
            serializerfollowup = FollowUpSerializer(followup)
            followupdatalist.append(serializerfollowup.data['subject'])
        resp["follow_up"] = followupdatalist

        dripdatalist = []
        drip_email = Drip_email.objects.filter(campaign=pk).distinct('subject')
        for dripemail in drip_email:
            serilizedripmail = DripEmailSerilizer(dripemail)
            dripdatalist.append(serilizedripmail.data['subject'])
        resp["drip"] = dripdatalist

        onclickdatalist = []
        on_click = On_Link_Click.objects.filter(campaign=pk).distinct('subject')
        for onclick in on_click:
            serializeronclick = OnclickSerializer(onclick)
            onclickdatalist.append(serializeronclick.data['subject'])
        resp["onLinkClick"] = onclickdatalist
        return Response(resp)

    def put(self, request, pk, format=None):
        camp = Campaign.objects.get(id=pk)
        getCampData = CampaignSerializer(camp)
        campData = dict(getCampData.data)
        campData["isActiveCampaign"] = request.data["startCampaign"]
        campData["csvFile_op1"] = camp.csvFile_op1
        CampSerializer = CampaignSerializer(camp, data=campData)
        if CampSerializer.is_valid():
            CampSerializer.save()
            if not camp.scheduleThisSend:
                campEmail = Campaign_email.objects.filter(campaign=pk)
                
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

                    emailData = campemail.emailBody + "<img width=0 height=0 src='"+open_tracking_url+"' />"

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
                    #     campemail.emailBody,
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
        # serializer = CampaignViewSerializer(queryset,  many=True)
        allData = []
        for camp in campaigns:
            campEmail = Campaign_email.objects.filter(campaign=camp.id)
            campEmailserializer = CampaignEmailSerializer(campEmail, many = True)
            resp = {
                "recipientCount": campEmail.count(),
                "sentCount":0,
                "leadCount": 0,
                "openLeadCount": 0,
                # "openLeadPer": 0,
                "wonLeadCount": 0,
                # "wonLeadPer": 0,
                "lostLeadCount": 0,
                # "lostLeadPer": 0,
                "ignoredLeadCount": 0,
                # "ignoredLeadPer": 0,
                # "data":campEmailserializer.data
                }
            for campData in campEmailserializer.data:
                # print(campData)
                if campData["sent"]:
                    resp["sentCount"] = resp["sentCount"] + 1

                if campData["leads"]:
                    resp["leadCount"] = resp["leadCount"] + 1

                    if campData["leadStatus"]=="openLead":
                        resp["openLeadCount"] = resp["openLeadCount"] + 1                    
                    if campData["leadStatus"]=="wonLead":
                        resp["wonLeadCount"] = resp["wonLeadCount"] + 1
                    if campData["leadStatus"]=="lostLead":
                        resp["lostLeadCount"] = resp["lostLeadCount"] + 1
                    if campData["leadStatus"]=="ignoredLead":
                        resp["ignoredLeadCount"] = resp["ignoredLeadCount"] + 1
                    
                    # resp["openLeadPer"] = (resp["openLeadCount"]*100)/resp["leadCount"]
                    # resp["wonLeadPer"] = (resp["wonLeadCount"]*100)/resp["leadCount"]
                    # resp["lostLeadPer"] = (resp["lostLeadCount"]*100)/resp["leadCount"]
                    # resp["ignoredLeadPer"] = (resp["ignoredLeadCount"]*100)/resp["leadCount"]
            allData.append(resp)

        return Response(allData)
        # return Response(serializer.data)
        

class LeadsCatcherView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args,**kwargs):
        campEmail = Campaign_email.objects.filter(leads=True)
        campEmailserializer = CampaignEmailSerializer(campEmail, many = True)
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
        print(trackData)

        camp = Campaign.objects.get(id = trackData["campaign"])
        print("campaignnnnnnnnn ",camp)

        campEmail = Campaign_email.objects.get(id = trackData["campEmailId"])
        campEmail.opens = True
        campEmail.save()
        # if camp.trackOpens:
        #     counttracking = countTracking + 1

     
        return Response({"message":"Saved Successfully"})
class Get_campaign_overview(APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, pk, format=None):
        postData = request.data

        campEmail = Campaign_email.objects.filter(campaign=pk)
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
            # "data":campEmailserializer.data
            }
        for campData in campEmailserializer.data:
            # print(campData)
            if campData["leads"]:
                resp["leadCount"] = resp["leadCount"] + 1

                if campData["leadStatus"]=="openLead":
                    resp["openLeadCount"] = resp["openLeadCount"] + 1                    
                if campData["leadStatus"]=="wonLead":
                    resp["wonLeadCount"] = resp["wonLeadCount"] + 1
                if campData["leadStatus"]=="lostLead":
                    resp["lostLeadCount"] = resp["lostLeadCount"] + 1
                if campData["leadStatus"]=="ignoredLead":
                    resp["ignoredLeadCount"] = resp["ignoredLeadCount"] + 1
                
                resp["openLeadPer"] = (resp["openLeadCount"]*100)/resp["leadCount"]
                resp["wonLeadPer"] = (resp["wonLeadCount"]*100)/resp["leadCount"]
                resp["lostLeadPer"] = (resp["lostLeadCount"]*100)/resp["leadCount"]
                resp["ignoredLeadPer"] = (resp["ignoredLeadCount"]*100)/resp["leadCount"]

        return Response(resp)
    

class AllRecipientView(generics.ListAPIView):

    """  For View  all Recipients """

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args,**kwargs):

        campEmail = Campaign_email.objects.filter(campaign=request.data['campaign'])
        campEmailserializer = CampaignEmailSerializer(campEmail, many = True)
        return Response(campEmailserializer.data)

class RecipientDetailView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    queryset = Campaign_email.objects.all()
    serializer_class = CampaignEmailSerializer

    def get_object(self,request,pk):

        try:        
            return Campaign_email.objects.get(id = pk)
        except Campaign_email.DoesNotExist:
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
    queryset = Campaign_email.objects.all()
    serializer_class = CampaignEmailSerializer

    """  For View subject and emailbody of normal/Follow_up/Drip/On_click email """

    def get(self, request, pk, format=None):
        alldata = {}
        normallist = []
        normal = Campaign_email.objects.filter(campaign=pk)
        for nrml in normal:
            serilizer = CampaignEmailSerializer(nrml)
            normallist.append({'id':serilizer.data['id'],'subject':serilizer.data['subject'],'emailBody':serilizer.data['emailBody']})
        alldata['normal'] = normallist[0]

        follow_up_list = []
        followup = Follow_up_email.objects.filter(campaign=pk)
        for follow_up in followup:
            serilizer = FollowUpSerializer(follow_up)
            follow_up_list.append({'id':serilizer.data['id'],'subject':serilizer.data['subject'],'emailBody':serilizer.data['emailBody']})
        alldata['followup'] = follow_up_list[0]

        drip_list = []
        drip = Drip_email.objects.filter(campaign=pk)
        for drip_mail in drip:
            serilizer = DripEmailSerilizer(drip_mail)
            drip_list.append({'id':serilizer.data['id'],'subject':serilizer.data['subject'],'emailBody':serilizer.data['emailBody']})
        alldata['drip'] = drip_list[0]

        onclick_list = []
        on_click = On_Link_Click.objects.filter(campaign=pk)
        for onclick in on_click:
            serilizer = OnclickSerializer(onclick)
            onclick_list.append({'id':serilizer.data['id'],'subject':serilizer.data['subject'],'emailBody':serilizer.data['emailBody']})
        alldata['on_click'] = onclick_list[0]

        return Response(alldata)

    def put(self, request, pk, format=None):

        """  For Update subject and emailbody of normal/Follow_up/Drip/On_click email """
        
        normalemail = Campaign_email.objects.filter(id=request.data['normal']['id'])
        for normal_mail in normalemail:
            normalemaildata = CampaignEmailSerializer(normal_mail)
            normalemaildata = dict(normalemaildata.data)
            normalemaildata["subject"] = request.data['normal']['subject']
            normalemaildata["emailBody"] = request.data['normal']['emailBody']
            normalemailserilize = CampaignEmailSerializer(normal_mail, data=normalemaildata)
            if normalemailserilize.is_valid():
                normalemailserilize.save()
            else:
                return Response({"error":campEmailSave.errors})

        followup = Follow_up_email.objects.filter(id=request.data['followup']['id'])
        for follow_up in followup:
            followupdata = FollowUpSerializer(follow_up)
            followupdata = dict(followupdata.data)
            followupdata["subject"] = request.data['followup']['subject']
            followupdata["emailBody"] = request.data['followup']['emailBody']
            followupserilize = FollowUpSerializer(follow_up, data=followupdata)
            if followupserilize.is_valid():
                followupserilize.save()
            else:
                return Response({"error2":followupserilize.errors})

        dripmail = Drip_email.objects.filter(id=request.data['drip']['id'])
        for drip_mail in dripmail:
            dripmaildata = DripEmailSerilizer(drip_mail)
            dripmaildata = dict(dripmaildata.data)
            dripmaildata["subject"] = request.data['drip']['subject']
            dripmaildata["emailBody"] = request.data['drip']['emailBody']
            dripmailserilize = DripEmailSerilizer(drip_mail, data=dripmaildata)
            if dripmailserilize.is_valid():
                dripmailserilize.save()
            else:
                return Response({"error2":dripmailserilize.errors})

        onlinkclickmail = On_Link_Click.objects.filter(id=request.data['on_click']['id'])
        for on_click in onlinkclickmail:
            onlinkclickmaildata = OnclickSerializer(on_click)
            onlinkclickmaildata = dict(onlinkclickmaildata.data)
            onlinkclickmaildata["subject"] = request.data['on_click']['subject']
            onlinkclickmaildata["emailBody"] = request.data['on_click']['emailBody']
            onlinkclickserilize = OnclickSerializer(on_click, data=onlinkclickmaildata)
            if onlinkclickserilize.is_valid():
                onlinkclickserilize.save()
                return Response({"message":"Data updated sucessfully"})
            else:
                return Response({"error2":onlinkclickserilize.errors})
        