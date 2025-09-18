from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from verify import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


class SendOtpView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        phone_number = request.data.get('phone')
        print(phone_number, "phonenumber is")
        otp = generate_otp()
        if not phone_number:
            return Response({"error": "Phone number is required"}, status=400)
        else:
            user, created = User.objects.update_or_create(
                phone_number=phone_number,
                defaults={'is_verified': False, 'otp': otp}
            )
            print(f"Generated OTP for {user.phone_number}: {otp}")  # Replace with actual OTP sending logic
            return Response({"message": f"OTP {otp} sent successfully"}, status=status.HTTP_200_OK)


class VerifyOtpView(APIView):
    permission_classes=[AllowAny]

    def post(self, request, *args, **kwargs):
        phone_number = request.data.get('phone')
        otp = request.data.get('otp')
        
        if not phone_number or not otp:
            return Response({"error": "Phone number and OTP are required"}, status=400)
        
        try:
            user = User.objects.get(phone_number=phone_number, otp=otp)
            user.is_verified = True
            user.otp = None  # Clear OTP after verification
            user.save()
            refresh = RefreshToken.for_user(user)
            context = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'OTP verified successfully'
            }
            print(context)
            return Response(context, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Invalid phone number or OTP"}, status=status.HTTP_400_BAD_REQUEST)

class PrivateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        return Response({"message": f"This is a private view accessible only to authenticated users.{user}"}, status=status.HTTP_200_OK)
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=400)
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
