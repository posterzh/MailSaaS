from django.shortcuts import render
from .models import Campaign, Campaign_email, Follow_up_email, Drip_email, On_Link_Click
from .serializers import CampaignSerializer, CampaignEmailSerializer,CampaignViewSerializer,FollowUpSerializer,OnclickSerializer,DripEmailSerilizer
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
import csv
import datetime 


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

    # def get(self, request, format=None):
    #     camp = Campaign.objects.all()
    #     serializer = CampaignSerializer(camp, many=True)
    #     return Response(serializer.data)
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
                with open('media/'+str(camp.csvFile_op1)) as csv_file:
                    csv_reader = csv.reader(csv_file, delimiter=',')
                    line_count = 0
                    resp = []
                    for row in csv_reader:
                        if line_count == 0:
                            line_count += 1
                        else:
                            data = {'email':row[0], 'full_name':row[1], 'campaign':postData['campaign']}
                            serializer = CampaignEmailSerializer(data = data)
                            if serializer.is_valid():
                                line_count += 1
                                serializer.save()
                                resp.append(serializer.data)
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

    def get(self, request, *args,**kwargs):
        getData = request.data
        
        # print("camppppppp ", camp)
        try:
            camp = Campaign.objects.get(id=getData["campaign"])

        except:
            return Response({"message":"No campiagn availabe for this id", "success":"false"})

        serializercamp = CampaignSerializer(camp)

        resp = {}
        resp["campaign"] = serializercamp.data

        campEmaildatalist = []
        campEmail = Campaign_email.objects.filter(campaign=getData["campaign"])
        for campemail in campEmail:
            serializercampEmail = CampaignEmailSerializer(campemail)
            campEmaildatalist.append(serializercampEmail.data)
        resp["campEamil"] = campEmaildatalist

        followupdatalist = []
        follow_up = Follow_up_email.objects.filter(campaign=getData["campaign"])
        for followup in follow_up:
            serializerfollowup = FollowUpSerializer(followup)
            followupdatalist.append(serializerfollowup.data)
        resp["follow_up"] = followupdatalist

        dripdatalist = []
        drip_email = Drip_email.objects.filter(campaign=getData["campaign"])
        for dripemail in drip_email:
            serilizedripmail = DripEmailSerilizer(dripemail)
            dripdatalist.append(serilizedripmail.data)
        resp["drip"] = dripdatalist

        onclickdatalist = []
        on_click = On_Link_Click.objects.filter(campaign=getData["campaign"])
        for onclick in on_click:
            serializeronclick = OnclickSerializer(onclick)
            onclickdatalist.append(serializeronclick.data)
        resp["onLinkClick"] = onclickdatalist

        return Response(resp)
        
    def put(self, request, *args,**kwargs):
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
        postData = request.data
        print("pppppppppp ", postData)
        if postData["termsAndLaws"] == 'true':
            # print("postDataaaaaaaaa ",postData)
            camp = Campaign.objects.get(id=postData['campaign'])
            campEmail = Campaign_email.objects.filter(campaign=postData['campaign'])
            # print("camppppppp ",camp)
            campData = CampaignSerializer(camp)
            campSerializerData = campData.data
            print("gettttttttttt ",campSerializerData["scheduleDateTime"], type(campSerializerData["scheduleDateTime"]))
            campSerializerData["trackOpens"] = postData["trackOpens"]
            campSerializerData["trackLinkClick"] = postData["trackLinkClick"]
            campSerializerData["scheduleThisSend"] = postData["scheduleThisSend"]


            # datetime_str = '2016-05-18T15:37:36.993048Z'
            # old_format = '%Y-%m-%dT%H:%M:%S.%fZ'
            # new_format = '%d-%m-%Y %H:%M:%S'
            # new_datetime_str = datetime.datetime.strptime(datetime_str, old_format).strftime(new_format)
            # print("new_datetime_str = ",new_datetime_str)


            campSerializerData["scheduleDateTime"] = postData["scheduleDateTime"]
            campSerializerData["termsAndLaws"] = postData["termsAndLaws"]
            print("\n\n\n", campSerializerData["scheduleDateTime"], type(campSerializerData["scheduleDateTime"]), "\n\n\n")
            campSerializer = CampaignSerializer(camp, data=campSerializerData)
            print(campSerializer)
            if campSerializer.is_valid():
                print("Validddddddd")
                campSerializer.save()


            return Response({"message":"Updated Successfully", "success":"true"})
        else:
            return Response({"message":"Please agree to the terms.", "success":"false"})

class CampaignView(generics.ListAPIView):

    """
        For Get all Campaign by user 
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args,**kwargs):
        queryset = Campaign.objects.filter(assigned = request.user.id)
        serializer = CampaignViewSerializer(queryset,  many=True)
        return Response(serializer.data)
        

class LeadsView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args,**kwargs):
        data = request.data
        query = Campaign_email.objects.filter(leads=True)
        w = CampaignEmailSerializer(query, many = True)
        return Response(w.data)