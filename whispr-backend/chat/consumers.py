# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import get_user_model
from django.db import close_old_connections
from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from rest_framework_simplejwt.authentication import JWTAuthentication

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = await self.get_user_from_token()
        if self.user is None:
            await self.close()
        else:
            await self.accept()

    async def disconnect(self, close_code):
        print(f"Disconnected: {close_code}")

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', '')

        await self.send(text_data=json.dumps({
            'message': f"{self.user.username}: {message}"
        }))

    @database_sync_to_async
    def get_user_from_token(self):
        try:
            query_string = self.scope['query_string'].decode()
            params = parse_qs(query_string)
            token = params.get('token')[0]
            validated_token = UntypedToken(token)
            jwt_auth = JWTAuthentication()
            user, _ = jwt_auth.get_user(validated_token), validated_token
            close_old_connections()
            return user
        except Exception as e:
            print(f"JWT auth failed: {e}")
            return None
