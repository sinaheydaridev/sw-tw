from django.core.mail import send_mail


class Email():
    def __init__(self, subject, recipient_list, html_message):
        self.subject = subject
        self.recipient_list = recipient_list
        self.html_message = html_message

    def send(self):
        send_mail(
            subject=self.subject,
            message='',
            from_email='noreplay@email.com',
            recipient_list=self.recipient_list,
            fail_silently=False,
            html_message=self.html_message
        )
