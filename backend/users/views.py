import datetime
from django.http import JsonResponse
from django.urls import reverse
from django.conf import settings
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.decorators import method_decorator
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.middleware.csrf import get_token

from rest_framework import viewsets, generics, views
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from utils.email import Email
from utils.authenticate import IsAdminUserAuthentication, IsUserAuthentication
from utils.math import Math

from .models import User
from .services import RedisService, GoogleService
from .serializers import AccountChangePasswordSerializer, AccountEditProfileSerializer, AccountGoogleLoginSerializer, AccountGoogleSignupSerializer, AccountResetPasswordSerializer, AccountSendResetPasswordSerializer, AccountSignUpSerializer, UserSerializer, CreateUserSerializer, AccountLoginSerializer


def set_csrf_token(request):
    token = get_token(request)
    res = JsonResponse({'status': 'ok'}, safe=False)
    res.set_cookie(key='csrftoken', value=token,
                   samesite='None', secure=True, httponly=True)
    return res
# =================> Users viewset <======================================


# ####################################################################
# Admin ViewSet
# ####################################################################
class UserViewSet(viewsets.ModelViewSet):
    """
        A viewset that provides the standard user admin actions
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUserAuthentication]
    # authentication_classes = []

    @staticmethod
    def add_user(data):
        email = data['email']
        username = data['username']
        date_of_birth = data['date_of_birth']
        password = data['password']
        is_verify = data.get('is_verify', False)
        role = data.get('role', 'user')
        user = User.objects.create_user(email=email,
                                        username=username,
                                        date_of_birth=date_of_birth,
                                        password=password,
                                        is_verify=is_verify,
                                        role=role)
        return user

    def create(self, request):
        data = request.data
        serializer = CreateUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.add_user(data)
        return Response({'user_created': True})

    @action(detail=False,
            methods=['delete'],
            name='Delete Users',
            url_path='delete-all')
    def delete_users(self, request):
        data = request.data
        user_ids = data.get('user_ids', [])
        for id in user_ids:
            User.objects.get(id=id).delete()
        return Response({'delete_users': True})


# =================> Accounts view <======================================


# ####################################################################
# Login Account
# ####################################################################
class AccountLogin(generics.GenericAPIView):
    """
        Login Account
    """
    serializer_class = AccountLoginSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(email=data['email'])
        response = Response()
        token = user.make_token()
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=token["userToken"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])
        response.data = {'authentication': True}
        return response


# ####################################################################
# SignUp Account
# ####################################################################
class AccountSignUp(generics.CreateAPIView):
    """
        Create Account
    """
    serializer_class = AccountSignUpSerializer

    @staticmethod
    def signup_account(data):
        email = data['email']
        username = data['username']
        fullname = data['fullName']
        date_of_birth = data['date_of_birth']
        phone = data['phone']
        iso_date_of_birth = datetime.date(
            date_of_birth['year'], date_of_birth['month'], date_of_birth['day']).isoformat()
        password = data['password']
        user = User.objects.create_user(email=email,
                                        username=username,
                                        fullname=fullname,
                                        phone_number=phone,
                                        date_of_birth=iso_date_of_birth,
                                        password=password,
                                        is_verify=True)
        return user

    @staticmethod
    def check_confirmation_code(data):
        code = data.get('confirmationCode', 0)
        code_verify = RedisService.get_email_verify_code(code)
        if code_verify:
            return code_verify
        else:
            return None

    def create(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        response = Response()
        c_code = self.check_confirmation_code(data)
        if c_code:
            user = self.signup_account(data)
            token = user.make_token()
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=token["userToken"],
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])
            RedisService.remove_email_verify_code(c_code)
            response.data = {'signup_account': True, 'is_verify': True}
            response.status_code = 201
        else:
            response.data = {
                'signup_account': False,
                'confirmation_code': 'Invalid confirmation code.',
                'is_verify': False
            }
            response.status_code = 200

        return response

# ####################################################################
# Login Google Account
# ####################################################################


class AccountGoogleLogin(generics.GenericAPIView):
    serializer_class = AccountGoogleLoginSerializer

    def ge_user_google_data(self, token):
        try:
            return GoogleService.validate(token)
        except:
            return None

    def post(self, request):
        data = request.data
        token = data.get('google_user_token', '')
        user_data = self.ge_user_google_data(token)
        response = Response()
        if user_data:
            user = User.objects.filter(email=user_data['email']).first()
            if user is not None:
                token = user.make_token()
                response.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                    value=token["userToken"],
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(
                    ),
                    max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(
                    ),
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                )
                response.data = {'authenticated': True}
                return response
            response.data = {'authenticated': False, 'user': 'User not found'}
            response.status_code = 403
            return response
        response.data = {'authenticated': False, 'token': 'Inavalid token.'}
        response.status_code = 400
        return response

# ####################################################################
# SignUp Google Account
# ####################################################################


class AccountGoogleSignup(generics.CreateAPIView):
    serializer_class = AccountGoogleSignupSerializer

    def ge_user_google_data(self, token):
        try:
            return GoogleService.validate(token)
        except:
            return None

    @staticmethod
    def signup_account(data):
        email = data['email']
        fullname = data['name']
        username = data['given_name'].lower() + Math.random_number(5)
        iso_date_of_birth = datetime.datetime.now().isoformat()
        user = User(email=email,
                    fullname=fullname,
                    username=username,
                    date_of_birth=iso_date_of_birth,
                    is_verify=True)
        user.set_password(Math.random_string(20))
        user.save()
        return user

    def create(self, request):
        data = request.data
        token = data.get('google_user_token', '')
        user_data = self.ge_user_google_data(token)
        response = Response()
        if user_data:
            serializer = self.serializer_class(data=user_data)
            serializer.is_valid(raise_exception=True)
            user = self.signup_account(user_data)
            token = user.make_token()
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=token["userToken"],
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'])
            response.data = {'signup_account': True}
            response.status_code = 201
            return response
        response.data = {'signup_account': False, 'token': 'Invalid token.'}
        response.status_code = 400
        return response


# ####################################################################
# Account State
# ####################################################################
class AccountState(generics.GenericAPIView):
    """
        Account info (userData,cartItems,Payments,Posts, ....)
    """
    permission_classes = [IsAuthenticated]
    authentication_classes = [IsUserAuthentication]
    serializer_class = UserSerializer

    def get(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = self.serializer_class(user)
        return Response({'user': serializer.data})


# ####################################################################
# Account Send Confirmation Email Code
# ####################################################################
class AccountSendVerifyEmail(views.APIView):
    """
        Send email confirmation code
    """
    authentication_classes = [IsUserAuthentication]

    @staticmethod
    def send_email(email):
        confirmation_code = RedisService.create_email_verify_code()
        html_message = render_to_string(
            template_name='account/account_verify.html',
            context={'confirmation_code': confirmation_code})
        Email('Please check email', [email], html_message).send()

    @method_decorator(RedisService.cache_send_verify_email(),
                      name='dispatch')
    def post(self, request):
        if request.user.is_authenticated:
            user = request.user
            email = user.email
            self.send_email(email)
        else:
            data = request.data
            email = data['email']
            self.send_email(email)
            return Response({
                'message': 'We sent you an email with a verification code.',
                'sent': True
            })
        return Response({'message': 'Invalid', 'sent': False})


# ####################################################################
# Account Edit Profile
# ####################################################################
class AccountEditProfile(generics.UpdateAPIView):
    """
        Edit Account Profile
    """
    serializer_class = AccountEditProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [IsUserAuthentication]

    @staticmethod
    def check_confirmation_code(data):
        code = data.get('confirmation_code', 0)
        code_verify = RedisService.get_email_verify_code(code)
        if code_verify:
            return code_verify
        else:
            return None

    def edit(self, data, user_id):
        bio = data.get('bio', None)
        avatar = data.get('avatar', None)
        fullname = data.get('fullname', None)
        username = data.get('username', None)
        email = data.get('email', None)
        email_confirmation_code = data.get('email_confirmation_code', 0)
        phone_number = data.get('phone_number', None)
        date_of_birth = data.get('date_of_birth', None)
        avatar = data.get('avatar', None)
        account = User.objects.get(id=user_id)
        if bio:
            account.bio = bio
        if avatar:
            account.avatar = avatar
        if fullname:
            account.fullname = fullname
        if username:
            account.username = username
        if date_of_birth:
            account.date_of_birth = date_of_birth
        if avatar:
            account.avatar = avatar
        if email:
            c_code = self.check_confirmation_code(email_confirmation_code)
            if c_code:
                account.email = email
                RedisService.remove_email_verify_code()
            else:
                return Response({
                    'message': 'Invalid confirmation code.',
                    'change_email': False,
                })
        if phone_number:
            account.phone_number = phone_number
        account.save()

    def put(self, request):
        data = request.data
        print(data)
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        self.edit(data, request.user.id)
        return Response({'edit_account': True})


# ####################################################################
# Account Change Password
# ####################################################################
class AccountChangePassword(generics.GenericAPIView):
    """
        Change Password
    """
    serializer_class = AccountChangePasswordSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [IsUserAuthentication]

    def change_password(self, data):
        current_password = data['current_password']
        password = data['password']
        user = User.objects.get(id=self.request.user.id)
        if user.check_password(current_password):
            user.set_password(password)
            user.save()
            return user
        return False

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        changed_pass = self.change_password(data)
        if not changed_pass:
            return Response({
                'message': 'Current password incorrect.',
                'changed_password': False
            })
        serializer.is_valid(raise_exception=True)
        return Response({'changed_password': True})


# ####################################################################
# Account Send Reset Password Link
# ####################################################################
class AccountSendResetPassword(generics.GenericAPIView):
    """
        Send Reset Password Link
    """
    serializer_class = AccountSendResetPasswordSerializer
    authentication_classes = [IsUserAuthentication]

    def reset_link(self, user):
        current_domain = get_current_site(self.request)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        link = reverse('reset-password', kwargs={'uid': uid, 'token': token})
        absolute_link = f'http://{current_domain}{link}'
        return absolute_link

    def send_email(self, user):
        html_message = render_to_string(
            template_name='account/reset_password.html',
            context={'reset_link': self.reset_link(user)})
        Email('Reset password user', [user.email],
              html_message=html_message).send()

    def post(self, request):
        if request.user.is_authenticated:
            email = request.user.email
            user = request.user
        else:
            data = request.data
            serializer = self.serializer_class(data=data)
            serializer.is_valid(raise_exception=True)
            email = data['email']
            user = User.objects.get(email=email)
        self.send_email(user)
        return Response({
            'message': 'We have sent you a password recovery link.',
            'sent': True
        })


# ####################################################################
# Account Change Password
# ####################################################################
class AccountResetPassword(generics.GenericAPIView):
    """
        Change Password
    """
    serializer_class = AccountResetPasswordSerializer

    @staticmethod
    def get_user(uidb64, token):
        try:
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.filter(id=user_id).first()
            if not PasswordResetTokenGenerator().check_token(user, token):
                return False
            return user
        except:
            return False

    @staticmethod
    def change_password(data, user_id):
        c_password = data['password']
        user = User.objects.get(id=user_id)
        user.set_password(c_password)
        user.save()

    def get(self, request, uidb64, token):
        user = self.get_user(uidb64, token)
        if not user:
            return Response(status=307)
        return Response(status=200)

    def post(self, request, uidb64, token):
        response = Response()
        data = request.data
        serializer = self.serializer_class(data=data)
        user = self.get_user(uidb64, token)
        if not user:
            response.data = {'message': 'Invalid link.'}
        else:
            serializer.is_valid(raise_exception=True)
            self.change_password(data, user.id)
            response.data = {'message': 'Password changed successfully.'}
        return response


# ####################################################################
# Account Logout
# ####################################################################
class AccountLogout(views.APIView):
    """
        Send Reset Password Link
    """
    permission_classes = [IsAuthenticated]
    authentication_classes = [IsUserAuthentication]

    def post(self, request):
        token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        RedisService.logout(token)
        return Response({'detail': 'account success logout.'})
