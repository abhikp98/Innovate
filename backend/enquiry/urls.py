from django.urls import path
from .views import NewEnquiryView, EnquiryListView
from django.contrib import admin


urlpatterns = [
    path('enquiry/', NewEnquiryView.as_view(), name='enquiry'),
    path('admin/', admin.site.urls),
    path('enquirylist/', EnquiryListView.as_view(), name="enquirylist"),

]