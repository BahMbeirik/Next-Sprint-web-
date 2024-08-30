from django.shortcuts import render
from rest_framework.response import Response
from notes.serializers import NoteSerializer ,ProjectSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Note ,Project
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework import status, viewsets,filters
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from .permissions import IsOwnerOrAdmin
from rest_framework.decorators import action

# Create your views here.
    
class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.none()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Project.objects.all()
        return Project.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

        

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)




@api_view(['GET'])
def notes_list(request, project_id):
    notes = Note.objects.filter(project_id=project_id)
    serializer = NoteSerializer(notes, many=True)
    return Response({'notes': serializer.data})
    

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


@api_view(['GET'])
def search_sprints(request):
    query = request.query_params.get("search")
    notes = Note.objects.filter(Q(title__icontains=query) | Q(body__icontains=query) | Q(catagory__icontains=query))
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

