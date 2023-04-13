import json
import requests
from functools import wraps

from django.conf import settings

from rest_framework.response import Response

from utils.math import Math
from utils.redis import Redis

CACHE_TIME = 60 * 1


class RedisService:

    @staticmethod
    def create_email_verify_code():
        value = Math.random_number(6)
        key = 'email-verify-code-' + str(value)
        Redis.set(key, value, CACHE_TIME)
        return value

    @staticmethod
    def get_email_verify_code(code):
        value = Redis.get('email-verify-code-' + str(code))
        return value

    @staticmethod
    def remove_email_verify_code(code):
        key = 'email-verify-code-' + str(code)
        Redis.set(key, code, 0)
        return code

    def cache_send_verify_email(cache_time=CACHE_TIME):
        def decorator(f):
            @wraps(f)
            def wrapped_view(request, *args, **kwargs):
                data = request.data
                is_cached_email = Redis.get('verify-email-' + data['email'])
                if is_cached_email:
                    return Response({
                        'message':
                        f'Please wait for {CACHE_TIME} seconds and try again'
                    })
                Redis.set('verify-email-' + data['email'], data['email'],
                          CACHE_TIME)
                return f(request, *args, **kwargs)
            return wrapped_view
        return decorator

    @staticmethod
    def logout(token):
        cache_time = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
        Redis.set(
            'token-blocklist-' + str(token),
            str(token),
            cache_time
        )

    @staticmethod
    def check_token_in_blocklist(token):
        return Redis.get('token-blocklist-' + token)


class GoogleService:
    def validate(token):
        try:
            start_request = requests.get(
                'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token)
            user_info = start_request.json()
            print(user_info)
            return user_info
        except Exception as e:
            # Invalid token
            print(e)
            return None
