from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Hats, LocationVO


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["import_href", "id"]


class HatListEncoder(ModelEncoder):
    model = Hats
    properties = [
        "id",
        "style_name",
    ]


class HatDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "id",
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        hats = Hats.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location = LocationVO.objects.get(id=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hats.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_hats(request, pk):
    if request.method == "GET":
        hats = Hats.objects.get(id=pk)
        return JsonResponse(
            hats,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            if "location" in content:
                location = LocationVO.objects.get(id=content["location"])
                content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        Hats.objects.filter(id=pk).update(**content)
        hats = Hats.objects.get(id=pk)
        return JsonResponse(
            hats,
            encoder=HatDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Hats.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
