import os

os.system("python manage.py makemigrations intigration campaign intigration pegasus subscriptions campaignschedule teams users web")
os.system("python manage.py migrate")
os.system("python manage.py runserver")