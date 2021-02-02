import os

os.system("python manage.py makemigrations campaign integration pegasus subscriptions campaignschedule teams users web")
os.system("python manage.py migrate")
os.system("python manage.py runserver")