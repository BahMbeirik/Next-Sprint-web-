from rest_framework import serializers
from .models import Note ,Project
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    


class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Note
    fields = ('id', 'title', 'body', 'slug', 'catagory','project', 'owner', 'created_at', 'updated_at')

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'
        extra_kwargs = {
            'owner': {'read_only': True}  
        }



class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2'] 
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self, **kwargs):
        email = self.validated_data['email']  
        username = self.validated_data['username']
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match'})

        user = User(
            username=username,
            email=email, 
        )
        user.set_password(password)
        user.save()
        return user