from django.contrib import admin

# Register your models here.
from enquiry import models
from users import models as umodels
admin.site.register(models.Enquiry)
admin.site.register(models.EnquiryResponse)
admin.site.register(umodels.User)