from django.urls import path
from register.views import registerPage

urlpatterns = [
    path('', registerPage),
]
