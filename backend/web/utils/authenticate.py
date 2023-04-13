from django.conf import settings
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from users.services import RedisService


class IsAdminUserAuthentication(permissions.BasePermission):
    edit_methods = ("PUT", "POST", "DELETE")

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'superuser'

    def has_object_permission(self, request, view, obj):
        return request.user.role == 'superuser'


class IsUserAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        # get token from Cookie or header
        if header is None:
            raw_token = request.COOKIES.get(
                settings.SIMPLE_JWT['AUTH_COOKIE']) or None
        else:
            raw_token = self.get_raw_token(header)
        # end
        if raw_token is None:
            # user not authenticate
            return None
        validated_token = self.get_validated_token(raw_token)
        is_token_in_blocklist = RedisService.check_token_in_blocklist(str(validated_token))
        if is_token_in_blocklist:
            return None
        return self.get_user(validated_token), validated_token