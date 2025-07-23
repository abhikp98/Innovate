from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

# Create your views here.

class NewEnquiryView(CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Logic for handling new enquiry creation
        # This is a placeholder; implement your logic here
        return Response({"message": "New enquiry created successfully"}, status=201)
