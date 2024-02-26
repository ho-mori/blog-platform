from django.http import HttpResponse
from ..service.hello_service import helloService

def helloController(request):
    return HttpResponse(helloService("Hello World"))