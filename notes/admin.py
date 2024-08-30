from django.contrib import admin
from .models import Note ,Project
# Register your models here.

class NoteAdmin(admin.ModelAdmin):
  list_display = ['title', 'catagory', 'created_at' ,'updated_at']

admin.site.register(Note, NoteAdmin)
admin.site.register(Project)