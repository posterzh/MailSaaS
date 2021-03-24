from celery import shared_task


@shared_task(bind=True)
def test_email(self):
    print(f'Request: {self.request!r}')
