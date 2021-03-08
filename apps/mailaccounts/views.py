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
        serializer = EmailAccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": serializer.data, "success": True})
        return Response({'message': serializer.errors, "success": False})

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
