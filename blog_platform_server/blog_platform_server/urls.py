from django.contrib import admin
from django.urls import include, path
from .controller.hello_controller import hello
from .controller.hello_controller import db

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', hello),
    path('db/', db),
]