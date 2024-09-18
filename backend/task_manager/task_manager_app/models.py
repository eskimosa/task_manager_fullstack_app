from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Tag(models.Model):
    COLOR_CHOICES_DICT = {
        'Red': '#FF0000',
        'Green': '#00FF00',
        'Blue': '#0000FF',
        'Yellow': '#FFFF00',
        'Orange': '#FFA500',
        'White': '#FFFFFF',
    }

    name = models.CharField(max_length=250)
    color = models.CharField(max_length=7, default='#FFFFFF')

    def __str__(self):
        return self.name


class Task(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    tag = models.ManyToManyField(Tag, blank=False)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
