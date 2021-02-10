import os

os.system("python manage.py makemigrations mailaccounts")
os.system("python manage.py makemigrations campaign")
os.system("python manage.py makemigrations campaignschedule")
os.system("python manage.py makemigrations pegasus")
os.system("python manage.py makemigrations teams")
os.system("python manage.py makemigrations integration subscriptions users web unsubscribes")

os.system("python manage.py migrate")

os.system("python manage.py runserver")
