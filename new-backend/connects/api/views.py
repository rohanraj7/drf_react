from django.http import JsonResponse
from rest_framework.response import Response

from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.utils import timezone


from rest_framework import status
from connects.models import Friend, MyUser, Post,Notification,Like,Comment,Saved,Video,VideoLike,videoSaved,Report,VideoComment
from .serializers import PostSerializer, UserSerializer, FollowingSerializer, LikeSerializer, CommentSerializer, SavedSerializer, NotificationSerializer,VideoSerializer,VideoLikeSerializer,VideoSavedSerializer,VideoCommentSerializers,ReportSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

class MyTokenObtainPairSerializers(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        if user.is_active:
            token = super().get_token(user)
            # add custom claims
            token['username'] = user.username
            # token[]

            return token
        else:
            return Response('username is  jhuyjgbjbhj not valid')


class MyTokenObtainPairview(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializers



@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]
    return Response(routes)



@api_view(['POST'])
def signup(request):
    username = request.data['username']
    phoneno = request.data['phoneno']
    email = request.data['email']
    password = request.data['password']
    firstname = request.data['firstname']
    lastname = request.data['lastname']
    if MyUser.objects.filter(username = username):
        return Response('username not available', status=status.HTTP_401_UNAUTHORIZED)
    if MyUser.objects.filter(email = email):
        return Response("Already register with this email",status=status.HTTP_406_NOT_ACCEPTABLE)
    MyUser.objects.create(username=username,email=email,password=make_password(password),phoneno=phoneno,first_name=firstname,last_name=lastname)
    user__ = MyUser.objects.all()
    return Response({'status':'success'}) 

# @api_view(['POST'])
# def PostImage(request,id):
#     try:
#         print("Enters HEREE EEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
#         video_ = request.data['video'] 
#         print(video_,"The Video is This")
#         desc_ = request.data['description']
#         print(desc_,"The Description")
#         user_ = MyUser.objects.get(id=id)
#         print(user_,"The User is This ")
#         video = Video.objects.create(user=user_,video=video_,description=desc_)
#         print("VIDEO UPLOAD",video)
#         serializer = VideoSerializer(video, many=False)
#         return Response(serializer.data)
#     except:
#         print("NOT EFFECTING")
#         img = request.data['image']
#         desc = request.data['description']
#         user = MyUser.objects.get(id=id)
#         post = Post.objects.create(user=user,image = img, description = desc)
#         serializer = PostSerializer(post, many=False)
#         return Response(serializer.data)

@api_view(['POST'])
def PostImage(request, id):
    video_ = request.data.get('video')
    if video_ and video_ != 'undefined':
        desc_ = request.data['description']
        user_ = MyUser.objects.get(id=id)
        video = Video.objects.create(user=user_, video=video_, description=desc_)
        serializer = VideoSerializer(video, many=False)
        return Response(serializer.data)
    else:
        img = request.data['image']
        desc = request.data['description']
        user = MyUser.objects.get(id=id)
        post = Post.objects.create(user=user, image=img, description=desc)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)
    
@api_view(['PUT'])
def updatingPost(request,id):
    try:
        post_id = request.data['postid']
        post = Post.objects.get(id=post_id)
        if request.data['image'] is None:
            post.image = post.image
        if request.data['description'] is None:
            post.description = post.description
        post.image = request.data['image']
        post.description = request.data['description']
        status = 'updated'
        post.save()
        return Response({"status": f"user {status} successfully."})
    except:
        video_id = request.data['video_id']
        video = Video.objects.get(id=video_id)
        if request.data['video'] is None:
            video.video = video.video
        if request.data['description'] is None:
            video.description = video.description
        video.video = request.data['video']
        video.description = request.data['description']
        status = 'updated'
        video.save()
        return Response({'status':f"user {status} successfully"})

@api_view(['POST'])
def reportPost(request,id):
    try:
        print("The ReportPost Is Reachedddddddd!")
        postid = request.data['post_Id']
        post = Post.objects.get(id=postid)
        user = MyUser.objects.get(id=id)
        print(user,"The user is Spammmmmmmmmmmmmmmmmmmmmmmmm")
        msg = request.data['msg']
        report = Report.objects.create(user=user,post=post,report_message=msg)
        report.save()
        status = 'Submitted'
        return Response({'status':f'Report {status} successfully'})
    except:
        print("The ReportPost Is CAtchinggggggg!")
        videoid = request.data['video_id']
        video = Video.objects.get(id=videoid)
        user = MyUser.objects.get(id=id)
        msg = request.data['msg']
        report = Report.objects.create(user=user,video=video,report_message=msg)
        report.save()
        status = 'Submitted'
        return Response({'status':f'Report {status} successfully'})




        
            

