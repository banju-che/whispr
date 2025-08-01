# config/routing.py
from django.urls import re_path
from chat.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/$', ChatConsumer.as_asgi()),
]
