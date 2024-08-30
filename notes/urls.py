# notes/urls.py (ملف URLs للتطبيق)
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'notes', views.NoteViewSet, basename='note')

urlpatterns = [
    path('', include(router.urls)),
    path('sprints-search/', views.search_sprints, name='sprints-search'),
    path('register/', views.RegisterUserView.as_view(), name='register'),
    path('<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('projects/<int:project_id>/notes/', views.notes_list, name='notes_list'),
    
]
