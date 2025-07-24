# accounts/serializers.py
from rest_framework import serializers
from .models import CustomUser
from djoser.serializers import UserCreateSerializer


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'name', 'is_active', 'is_staff', 'date_joined']


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'name', 'password', 're_password')
