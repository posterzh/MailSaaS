import json

import djstripe
import stripe
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.mail import mail_admins
from django.db import transaction
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.http import require_POST
from djstripe.enums import PlanInterval
from djstripe.models import Product, Subscription
from djstripe import settings as djstripe_settings
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.utils.decorators import catch_stripe_errors
from apps.web.meta import absolute_url
from .decorators import redirect_subscription_errors
from .helpers import get_friendly_currency_amount
from .metadata import get_active_products_with_metadata, \
    get_product_and_metadata_for_subscription, ACTIVE_PLAN_INTERVALS, get_active_plan_interval_metadata, \
    get_product_with_metadata, TEAMMATE_PRODUCT, EMAIL_PRODUCT

from apps.teams.decorators import team_admin_required, login_and_team_required
from apps.teams.models import Team
from ..users.models import CustomUser


class ProductWithMetadataAPI(APIView):

    def get(self, request, *args, **kw):
        products_with_metadata = get_active_products_with_metadata()
        return Response(
            data=[p.to_dict() for p in products_with_metadata]
        )


@redirect_subscription_errors
@login_required
def subscription(request, subscription_holder=None):
    subscription_holder = subscription_holder if subscription_holder else request.user
    if subscription_holder.has_active_subscription():
        return _view_subscription(request, subscription_holder)
    else:
        return _upgrade_subscription(request, subscription_holder)


def _get_payment_metadata_from_request(request):
    return {
        'user_id': request.user.id,
        'user_email': request.user.email,
    }


@login_required
def subscription_success(request):
    return _subscription_success(request, request.user)


def _subscription_success(request, subscription_holder):
    stripe.api_key = djstripe_settings.STRIPE_SECRET_KEY
    if not subscription_holder.has_active_subscription():
        subscription = subscription_holder.subscription
        if not subscription:
            messages.error(
                request,
                "Oops, it looks like there was a problem processing your payment. "
                "Please try again, or get in touch if you think this is a mistake."
            )
        else:
            # 3D-Secure workflow hopefully completed successfully,
            # re-sync the subscription and hopefully it will be active
            subscription.sync_from_stripe_data(subscription.api_retrieve())

    if subscription_holder.has_active_subscription():
        subscription_name = get_product_and_metadata_for_subscription(
            subscription_holder.active_stripe_subscription
        ).metadata.name
        messages.success(request, f"You've successfully signed up for {subscription_name}. "
                                  "Thanks so much for the support!")
        # notify admins when someone signs up
        mail_admins(
            subject=f"Hooray! Someone just signed up for a {subscription_name} subscription!",
            message="Email: {}".format(request.user.email),
            fail_silently=True,
        )

    assert isinstance(subscription_holder, Team)
    redirect = reverse('subscriptions:team_subscription_details', args=[subscription_holder.slug])

    return HttpResponseRedirect(redirect)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
# @catch_stripe_errors
# @transaction.atomic
def create_customer(request, subscription_holder=None):
    """
    Create a Stripe Customer and Subscription object and map them onto the subscription_holder

    Expects the inbound POST data to look something like this:
    {
        'email': 'cory@example.com',
        'userId': '23',
        'payment_method': 'pm_1GGgZaIYTEadrA0y0tthZ5UH'
    }
    """
    subscription_holder = subscription_holder if subscription_holder else request.user
    request_body = json.loads(request.body.decode('utf-8'))
    user_id = int(request_body['user_id'])
    email = request_body['user_email']
    assert request.user.id == user_id
    assert request.user.email == email

    payment_method = request_body['payment_method']
    plan_id = request_body['plan_id']
    stripe.api_key = djstripe_settings.STRIPE_SECRET_KEY

    # first sync payment method to local DB to workaround https://github.com/dj-stripe/dj-stripe/issues/1125
    payment_method_obj = stripe.PaymentMethod.retrieve(payment_method)
    djstripe.models.PaymentMethod.sync_from_stripe_data(payment_method_obj)

    # create customer objects
    # This creates a new Customer in stripe and attaches the default PaymentMethod in one API call.
    customer = stripe.Customer.create(
      payment_method=payment_method,
      email=email,
      invoice_settings={
        'default_payment_method': payment_method,
      },
    )

    # create the local customer object in the DB so the subscription can use it
    djstripe.models.Customer.sync_from_stripe_data(customer)

    # create subscription
    subscription = stripe.Subscription.create(
      customer=customer.id,
      items=[
        {
          'plan': plan_id,
        },
      ],
      expand=['latest_invoice.payment_intent', 'pending_setup_intent'],
    )
    djstripe_subscription = djstripe.models.Subscription.sync_from_stripe_data(subscription)

    # set subscription object on the subscription holder
    subscription_holder.subscription = djstripe_subscription
    subscription_holder.save()

    data = {
        'customer': customer,
        'subscription': subscription
    }
    return JsonResponse(
        data=data,
    )


