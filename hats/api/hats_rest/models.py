from django.db import models


class LocationVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()


class Hats(models.Model):
    fabric = models.CharField(max_length=100)
    style_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField()
    location = models.ForeignKey(
        LocationVO,
        related_name="location",
        on_delete=models.CASCADE,
    )
