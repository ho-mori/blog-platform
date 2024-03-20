from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from ..service.hello_service import helloService
from ..service.hello_service import dbService

def hello(request):
    return HttpResponse(helloService("Hello World"))

def db(request):
    users_json = serializers.serialize('json', dbService(request))
    return HttpResponse(users_json, content_type='application/json')

