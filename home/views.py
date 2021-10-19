from django.shortcuts import render
from django.http import HttpResponse


def listorders(request):
    return render(request, "./template/index.html", {})
