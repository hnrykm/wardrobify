from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True, default=" ")
    # closet_name = models.CharField(max_length=100)
    # section_number = models.PositiveSmallIntegerField()
    # shelf_number = models.PositiveSmallIntegerField()


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

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_hats", kwargs={"id": self.id})
