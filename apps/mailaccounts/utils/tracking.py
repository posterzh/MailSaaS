import pytracking
from pytracking.html import adapt_html

from mail import settings


def add_tracking(html_message, uuid):
    try:
        configuration = pytracking.Configuration(
            base_open_tracking_url=settings.PYTRACKING_CONFIGURATION["base_open_tracking_url"],
            base_click_tracking_url=settings.PYTRACKING_CONFIGURATION["base_click_tracking_url"])

        new_html_email_text = adapt_html(
            html_message, extra_metadata={"uuid": uuid},
            click_tracking=True, open_tracking=True, configuration=configuration)
        return new_html_email_text
    except Exception as ex:
        print('Exception while adding a tracking info: ', ex)
        return html_message
