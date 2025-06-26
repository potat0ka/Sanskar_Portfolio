"""
Portfolio app URL configuration
"""
from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('', views.home, name='home'),
    path('download-cv/', views.download_cv, name='download_cv'),
]