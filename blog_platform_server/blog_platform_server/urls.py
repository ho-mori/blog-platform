from django.contrib import admin
from django.urls import include, path
from .controller.hello_controller import hello
from .controller.hello_controller import db
from .controller.signup_controller import signup_controller

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', hello),
    path('db/', db),
    path('signup/', signup_controller),
]