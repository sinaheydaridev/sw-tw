# Generated by Django 4.0.4 on 2022-04-24 12:59

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_alter_clientuuid_expire_alter_clientuuid_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientuuid',
            name='user',
        ),
        migrations.AlterField(
            model_name='clientuuid',
            name='expire',
            field=models.DateTimeField(default=datetime.datetime(2022, 7, 23, 12, 59, 48, 443754, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='userverify',
            name='confirmation_code',
            field=models.IntegerField(default='658209'),
        ),
    ]
