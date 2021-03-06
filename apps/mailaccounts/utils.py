
from django.core import mail
from django.core.mail.backends.smtp import EmailBackend


def check_smtp_email(server, port, email, password):
    import smtplib
    import ssl

    smtp_server = server
    port = port  # For starttls
    sender_email = email
    password = password

    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        server = smtplib.SMTP(smtp_server,port)
        server.ehlo() # Can be omitted
        server.starttls(context=context) # Secure the connection
        server.ehlo() # Can be omitted
        # server.login(sender_email, password)
        login_status = server.login(sender_email, password)
        return login_status
        # TODO: Send email here
    except Exception as e:
        # Print any error messages to stdout
        print("error = ",e)
        return str(e)
    # finally:
    #     server.quit()


def send_mail_with_smtp(host, host_port, host_user, host_pass, send_to, subject, msg):
    try:
        con = mail.get_connection()
        con.open()
        mail_obj = EmailBackend(
            host=host,
            port=host_port,
            password=host_pass,
            username=host_user,
            use_tls=False,
            use_ssl=False,
            timeout=10
        )
        msg = mail.EmailMessage(
            subject=subject,
            body=msg,
            from_email=host_user,

            to=send_to,
            connection=con,
        )
        mail_obj.send_messages([msg])

        print('Message has been sent.')

        mail_obj.close()
        con.close()
        print('SMTP server closed')
        return True

    except Exception as _error:
        print('Error in sending mail >> {}'.format(_error))
        return False