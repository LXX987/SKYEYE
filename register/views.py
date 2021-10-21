from django.shortcuts import render
from django.http import HttpResponse


def registerPage(request):
    #return render(request, "register.html", {})
    #return render(request, "entrance.html", {})
    #return render(request, "hall.html", {})
    #return render(request, "imageDetail.html", {})
    #return render(request, "images.html", {})
    #return render(request, "myImages.html", {})
    return render(request, "predict.html", {})