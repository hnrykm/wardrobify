# Generated by Django 4.0.3 on 2023-06-02 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='binvo',
            name='bin_number',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='binvo',
            name='bin_size',
            field=models.PositiveSmallIntegerField(default=1),
        ),
    ]
