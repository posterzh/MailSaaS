from datetime import timezone, datetime


def can_send_email(sending_calendar, calendar_status):
    can_send = True

    # Check time
    current_time = datetime.now(timezone.utc).time()
    if sending_calendar.start_time > current_time:
        can_send = False
    if current_time > sending_calendar.end_time:
        can_send = False

    weekday = datetime.today().weekday()
    if sending_calendar.block_days & weekday:
        can_send = False

    # Check max email count per day
    if calendar_status.sent_count >= sending_calendar.max_emails_per_day:
        can_send = False

    minutes = (datetime.now(timezone.utc) - calendar_status.updated_datetime).total_seconds() / 60.0
    if minutes < sending_calendar.minutes_between_sends:
        can_send = False

    return can_send


def calendar_sent(calendar_status):
    #   reset the today's count
    if calendar_status.updated_datetime.date() != datetime.today().date():
        calendar_status.sent_count = 0

    #   increase the sent count
    calendar_status.sent_count += 1

    #   update the timestamp
    calendar_status.updated_datetime = datetime.now(timezone.utc)

    #   save
    calendar_status.save()
