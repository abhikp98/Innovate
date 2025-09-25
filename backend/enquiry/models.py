from django.db import models
from users.models import Shops, User

class Enquiry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enquiries')
    subject = models.CharField(max_length=255)
    message = models.TextField()
    # image = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Enquiry from {self.user.phone_number} - {self.subject}"


class EnquiryResponse(models.Model):
    enquiry = models.ForeignKey(Enquiry, on_delete=models.CASCADE, related_name='responses')
    response_text = models.TextField()
    responded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Shops, on_delete=models.CASCADE)

    def __str__(self):
        return f"Response to {self.enquiry.subject} - {self.response_text[:50]}"