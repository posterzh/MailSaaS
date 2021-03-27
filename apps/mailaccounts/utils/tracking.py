import pytracking
from pytracking.html import adapt_html

from mail import settings


def add_tracking(html_message, uuid, track_opens = False, track_linkclick = False):
    try:
        configuration = pytracking.Configuration(
            base_open_tracking_url=settings.PYTRACKING_CONFIGURATION["base_open_tracking_url"],
            base_click_tracking_url=settings.PYTRACKING_CONFIGURATION["base_click_tracking_url"])

        new_html_email_text = adapt_html(
            html_message, extra_metadata={"uuid": uuid},
            click_tracking=track_linkclick, open_tracking=track_opens, configuration=configuration)
        return new_html_email_text
    except Exception as ex:
        print('Exception while adding a tracking info: ', ex)
        return html_message
