# Generated by Django 4.0.3 on 2023-06-02 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_binvo_bin_number_binvo_bin_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='binvo',
            name='bin_number',
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='binvo',
            name='bin_size',
            field=models.PositiveSmallIntegerField(),
        ),
    ]
