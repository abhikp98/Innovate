from django.urls import path
from django.urls import include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('request-otp/', views.SendOtpView.as_view(), {'post': 'request_otp'}),
    path('verify-otp/', views.VerifyOtpView.as_view(), {'post': 'verify_otp'}),
    path('private/', views.PrivateView.as_view(), name='private_view'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]