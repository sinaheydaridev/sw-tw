from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from rest_framework_simplejwt.tokens import AccessToken

from .validations import phone_regex


USER_ROLE = (
    ('user', "user"),
    ('admin', "admin"),
    ('superuser', "superuser"),
)


class UserModelManager(BaseUserManager):
    def create_user(self, email, username, date_of_birth, phone_number, password, fullname, is_verify=False, role='user'):
        if not email:
            raise ValueError('Users must have an email address.')
        if not username:
            raise ValueError('Users must have an username')
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            phone_number=phone_number,
            fullname=fullname,
            date_of_birth=date_of_birth,
            is_verify=is_verify,
            role=role
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, fullname, date_of_birth, phone_number, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            fullname=fullname,
            phone_number=phone_number,
            date_of_birth=date_of_birth,
            password=password,
        )
        user.role = 'superuser'
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=200, unique=True)
    phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True, null=True)
    username = models.CharField(max_length=200, unique=True)
    avatar = models.ImageField(
        default='users/avatar.png', blank=True, null=True)
    fullname = models.CharField(max_length=200, blank=True, null=True)
    bio = models.CharField(max_length=800, blank=True, null=True)
    date_of_birth = models.DateTimeField()
    date_joined = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10, choices=USER_ROLE, default='user')
    is_verify = models.BooleanField(default=False)

    objects = UserModelManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'date_of_birth']

    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return self.username

    def make_token(self):
        expiration = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
        access_token = AccessToken.for_user(self)
        return {
            'userToken': access_token,
            'exp': expiration.total_seconds(),
        }

    def invalidate_token(self):
        print('ttt')
        return AccessToken.set_exp()
