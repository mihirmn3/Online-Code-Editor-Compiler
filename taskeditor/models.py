from django.db import models
# Create your models here.


class richeditor(models.Model):
    para = models.TextField()
    name = models.CharField(max_length=300, default="")

    def __str__(self):
        return self.para
