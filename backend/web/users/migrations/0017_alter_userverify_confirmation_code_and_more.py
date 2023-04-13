# Generated by Django 4.0.4 on 2022-04-24 18:24

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_alter_userverify_confirmation_code_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userverify',
            name='confirmation_code',
            field=models.IntegerField(default='464902'),
        ),
        migrations.AlterField(
            model_name='userverify',
            name='expire',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 24, 18, 29, 17, 480668, tzinfo=utc)),
        ),
    ]