from django.urls import path
from .  import views



from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('',views.getRoutes),
    path('signup/',views.signup,name='signup'),
    path('token/', views.MyTokenObtainPairview.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('postimage/<int:id>',views.PostImage,name='postimage_view'),
    path('getusers/',views.getusers,name='getusers_view'),
    path('getpost/',views.getPost,name='getpost_view'),
    path('getvideos/',views.getVideos,name='getvideos_views'),
    path('editprofile/<int:id>',views.editProfile,name='editprofile_views'),
    path('changePassword/<int:id>',views.ChangePassword,name="changepassword_views"),
    path('allusers/',views.allUsers,name='allusers_views'),
    path('followuser/<int:id>',views.followUser,name='followuser_views'),
    path('followers/',views.Followers,name='follower_view'),
    path('isfollowing/<int:id>',views.IsFollowing,name='isfollowing_views'),
    path('unfollow/<int:id>',views.unFollow,name='unfollow_views'),
    path('userpost/',views.userPost,name='userpost_views'),
    path('uservideo/',views.userVideo,name='uservideo_views'),
    path('deletepost/<int:id>',views.deletePost,name='deletepost_views'),
    path('deletevideo/<int:id>',views.deleteVideo,name='deletevideo_views'),
    path('liked/',views.userLiked,name='userliked_views'),
    path('getlike/',views.getLikes,name='getLikes_views'),
    path('getvideolike/',views.getvideolike,name='getvideos_views'),
    path('videoliked/',views.video_Liked,name='videoliked_views'),
    path('comment/',views.Commented,name='comment_views'),
    path('getcomment/',views.getComment,name='getcomment_views'),
    path('videocomment/',views.getVideoComment,name='getVideoComment_views'),
    path('deletecomment/',views.deletecomment,name='deletecomment_views'),
    path('confirming/<int:id>/<int:follow_user>',views.conFirming,name='confirming_views'),
    path('savepost/',views.savePost,name='savepost_views'),
    path('getvideouser/<int:id>',views.getvideo_user,name='getvideo_user_views'),
    path('getissaved/',views.is_savedVideo,name='is_saved_views'),
    path('videosaved/',views.videosaved,name='videosaved_views'),
    path('unsavepost/<int:id>',views.unSavePost,name='unsavepost_views'),
    path('unsavevideo/<int:id>',views.unsaveVideo,name="unsaveVideo_name"),
    path('getsaved/',views.getSavedPost,name='getSavedPost_views'),
    path('getnotification/<int:id>',views.getNotification,name='getnotification_views'),
    path('mostlikes/',views.mostLikes,name='mostLikes_views'),
    path('mostvideoslikes/',views.mostLikesVideo,name='mostLikesVideo_views'),
    path('clearnotification/',views.clearNotification,name='clearNotification_views'),
    path('editpost/<int:id>',views.editPost,name='editpost_views'),
    path('updatingpost/<int:id>',views.updatingPost,name='updatingPost_views'),
    path('reportpost/<int:id>',views.reportPost,name='reportPost_views')
]
