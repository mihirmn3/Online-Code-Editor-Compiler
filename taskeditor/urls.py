from django.urls import path
from . import views
urlpatterns = [
    path('', views.index),
    path('submit/', views.submit),
    path('save/', views.savecode),
    path('run/', views.compile),
    path('select/', views.loadcode)
]
