import os

os.system("python manage.py makemigrations intigration campaign integration pegasus subscriptions campaignschedule teams users web unsubscribes")
os.system("python manage.py migrate")
os.system("python manage.py runserver")