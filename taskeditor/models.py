from django.db import models
# Create your models here.


class richeditor(models.Model):
    name = models.CharField(max_length=300, default="")
    para = models.TextField()

    def __str__(self):
        return self.name
