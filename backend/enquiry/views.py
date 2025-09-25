from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, ListAPIView
from .serializers import EnquirySerializer, EnquiryListSerializer
from .models import Enquiry, EnquiryResponse

# Create your views here.

class NewEnquiryView(ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = EnquirySerializer
    queryset = Enquiry.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        quiry = super().get_queryset()
        return quiry.filter(user=self.request.user)
    

class EnquiryListView(ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = EnquiryListSerializer
    queryset = EnquiryResponse.objects.all()

    def get_queryset(self):
        query = super().get_queryset()
        request_id = self.request.GET.get("request_id")
        return query.filter(enquiry=request_id)

