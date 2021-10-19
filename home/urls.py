from django.contrib import admin
from django.urls import path
from home.views import homePage

urlpatterns = [
    path('', homePage),
]