from allauth.account.utils import send_email_confirmation
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

from apps.users.serializer import (ChangePasswordSerializer, TokenSerializer,
                                   UserSettingSerilizer)

from .forms import CustomUserChangeForm, UploadAvatarForm
from .helpers import (require_email_confirmation,
                      user_has_confirmed_email_address)
from .models import CustomUser

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER

@login_required
def profile(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            user = form.save(commit=False)
            user_before_update = CustomUser.objects.get(pk=user.pk)
            need_to_confirm_email = (
                user_before_update.email != user.email
                and require_email_confirmation()
                and not user_has_confirmed_email_address(user, user.email)
            )
            if need_to_confirm_email:
                # don't change it but instead send a confirmation email
                # email will be changed by signal when confirmed
                new_email = user.email
                send_email_confirmation(request, user, signup=False, email=new_email)
                user.email = user_before_update.email
                # recreate the form to avoid populating the previous email in the returned page
                form = CustomUserChangeForm(instance=user)
            user.save()
    else:
        form = CustomUserChangeForm(instance=request.user)
    return render(request, 'account/profile.html', {
        'form': form,
        'active_tab': 'profile'
    })


@login_required
@require_POST
def upload_profile_image(request):
    user = request.user
    form = UploadAvatarForm(request.POST, request.FILES)
    if form.is_valid():
        user.avatar = request.FILES['avatar']
        user.save()
    return HttpResponse('Success!')


class UserSettingsView(generics.RetrieveUpdateAPIView):
        
    """
        API for updating login recruiter detail or admin can choose recruiter for update by username
        PUT : recuriter/update/ 
    """

    permission_classes = (permissions.IsAuthenticated,)
    
    
    def get_objects(self,request):
        try:
            current_user = request.user
            custom_get =  CustomUser.objects.get(pk=current_user.pk)
            response = {}
            response["user_obj"] = custom_get
            response["status_code"] = 200
            return response
            
        except CustomUser.DoesNotExist: 
            response = {}
            response["status_code"]=400
            return response
    
    def get(self,request):
        queryset=self.get_objects(request)
        serializer=UserSettingSerilizer(queryset["user_obj"])
        return Response(serializer.data)
    
    def put(self,request):
        new_email = request.data.get('email')
        if CustomUser.objects.filter(email=request.user) != new_email:
            queryset=self.get_objects(request)
            serializer=UserSettingSerilizer(queryset["user_obj"],data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'This email is already exists'})

class ChangePasswordView(generics.RetrieveUpdateAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def put(self,request, *args, **kwargs):
        queryset = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            new_password  = serializer.data.get('new_password')
            new_confirm_password = serializer.data.get('new_confirm_password')
            if new_confirm_password == new_password:
                if not queryset.check_password(old_password):
                    return Response({"old_password": "Wrong password."},status=status.HTTP_400_BAD_REQUEST)
                queryset.set_password(serializer.data.get("new_password"))
                queryset.save()
                return Response({"status":"success","response":"Password Sucessfully Updated"})
            else:
                return Response({'message':"confirm password did't match"})            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
