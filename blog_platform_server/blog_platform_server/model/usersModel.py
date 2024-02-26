from django.db import models
import uuid

class UserModel(models.Model):
    userid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    passwordhash = models.BinaryField()
    createdat = models.DateTimeField(auto_now_add=True)
    updatedat = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'models'  # ここでアプリケーションの名前を指定
        db_table = 'users'