from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from ..service.signup_service import signup


def signup_controller(request):
    json = serializers.serialize('json', signup(request))
    return HttpResponse(json, content_type='application/json')