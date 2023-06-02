# Generated by Django 4.0.3 on 2023-06-02 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0005_locationvo_closet_name_locationvo_section_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='locationvo',
            name='closet_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='locationvo',
            name='import_href',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='locationvo',
            name='section_number',
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='locationvo',
            name='shelf_number',
            field=models.PositiveSmallIntegerField(),
        ),
    ]