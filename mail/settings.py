import os
import datetime
# from decouple import config
from decouple import config
from pathlib import Path  # Python 3.6+ only
import sentry_sdk
from .dbpass import get_secret, get_s3_secret,mailgun_key
from sentry_sdk.integrations.django import DjangoIntegration
import environ
env = environ.Env()
environ.Env.read_env()

sentry_sdk.init(
    dsn="https://54a77e70d6ac40c9b834017e1c5d4df0@o423610.ingest.sentry.io/5701236",
    integrations=[DjangoIntegration()],

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,

    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True
)

env_path = Path('.') / '.env'
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'atKdSovwyebchqILGtQCobosgFuyZZqQVNMjRpZb'
# SECRET_KEY = os.getenv('SECRET_KEY')
# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = env.bool('DEBUG', default=True)
LIVE = env.bool('LIVE', default=False)
STRIPE_LIVE_MODE = env.bool('STRIPE_LIVE_MODE', default=False)

ALLOWED_HOSTS = ['*']
# CORS_ALLOWED_ORIGINS = ['*']
SITE_URL = os.environ.get("SITE_URL", "http://localhost:8000")

CORS_ALLOW_ALL_ORIGINS = True

# Application definition

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'collectfast',
    'django.contrib.staticfiles',

    'django.forms',

    'celery_progress',
    "django_celery_results",
    'django_crontab',
    'django_celery_beat',
    'django_extensions',
    'django_filters',
    'storages',

]

# Put your third-party apps here
THIRD_PARTY_APPS = [

    # 'django_pipedrive',

    'corsheaders',
    # stripe integration
    'djstripe',
    # 'salesforce',

]

PEGASUS_APPS = [
    'apps.pegasus',
    'django_google.apps.DjangoGoogleConfig',
]

# Put your project-specific apps here
PROJECT_APPS = [
    # 'apps.subscriptions.apps.SubscriptionConfig',
    'apps.users.apps.UserConfig',
    'apps.web',
    'apps.campaign',
    'apps.campaignschedule.apps.CampaignscheduleConfig',
    'apps.teams.apps.TeamConfig',
    'apps.integration',
    "apps.unsubscribes",

    'apps.mailaccounts',
    'apps.subscriptions',
    'apps.dashbaord',

    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',

    'django.contrib.sites',

    'allauth',  # allauth account/registration management
    'allauth.account',
    'rest_auth.registration',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',

    'oauth2_provider',
    'social_django',
    'rest_framework_social_oauth2',
]

if LIVE:
    DJANGO_APPS = ['livereload'] + DJANGO_APPS

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PEGASUS_APPS + PROJECT_APPS

SITE_ID = 1
AUTH_USER_MODEL = 'users.CustomUser'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

if LIVE:
    MIDDLEWARE = MIDDLEWARE + ['livereload.middleware.LiveReloadScript']

ROOT_URLCONF = 'mail.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'apps.web.context_processors.project_meta',
                # this line can be removed if not using google analytics
                'apps.web.context_processors.google_analytics_id',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'mail.wsgi.application'

FORM_RENDERER = 'django.forms.renderers.TemplatesSetting'

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'USER': 'postgres',
            'PASSWORD': 'U3KhQu1fASewbBz4xNIg',
            'HOST': 'mailerrize-test.cluster-cti2gmro8z63.us-east-2.rds.amazonaws.com',
            'PORT': '5432',
            'NAME': 'mailtest'
            # 'ENGINE': 'django.db.backends.postgresql_psycopg2',
            # 'USER': 'doadmin',
            # 'PASSWORD': 'k6sehj7ohh30gjfy',
            # 'HOST': 'db-postgresql-sfo2-27945-do-user-8602625-0.b.db.ondigitalocean.com',
            # 'PORT': '25060',
            # 'NAME': 'mail'
        }
    }

if not DEBUG:
    dbpassw = get_secret()['password']
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'USER': 'postgres',
            'PASSWORD': dbpassw,
            'HOST': 'mailerrize-prod.cluster-cti2gmro8z63.us-east-2.rds.amazonaws.com',
            'PORT': '5432',
            'NAME': 'mailerrizeprod'

        }
    }


GOOGLE_AUTH_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

# Auth / login stuff

