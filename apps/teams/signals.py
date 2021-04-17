from allauth.account.signals import user_signed_up
from django.contrib.auth import user_logged_in
from django.dispatch import receiver

from .models import Invitation
from .invitations import process_invitation, get_invitation_id_from_request


@receiver(user_signed_up)
def on_user_signed_up(request, user, **kwargs):
    """
    Adds the user to the team if there is invitation information in the URL.
    """
    invitation_id = get_invitation_id_from_request(request)
    add_user_to_team(invitation_id, user)


@receiver(user_logged_in)
def on_user_logged_in(request, user, **kwargs):
    """
    Adds the user to the team if there is invitation information in the URL.
    """
    invitation_id = get_invitation_id_from_request(request)
    add_user_to_team(invitation_id, user)


def add_user_to_team(invitation_id, user):
    if invitation_id:
        try:
            invitation = Invitation.objects.get(id=invitation_id)
            process_invitation(invitation, user)
        except Invitation.DoesNotExist:
            # for now just swallow missing invitation errors
            # these should get picked up by the form validation
            pass