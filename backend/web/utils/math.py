import string
import random


class Math():

    @staticmethod
    def random_string(limit=20, chars=string.ascii_lowercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(limit))

    @staticmethod
    def random_number(limit=20, chars=string.digits):
        return ''.join(random.choice(chars) for _ in range(limit))