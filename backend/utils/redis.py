from django.core.cache import cache


class Redis:
    @staticmethod
    def set(key, value, timeout=None):
        return cache.set(key, value, timeout)

    @staticmethod
    def get(key):
        get_key = cache.get(key)
        if get_key:
            return get_key
        return None