from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Shoes, BinVO
import json

class ShoesListEncoder(ModelEncoder):
    model= Shoes
    properties = ["manufacturer", "model_name", "color", "picture_url"]

@require_http_methods(["GET","POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes":shoes},
            encoder=ShoesListEncoder

        )
    else:
        content = json.loads(request.body)
