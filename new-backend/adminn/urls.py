from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairView
from adminn import views



urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='Token_obtai_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='Token_refresh'),
    path('getusers/',views.getUsers,name='get_users_view'),
    path('blockuser/<int:id>',views.blockUser,name='block_user_view'),
    path('deleteuser/<int:id>',views.deleteUser,name='block_user_view'),
    path('allpost/',views.allPost,name='allpost_views'),
    path('reports/',views.get_Reports,name='get_Reports_views'),
    path('reportissues/',views.reportIssues,name='reportissues_views'),
    path('allvideos/',views.allVIideos,name='allVIideos_views')
]