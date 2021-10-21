from django.db import models


# User Database
class User(models.Model):
    ID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    email = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=11)
    # register_time = models.DateTimeField()
