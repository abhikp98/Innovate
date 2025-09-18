from rest_framework import serializers
from .models import Enquiry, EnquiryResponse


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['subject', 'message', 'created_at', 'user', 'id']
        read_only_fields = ['id','created_at', 'user']
        ordering = ["-pk"]


# class ShopViewSerializer(serializers.ModelSerializer):
#     pass
    
    

class EnquiryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnquiryResponse
        fields = '__all__'