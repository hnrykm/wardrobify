from django.contrib import admin
from .models import Hats


@admin.register(Hats)
class HatsAdmin(admin.ModelAdmin):
    pass