@api_view(['POST'])
def getusers(request):
    user = request.data['user_id']
    users = MyUser.objects.get(id=user)
    serializer = UserSerializer(users, many = False)
    return Response(serializer.data)


@api_view(['POST'])
def editPost(request,id):
    print("HELOOOOOOOOOO")
    try:
        print("HEYYYYYYYYYYYYY")
        post_id = request.data['post_id']
        postid = Post.objects.get(id=post_id,user=id)
        print(postid,"The USER IS MRRRRR")
        serializer = PostSerializer(postid, many= False)
        return Response(serializer.data)
    except:
        print("olllllllllllllll")
        video_id = request.data['video_id']
        videoid = Video.objects.get(id=video_id,user=id)
        serializer = VideoSerializer(videoid , many=False)
        return Response(serializer.data)
    


@api_view(['GET'])
def allUsers(request):
    user_ = MyUser.objects.all()
    serializer = UserSerializer(user_, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPost(request):
    posts = Post.objects.all().order_by('-id')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getVideos(request):
    videos = Video.objects.all().order_by('id')
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getvideo_user(request,id):
    videos = Video.objects.filter(id=id)
    print(videos,"Duddeeeeeeeeeeeeee")
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def userPost(request):
    user_ = request.data['user_id']
    post = Post.objects.filter(user=user_)
    serializer = PostSerializer(post, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def userVideo(request):
    user_ = request.data['user_id']
    video = Video.objects.filter(user=user_)
    serializer = VideoSerializer(video, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def editProfile(request,id):
    user_ = MyUser.objects.get(id=id)
    username = request.data['username']
    email = request.data['email']
    user_.first_name = request.data['firstname']
    user_.last_name = request.data['lastname']

    if username != user_.username:
        if MyUser.objects.filter(username = username):
            return Response('username not available' , status=status.HTTP_401_UNAUTHORIZED)
        if MyUser.objects.filter(email=email):
            return Response("Email alredy Existist", status=status.HTTP_406_NOT_ACCEPTABLE)
    user_.username = request.data['username']
    user_.email = request.data['email']
    user_.about = request.data['about']
    user_.image = request.data['profileImage']
    user_.save()
    serializer = UserSerializer(user_ , many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def ChangePassword(request, id):
    currentPassword = request.data['currentPassword']
    newPassword = request.data['newPassword']
    user = MyUser.objects.get(id=id)
    
    if not check_password(currentPassword, user.password):
        print("Wrong password")
        return Response("Invalid password", status=status.HTTP_401_UNAUTHORIZED)
    
    user.password = make_password(newPassword)
    user.save()
    print("All good!")
    return Response("Success")

@api_view(['POST'])
def followUser(request, id):
    user = MyUser.objects.get(id=id) 
    followed = request.data['to']
    follower = MyUser.objects.get(id=followed)    
    follow = Friend.objects.create(user = user, follow_user = follower)
    follow.save()
    message = user.username +'  is Started Following you '
    notification = Notification.objects.create(sender = user, receiver = follower, message = message)
    notification.save()
    return Response({"ALL GOOD BRO"})

@api_view(['GET'])
def Followers(request):
    Friends = Friend.objects.all()
    serializer = FollowingSerializer(Friends, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def IsFollowing(request,id):
    print(id,"thetargetttttttttttttttttttttttttttttttttttttttttttt valueeeeeeeeeeeeee")
    user_ = Friend.objects.filter(user=id)
    print(user_,"The present values")
    serializer = FollowingSerializer(user_, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def unFollow(request,id):
    user_ = MyUser.objects.get(id=id)
    follow_user = request.data['userId']
    following = Friend.objects.filter(user = user_ , follow_user=follow_user)
    status = "unFollowed"
    receiver = MyUser.objects.get(id=follow_user)
    print(user_,"The USERRRRRRRRRRRRRRRRRRRRRRRRRR")
    message = str(user_) + ' is UnFollowed you '
    notification = Notification.objects.create(sender = user_, receiver = receiver, message = message)
    notification.save()
    following.delete()
    return Response({"status": f"user {status} successfully."})

@api_view(['DELETE'])
def deletePost(request,id):
    print("request in deleting the post")
    user_ = MyUser.objects.get(id=id)
    post_id = request.data['postId']
    img = Post.objects.filter(user=user_,id=post_id)
    status = "Deleted"
    img.delete()
    return Response({"status": f"post {status} successfully."})


@api_view(['DELETE'])
def deleteVideo(request,id):
    user_ = MyUser.objects.get(id=id)
    video_id = request.data['videoId']
    video_id = Video.objects.filter(user=user_,id=video_id)
    status = "Deleted"
    video_id.delete()
    return Response({"status": f"video {status} successfully."})


@api_view(['POST'])
def userLiked(request):
    print(request.data ,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    try:
        like_id = request.data['liked_id']
        print(like_id,"the user is liked ")
        liked = Like.objects.filter(post=like_id)
        print(liked,"the value likedd")
        liked.delete()
        status = "like Removed"
        return Response({"status":f"User {status} succesfully"})
    except:    
        post_id = request.data['postid']
        user_id = request.data['userid']
        print(user_id,"the user is liked ->>>>>>>>>>>>>>>>>>>>>> ")
        print(post_id,"the post is liked ->>>>>>>>>>>>>>>>>>>>>> ")

        userid = MyUser.objects.get(id=user_id)
        print(userid,"the user")
        postid = Post.objects.get(id=post_id)
        print(post_id,"the post is ")
        liked = Like.objects.create(user=userid,post=postid)
        liked.save()
        status = "Liked"
        return Response({"status":f"User {status} succesfully"})
    
@api_view(['POST'])
def video_Liked(request):
    try:
        like_id = request.data['liked_id']
        liked = VideoLike.objects.filter(video=like_id)
        liked.delete()
        status = "like Removed"
        return Response({'status':f"Video {status} Successfully"})
    except:
        user_id = request.data['userId']
        video_id = request.data['videoId']
        userId = MyUser.objects.get(id=user_id)
        videoId = Video.objects.get(id=video_id)
        video = VideoLike.objects.create(user = userId, video = videoId)
        video.save()
        status = ' Liked'
        return Response({'status':f"Video {status} Successfully"})



@api_view(['GET'])
def getLikes(request):
    print("request camed in get likes")
    likes = Like.objects.all()
    serializer = LikeSerializer(likes, many=True)
    return Response(serializer.data)

from django.db.models import Count

@api_view(['GET'])
def mostLikes(request):
    print("request came in most liked get likes")
    most_liked_post = Like.objects.values('post').annotate(like_count=Count('post')).order_by('-like_count').first()

    if most_liked_post:
        post_id = most_liked_post['post']
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    # else:
    #     return Response({"message": "No likes found."})

@api_view(['GET'])
def mostLikesVideo(request):
    most_liked_post = VideoLike.objects.values('video').annotate(like_count=Count('video')).order_by('-like_count').first()
    if most_liked_post:
        video_id = most_liked_post['video']
        video = Video.objects.get(id=video_id)
        serializer = VideoSerializer(video)
        return Response(serializer.data)
    # else:
    #     return Response({"message": "No likes found."})
    




@api_view(['DELETE'])
def clearNotification(request):
    print("calling the Notification deleteeeeeeeeeeeeeeeeeee")
    noti_id = request.data['noti_id']
    noti_ = Notification.objects.get(id=noti_id)
    noti_.delete()
    status = 'Notification Deleted'
    return Response({'status':f"{status} Successfully"})



@api_view(['GET'])
def getvideolike(request):
    print("REquesting For the Videossssssssssssssssssssss")
    videos = VideoLike.objects.all()
    serializer = VideoLikeSerializer(videos , many=True)
    return Response(serializer.data)



@api_view(['Post'])
def Commented(request):
    try:
        print("requestcame on comment section")
        user_ = request.data['userId']
        post_ = request.data['postId']
        print("NOT AT ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
        comment_ = request.data['comment']
        print(user_,"user found in comment")
        print(post_,"post_ found in comment")
        print(comment_,"comment_ found in comment")
        userid = MyUser.objects.get(id=user_)
        postid = Post.objects.get(id=post_)
        commented = Comment.objects.create(comment = comment_ , post = postid , user = userid)
        status = "Commented"
        commented.save()
        return Response({"status":f" {status} succesfully"})
    except:
        user_ = request.data['userId']
        video_ = request.data['video_id']
        comment_ = request.data['comment']
        userid = MyUser.objects.get(id=user_)
        video = Video.objects.get(id=video_)
        commented = VideoComment.objects.create(comment = comment_ , video = video , user = userid)
        status = 'Commented'
        commented.save()
        return Response({"status":f"{status} succesfully"})


@api_view(['GET'])
def getVideoComment(request):
    print("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
    video_comments = VideoComment.objects.all().order_by('id')
    print(video_comments.values(),"the valuews are the listed")
    serializer = VideoCommentSerializers(video_comments, many=True)
    print("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    return Response(serializer.data)



@api_view(['GET'])
def getComment(request):
    comments = Comment.objects.all().order_by('id')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def deletecomment(request):
    try:
        postId = request.data['post_id']
        userId = request.data['user_id']
        comment = request.data['comment']
        post_id = Post.objects.get(id=postId)
        user_id = MyUser.objects.get(id=userId)
        del_comment = Comment.objects.get(post=post_id,user=user_id,comment=comment)
        status = "Deleted"
        del_comment.delete()
        return Response({"status":f"Comment {status} succesfully"})
    except:
        video = request.data['video_id']
        userid = request.data['user_id']
        comment = request.data['comment']
        video_id = Video.objects.get(id=video)
        user_id = MyUser.objects.get(id=userid)
        del_comment = VideoComment.objects.get(video=video_id,user=user_id,comment=comment)
        status = 'Deleted'
        del_comment.delete()
        return Response({"status":f"comment {status} successfully"})


@api_view(['PUT'])
def conFirming(request,id,follow_user):
    try:
        friend = Friend.objects.get(user=id,follow_user=follow_user)
        print("Is condition true is a Friend")
        return Response(True)
    except:
        print("Is condition false is not a Friend")
        return Response(False)

@api_view(['POST'])
def savePost(request):
    try:
        id = request.data['user']
        save_ = Saved.objects.filter(id=id)
        save_.delete()
        status = 'UnSaved'
        return Response({"status":f"post {status} succesfully"})
    except:
        id = request.data['userid']
        postId = request.data['postId']
        user_ = MyUser.objects.get(id=id)
        post = Post.objects.get(id=postId)
        Save_post = Saved.objects.create(user=user_, post=post)
        Save_post.save()
        status = "Saved"
        return Response({"status":f"post {status} succesfully"})
    
@api_view(['POST'])
def videosaved(request):
    try:
        print("EWORKINGGGGGG NOT")
        id = request.data['video_Id']
        save_ = videoSaved.objects.filter(id=id)
        save_.delete()
        status = 'Removed'
        return Response({"status":f"Video {status} succesfully"})
    except:
        print("Else NOT")
        id = request.data['userId']
        videoid = request.data['videoId']
        print(videoid,"video id isssssssssss")
        user = MyUser.objects.get(id=id)
        video = Video.objects.get(id=videoid)
        print(user ,"the user is ")
        print(video ,"the video_ is ")
        save_video = videoSaved.objects.create(user = user , video = video )
        save_video.save()
        status = "saved"
        return Response({"status":f"Video {status} succesfully"})

@api_view(['PUT'])
def unsaveVideo(request,id):
    post_id = request.data['video_Id']
    user_ = MyUser.objects.get(id=id)
    video_ = Video.objects.get(id=post_id)
    saved_post = videoSaved.objects.get(user=user_ , video=video_)
    saved_post.delete()
    status = 'Post Removed'
    return Response({"status": f"Saved {status} successfully" })




@api_view(['PUT'])
def unSavePost(request,id):
    post_id = request.data['postId']
    user_ = MyUser.objects.get(id=id)
    post_ = Post.objects.get(id=post_id)
    saved_post = Saved.objects.get(user=user_,post=post_)
    saved_post.delete()
    status = 'post deleted'
    return Response({"status": f"Saved {status} successfully" }) 

@api_view(['GET'])
def getSavedPost(request):
    saved_post = Saved.objects.all()
    print(saved_post,"alll post")
    serializer = SavedSerializer(saved_post, many=True)
    return Response(serializer.data)

# @api_view(['GET'])
# def getsavedvideos(request):
#     print("HELLOO ROHAN")
#     saved_videos = videoSaved.objects.all()
#     serializer = VideoSavedSerializer(saved_videos, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def is_savedVideo(request):
    saved_videos = videoSaved.objects.all()
    serializer = VideoSavedSerializer(saved_videos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getNotification(request,id):
    print("REQUEST CAMED IN BACKEND NOTICATIONNNNNNNNNNN")
    notifi = Notification.objects.filter(receiver = id).order_by('-id')
    serializer = NotificationSerializer(notifi, many=True)
    return Response(serializer.data)



