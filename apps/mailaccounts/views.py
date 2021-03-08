from rest_framework import generics, permissions
from rest_framework.response import Response

from apps.campaignschedule.models import Schedule
from apps.users.models import CustomUser

from .models import EmailAccount
from .serializers import EmailAccountSerializer
from .utils import check_smtp_email


class MailAccountListView(generics.ListCreateAPIView):
    # serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = EmailAccount.objects.all()

    def post(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        if request.data['smtp_username'] == request.data['email'] and request.data['imap_username'] == request.data[
            'email']:
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
                    if check_smtp_email(request.data["smtp_host"], request.data["smtp_port"], request.data["email"],
                                        request.data["smtp_password"])[1].decode("utf-8") == "Authentication succeeded":
                        serializer.save()
                        email_account_data = EmailAccount.objects.filter(user=request.user.id)
                        count_email_accounts_of_current_user = email_account_data.count()
                        if count_email_accounts_of_current_user == 1:
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
                    return Response({"message": check_smtp_email(request.data["smtp_host"], request.data["smtp_port"],
                                                                 request.data["email"], request.data["smtp_password"])[
                                                8:-2], "success": False})
                return Response({"message": serializer.data, "success": True})
            return Response({'message': serializer.errors, "success": False})
        return Response({"message": "Smtp username and Imap username does not match to email"})

    def get(self, request, *args, **kwargs):

        try:
            queryset = EmailAccount.objects.filter(user=request.user.id)
            serializer = EmailAccountSerializer(queryset, many=True)
            return Response({"message": serializer.data, "success": True})

        except:
            return Response({"message": "mail accounts not available"})


class MailAccountView(generics.UpdateAPIView):
    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = EmailAccount.objects.all()

    def put(self, request, pk, format=None):
        queryset = EmailAccount.objects.get(id=pk)
        request.data["user"] = request.user.id
        serializer = EmailAccountSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Connection Updated successfully"})
        return Response({"error": serializer.errors})

    def delete(self, request, pk, format=None):
        try:
            queryset = EmailAccount.objects.get(id=pk)
        except:
            return Response({"message": "No Mail Account For this Id"})
        queryset.delete()
        return Response({"message": "Connection Delete successfully", "success": True})
