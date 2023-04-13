from django.contrib.auth import authenticate

from rest_framework import serializers, exceptions

from users.services import GoogleService

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'last_login']


class CreateUserSerializer(serializers.ModelSerializer):
    confirmed_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        exclude = ['last_login', 'date_joined']

    def validate(self, attrs):
        password = attrs['password']
        confirmed_password = attrs['confirmed_password']
        if confirmed_password != password:
            raise serializers.ValidationError(
                {'password_match': 'Passwords must math.'})
        return attrs


class AccountLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs['email']
        password = attrs['password']
        user = authenticate(email=email, password=password)
        if not user:
            raise exceptions.AuthenticationFailed(
                'Email or password is incorrect.')
        return attrs


class AccountSignUpSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DictField()

    class Meta:
        model = User
        fields = ['email', 'phone_number', 'username', 'date_of_birth',
                  'password']

                  
class AccountEditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'role', 'is_verify', 'last_login']
        extra_kwargs = {
            'username': {
                'required': False
            },
            'fullname': {
                'required': False
            },
            'bio': {
                'required': False
            },
            'avatar': {
                'required': False
            },
            'email': {
                'required': False
            },
            'phone_number': {
                'required': False
            },
            'date_of_birth': {
                'required': False
            },
        }

class AccountChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    password = serializers.CharField()
    confirmed_password = serializers.CharField()

    def validate(self, attrs):
            password = attrs['password']
            confirmed_password = attrs['confirmed_password']
            if confirmed_password != password:
                raise serializers.ValidationError(
                    {'password_match': 'Passwords must math.'})
            return attrs

class AccountSendResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        user = User.objects.filter(email=value)
        if not user.exists():
            raise serializers.ValidationError('Invalid email')
        return value

class AccountResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    confirmed_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
            password = attrs['password']
            confirmed_password = attrs['confirmed_password']
            if confirmed_password != password:
                raise serializers.ValidationError(
                    {'password_match': 'Passwords must math.'})
            return attrs
    
class AccountGoogleSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']
    
class AccountGoogleLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    