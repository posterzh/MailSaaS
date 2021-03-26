import urllib
from io import BytesIO
from django.core.files import File

def get_avatar(backend, strategy, details, response, user=None, *args, **kwargs):
    url = None
    if backend.name == 'facebook':
        url = "http://graph.facebook.com/%s/picture?type=large"%response['id']
    if backend.name == 'twitter':
        url = response.get('profile_image_url', '').replace('_normal','')
    if backend.name == 'google-oauth2':
        url = response['picture']
    if url:
        response = urllib.request.urlopen(url)
        io = BytesIO(response.read())
        user.avatar.save('profile_pic_{}.jpg'.format(user.id), File(io))
        user.save()
    return {}
