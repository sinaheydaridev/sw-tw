# Generated by Django 4.0.4 on 2022-04-24 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_userverify_confirmation_code_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userverify',
            name='confirmation_code',
            field=models.IntegerField(default='503933'),
        ),
        migrations.AlterField(
            model_name='userverify',
            name='expire',
            field=models.DateTimeField(default='1650796658.828077'),
        ),
    ]
