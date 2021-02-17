# MailSaaS

The most amazing SaaS application the world has ever seen!

## Installation

Setup a virtualenv and install requirements:

```bash
python3 -m venv env
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```

## Running server

```bash
python manage.py runserver
```
```bash
yarn run dev-watch
```

## Building front-end

To build JavaScript and CSS files, first install npm packages:

```bash
npm install
```

Then to build (and watch for changes locally) just run:

```bash
npm run dev-watch
```

## Running Celery

Celery can be used to run background tasks. To run it you can use:

```bash
celery -A mail worker -l INFO
```

<!-- ## Google Authentication Setup

To setup Google Authentication, follow the [instructions here](https://django-allauth.readthedocs.io/en/latest/providers.html#google).


## Running Tests

To run tests simply run:

```bash
./manage.py test
```

Or to test a specific app/module:

```bash
./manage.py test apps.utils.tests.test_slugs
```


On Linux-based systems you can watch for changes using the following:

```bash
ack --python | entr python ./manage.py test
``` -->
