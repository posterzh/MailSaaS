from django.db import models

# Create your models here.



class Team(models.Model):
    name = models.CharField(max_length=200)
    team_id = models.CharField(max_length=20)
    bot_user_id = models.CharField(max_length=20)
    bot_access_token = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Contact(models.Model):
   Parameter = models.CharField(max_length=50, blank=False, null=False)
     
   def __str__(self):
        return self.Parameter