# Django recommends overriding the user model even if you don't think you need to because it makes
# future changes much easier.
# LOGIN_REDIRECT_URL = '/'

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Allauth setup
REST_SESSION_LOGIN = True
REST_USE_JWT = True

ACCOUNT_ADAPTER = 'apps.teams.adapter.AcceptInvitationAdapter'
ACCOUNT_ADAPTER = 'apps.users.adapter.CustomUserAccountAdapter'

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_UNIQUE_EMAIL = True
# ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = False
ACCOUNT_SESSION_REMEMBER = True
ACCOUNT_LOGOUT_ON_GET = True
ACCOUNT_EMAIL_VERIFICATION = 'none'

ACCOUNT_FORMS = {
    'signup': 'apps.teams.forms.TeamSignupForm',
}

AUTHENTICATION_BACKENDS = (
    # Google OAuth2
    'social_core.backends.google.GoogleOAuth2',

    # django-rest-framework-social-oauth2
    'rest_framework_social_oauth2.backends.DjangoOAuth2',

    # Django
    'django.contrib.auth.backends.ModelBackend'
)

# enable social login
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Calcutta'

USE_I18N = True
USE_L10N = True
USE_TZ = True
DATETIME_FORMAT = '%d-%m-%Y %H:%M:%S'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/


if DEBUG == False:
    # aws settings
    s3key = get_s3_secret()['s3key']
    s3secret = get_s3_secret()['s3secret']
    AWS_ACCESS_KEY_ID = s3key
    AWS_SECRET_ACCESS_KEY = s3secret
    AWS_STORAGE_BUCKET_NAME = "mailerrize"
    AWS_DEFAULT_ACL = 'public-read'
    AWS_S3_FILE_OVERWRITE = True
    # AWS_S3_CUSTOM_DOMAIN = f'mailerrize.s3.amazonaws.com'
    AWS_S3_CUSTOM_DOMAIN = 'cdn.mailerrize.com'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=3600'}
    # s3 static settings
    AWS_LOCATION = ''
    STATIC_URL = 'https://cdn.mailerrize.com/'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    COLLECTFAST_STRATEGY = "collectfast.strategies.boto3.Boto3Strategy"

    # valor
    AWS_PRIVATE_BUCKET = 'mailerrize-recipients'
    DEFAULT_FILE_STORAGE = 'mail.storage_backends.PrivateMediaStorage'
    # end
else:
    STATIC_URL = '/static/'
    # STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

    STATIC_ROOT = os.path.join(BASE_DIR, 'static_root')
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    MEDIA_URL = '/media/'
# STATIC_URL = '/static/'

STATICFILES_DIRS = [
    "static", os.path.join(BASE_DIR, 'static'),
    "media", os.path.join(BASE_DIR, 'media'),
    "assets", os.path.join(BASE_DIR, 'assets'),
]

# uncomment to use manifest storage to bust cache when file change
# note: this may break some image references in sass files which is why it is not enabled by default
# STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'


# Email setup

# use in development
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"
ANYMAIL = {
    "MAILGUN_API_KEY": mailgun_key()['mailgun'],
    "MAILGUN_SENDER_DOMAIN": "m.mailerrize.com",
}
SERVER_EMAIL = "noreply@mailerrize.com"
DEFAULT_FROM_EMAIL = "noreply@mailerrize.com"


# DRF config
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',

        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100,

    # 'DEFAULT_FILTER_BACKENDS': (
    #     'django_filters.rest_framework.DjangoFilterBackend',

    # ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
    ),
}

# Celery setup (using redis)

CELERY_BROKER_URL = 'redis://redis-2.qy64ux.ng.0001.use2.cache.amazonaws.com:6379/0'
CELERY_RESULT_BACKEND = 'django-db'

CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

CELERY_TIMEZONE = "UTC"

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'apps.users.serializer.UserDetailsSerializer',
}

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'apps.users.serializer.RegisterSerializer',
}

OLD_PASSWORD_FIELD_ENABLED = True

# Pegasus config

