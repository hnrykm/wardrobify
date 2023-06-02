from django.urls import path
from .api_views import api_list_hats, api_show_hats

urlpatterns = [
    path("hats/", api_list_hats, name="api_list_hats"),
    path("hats/<int:pk>/", api_show_hats, name="api_show_hats"),
    path("hats/edit/<int:pk>/", api_show_hats, name="api_edit_hats"),
]
