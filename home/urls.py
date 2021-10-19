from django.contrib import admin
from django.urls import path
from home.views import listorders

urlpatterns = [
    path('orders/', listorders),
]