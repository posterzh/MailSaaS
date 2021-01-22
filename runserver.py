import os

os.system("python manage.py makemigrations campaign intigration pegasus subscriptions teams users web")
os.system("python manage.py migrate")
os.system("python manage.py runserver")