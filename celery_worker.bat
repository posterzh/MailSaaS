CALL venv\Scripts\activate.bat 
celery -A mail worker --loglevel=INFO