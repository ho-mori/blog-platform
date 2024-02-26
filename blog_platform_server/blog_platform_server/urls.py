from django.contrib import admin
from django.urls import include, path
from .controller.hello_controller import helloController

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', helloController),
]