def _get_subscription_urls(subscription_holder):
    # get URLs for subscription helpers
    url_bases = [
        'create_customer',
        'create_stripe_portal_session',
    ]

    def _construct_url(base):
        return reverse(f'subscriptions:{base}')

    return {
        url_base: _construct_url(url_base) for url_base in url_bases
    }


@login_required
def subscription_demo(request, subscription_holder=None):
    subscription_holder = subscription_holder if subscription_holder else request.user
    return render(request, 'subscriptions/demo.html', {
        'active_tab': 'subscription_demo',
        'subscription': subscription_holder.active_stripe_subscription,
        'product': get_product_and_metadata_for_subscription(
            subscription_holder.active_stripe_subscription
        ),
        'subscription_urls': _get_subscription_urls(subscription_holder)
    })


@login_required
def subscription_gated_page(request, subscription_holder=None):
    subscription_holder = subscription_holder if subscription_holder else request.user
    if not subscription_holder.has_active_subscription():
        return render(request, 'subscriptions/subscription_required.html')
    else:
        return render(request, 'subscriptions/subscription_gated_page.html')


@team_admin_required
def team_subscription(request, team_slug):
    return subscription(request, subscription_holder=request.team)


@team_admin_required
def team_subscription_success(request, team_slug):
    return _subscription_success(request, subscription_holder=request.team)


@team_admin_required
@require_POST
def team_create_stripe_portal_session(request, team_slug):
    return create_stripe_portal_session(request, request.team)


@team_admin_required
@require_POST
@catch_stripe_errors
@transaction.atomic
def team_create_customer(request, team_slug):
    return create_customer(request, request.team)


@login_and_team_required
def team_subscription_demo(request, team_slug):
    return subscription_demo(request, request.team)


@login_and_team_required
def team_subscription_gated_page(request, team_slug):
    return subscription_gated_page(request, subscription_holder=request.team)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def stripe_info(request):
    subscription_holder: CustomUser = request.user

    has_active_subscription = subscription_holder.has_active_subscription()

    data = {
        'stripe_api_key': djstripe_settings.STRIPE_PUBLIC_KEY,
        'has_active_subscription': has_active_subscription,
    }
    return JsonResponse(data=data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def subscription_details(request):
    subscription_holder: CustomUser = request.user

    if not subscription_holder.has_active_subscription():
        data = {
            'error': 'No active subscription.'
        }
        return JsonResponse(data=data)

    active_subscription: Subscription = subscription_holder.active_stripe_subscription

    # To make it work without webhook in localhost
    active_subscription = djstripe.models.Subscription.sync_from_stripe_data(active_subscription.api_retrieve())

    data = {
        'friendly_payment_amount': get_friendly_currency_amount(
            active_subscription.plan.amount * active_subscription.quantity,
            active_subscription.plan.currency
        ),
        'quantity': active_subscription.quantity,
        'start_date': active_subscription.start_date.strftime('%B %d, %Y'),
        'current_period_end': active_subscription.current_period_end.strftime('%B %d, %Y'),
        'subscription_urls': _get_subscription_urls(subscription_holder),
    }
    return JsonResponse(data=data)


def _view_subscription(request, subscription_holder):
    """
    Show user's active subscription
    """
    assert subscription_holder.has_active_subscription()
    data = {
        'subscription': subscription_holder.active_stripe_subscription,
        'subscription_urls': _get_subscription_urls(subscription_holder),
        'friendly_payment_amount': get_friendly_currency_amount(
            subscription_holder.active_stripe_subscription.plan.amount,
            subscription_holder.active_stripe_subscription.plan.currency,
        ),
        'product': get_product_and_metadata_for_subscription(subscription_holder.active_stripe_subscription),
    }
    return JsonResponse(data=data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def upgrade_subscription(request):
    subscription_holder: CustomUser = request.user

    teammate_product = get_product_with_metadata(TEAMMATE_PRODUCT)
    email_product = get_product_with_metadata(EMAIL_PRODUCT)

    data = {
        'teammate_product': teammate_product.to_dict(),
        'email_product': email_product.to_dict(),
        'subscription_urls': _get_subscription_urls(subscription_holder),
        'payment_metadata': _get_payment_metadata_from_request(request),
    }

    return JsonResponse(data=data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_stripe_portal_session(request, subscription_holder=None):
    subscription_holder = subscription_holder if subscription_holder else request.user

    current_url = request.data['current_url']

    stripe.api_key = djstripe_settings.STRIPE_SECRET_KEY
    if not subscription_holder.subscription or not subscription_holder.subscription.customer:
        messages.error(request, _("Whoops, we couldn't find a subscription associated with your account!"))
        data = {
            'error': "Whoops, we couldn't find a subscription associated with your account!"
        }
        return JsonResponse(data=data)

    session = stripe.billing_portal.Session.create(
        customer=subscription_holder.subscription.customer.id,
        return_url=request.build_absolute_uri(current_url),
    )

    data = {
        'session_url': session.url
    }
    return JsonResponse(data=data)