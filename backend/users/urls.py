from django.urls import path
from django.urls import include
from . import views

urlpatterns = [
    path('request-otp/', views.SendOtpView.as_view(), {'post': 'request_otp'}),
    path('verify-otp/', views.VerifyOtpView.as_view(), {'post': 'verify_otp'}),
    path('logout/', views.LogoutView.as_view(), {'post': 'logout'}),
]