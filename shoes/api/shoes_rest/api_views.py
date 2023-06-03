from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Shoes, BinVO
import json


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href",
        "id",
        "closet_name",
        "bin_number",
        "bin_size",

        ]

class ShoeListEncoder(ModelEncoder):
    model= Shoes
    properties = [
        "model_name",
        "id",
        "bin",
        "manufacturer",
        "color",
        "picture_url",
    ]
    encoders={
        "bin": BinVOEncoder(),
    }


class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "bin",
        "id",
        "picture_url",
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }

@require_http_methods(["GET","POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes":shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            bin = BinVO.objects.get(id=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoes.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_shoes(request, pk):
    if request.method == "GET":
        shoe = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            if "bin" in content:
                bin = BinVO.objects.get(id=content["bin"])
                content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        Shoes.objects.filter(id=pk).update(**content)
        shoes = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoes.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})
