from django.http import Http404, HttpResponseServerError, HttpResponseBadRequest
from rest_framework import generics, permissions
from rest_framework.response import Response

from apps.campaignschedule.models import Schedule
from apps.users.models import CustomUser

from .models import EmailAccount, SendingCalendar
from .serializers import EmailAccountSerializer, SendingCalendarSerializer
from .utils import check_smtp_email


# class EmailAccountListView(generics.ListCreateAPIView):
#     queryset = EmailAccount.objects.all()
#     serializer_class = EmailAccountSerializer
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def post(self, request, *args, **kwargs):
#         request.data["user"] = request.user.id
#         serializer = EmailAccountSerializer(data=request.data)
#         if not serializer.is_valid():
#             return HttpResponseBadRequest(serializer.default_error_messages)
#
#         saved = serializer.save()
#         return Response(serializer.data)
#
#     def get(self, request, *args, **kwargs):
#         try:
#             queryset = EmailAccount.objects.filter(user=request.user.id)
#             serializer = EmailAccountSerializer(queryset, many=True)
#         except Exception as ex:
#             raise HttpResponseBadRequest(str(ex))
#
#         return Response(serializer.data)

# class EmailAccountView(generics.UpdateAPIView):
#     queryset = EmailAccount.objects.all()
#     serializer_class = EmailAccountSerializer
#     permission_classes = (permissions.IsAuthenticated,)
#
#     def put(self, request, pk, format=None):
#         queryset = EmailAccount.objects.get(id=pk)
#         request.data["user"] = request.user.id
#         serializer = EmailAccountSerializer(queryset, data=request.data)
#         if not serializer.is_valid():
#             raise HttpResponseBadRequest(serializer.default_error_messages)
#
#         serializer.save()
#         return Response(serializer.data)
#
#     def delete(self, request, pk, format=None):
#         try:
#             queryset = EmailAccount.objects.get(id=pk)
#         except Exception as ex:
#             raise HttpResponseBadRequest(str(ex))
#         queryset.delete()
#         return Response({"message": "Connection Delete successfully", "success": True})


class EmailAccountListView(generics.ListCreateAPIView):
    queryset = EmailAccount.objects.all()
    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user.id)

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return self.create(request, *args, **kwargs)


class EmailAccountView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EmailAccount.objects.all()
    serializer_class = EmailAccountSerializer
    permission_classes = (permissions.IsAuthenticated,)


class SendingCalendarListView(generics.ListCreateAPIView):
    queryset = SendingCalendar.objects.all()
    serializer_class = SendingCalendarSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        return SendingCalendar.objects.filter(mail_account__user_id__exact=self.request.user.id)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class SendingCalendarView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SendingCalendar.objects.all()
    serializer_class = SendingCalendarSerializer
    permission_classes = (permissions.IsAuthenticated,)




