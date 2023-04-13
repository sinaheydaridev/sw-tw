from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User

# @receiver(post_save, sender=User)
# def post_create_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