# replace any values below with specifics for your project
PROJECT_METADATA = {
    'NAME': 'MailSaaS',
    'URL': 'http://localhost:8000',
    'DESCRIPTION': 'The most amazing SaaS application the world has ever seen!',
    'IMAGE': 'https://upload.wikimedia.org/wikipedia/commons/2/20/PEO-pegasus_black.svg',
    'KEYWORDS': 'SaaS, django',
    'CONTACT_EMAIL': 'elon.musk@localhost:8000',
}

# ADMINS = [('Elon Musk', 'elon.musk@localhost:8000')]

GOOGLE_ANALYTICS_ID = ''  # replace with your google analytics ID to connect to Google Analytics

# Stripe config

# modeled to be the same as https://github.com/dj-stripe/dj-stripe
STRIPE_LIVE_PUBLIC_KEY = os.environ.get("STRIPE_LIVE_PUBLIC_KEY", "pk_live_51IVficFbQLoSmd7v2o3qLmlOIpoCN7cKDIHPN8Z26DHhWJvQAIlTQDIUXvZxBuCVb0fLwOZBYKeM4PqGvLWPKJSm000m6X58zR")
STRIPE_LIVE_SECRET_KEY = os.environ.get("STRIPE_LIVE_SECRET_KEY", "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")
STRIPE_TEST_PUBLIC_KEY = os.environ.get("STRIPE_TEST_PUBLIC_KEY", "pk_test_51IVficFbQLoSmd7vg9rB8RNwKCcFybomiLqNuF4mQ7GuYDdYUPMBLt56fYXIuzwWmV9HCnTTx4KkboentixP32AQ00xfnQvGN2")
STRIPE_TEST_SECRET_KEY = os.environ.get("STRIPE_TEST_SECRET_KEY", "sk_test_51IVficFbQLoSmd7vvOga0aBn2Ad8yvK9M3JtK16iTnu0mBgRBQFhfCBNTnE82WTYTVTMh5BmYdxLk0ZOviWOVotc00LqbiZSSn")
# Change to True in production

# Get it from the section in the Stripe dashboard where you added the webhook endpoint
# or from the stripe CLI when testing
DJSTRIPE_WEBHOOK_SECRET = os.environ.get('DJSTRIPE_WEBHOOK_SECRET', "whsec_xxx")

DJSTRIPE_FOREIGN_KEY_TO_FIELD = 'id'  # change to 'djstripe_id' if not a new installation
DJSTRIPE_USE_NATIVE_JSONFIELD = True  # change to False if not a new installation

# JWT settings
JWT_AUTH = {
    'JWT_ENCODE_HANDLER':
        'rest_framework_jwt.utils.jwt_encode_handler',

    'JWT_DECODE_HANDLER':
        'rest_framework_jwt.utils.jwt_decode_handler',

    'JWT_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_payload_handler',

    'JWT_PAYLOAD_GET_USER_ID_HANDLER':
        'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',

    'JWT_RESPONSE_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_response_payload_handler',

    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_GET_USER_SECRET_KEY': None,
    'JWT_PUBLIC_KEY': None,
    'JWT_PRIVATE_KEY': None,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': False,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=2),
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

    'JWT_AUTH_HEADER_PREFIX': 'jwt',
    'JWT_AUTH_COOKIE': None,
}


# Google configuration
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '828042189691-4ceuofidhr2van7pt9vhpa4hmdei9d0q.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'gWLcoyt4SvNRhpb_blSLJKmq'

# Define SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE to get extra permissions from Google.
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
    'apps.users.pipeline.get_avatar',
)

CORS_ALLOW_ALL_ORIGINS = True

PYTRACKING_CONFIGURATION = {
    "base_open_tracking_url": SITE_URL + "/mailaccounts/tracking/open/",
    "base_click_tracking_url": SITE_URL + "/mailaccounts/tracking/click/",
}

# PYTRACKING_CONFIGURATION = {
#     "base_open_tracking_url": "https://app.mailerrize.com" + "/mailaccounts/tracking/open/",
#     "base_click_tracking_url": "https://app.mailerrize.com" + "/mailaccounts/tracking/click/",
# }

DEFAULT_WARMUP_FOLDER = "mailerrize"
DEFAULT_RAMPUP_INCREMENT = 3
DEFAULT_WARMUP_MAX_CNT = 20
DEFAULT_WARMUP_MAIL_SUBJECT_SUFFIX = "• mailerrize"

EMAIL_SENDING_LIMIT = 10
