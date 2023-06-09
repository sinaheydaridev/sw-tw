# Generated by Django 4.0.4 on 2022-04-24 13:14

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_remove_clientuuid_user_alter_clientuuid_expire_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientuuid',
            name='user',
            field=models.OneToOneField(default='1', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='clientuuid',
            name='expire',
            field=models.DateTimeField(default=datetime.datetime(2022, 7, 23, 13, 14, 1, 527099, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='userverify',
            name='confirmation_code',
            field=models.IntegerField(default='604899'),
        ),
    ]
