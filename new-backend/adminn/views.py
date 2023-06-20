from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from datetime import datetime, timedelta

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from connects.api.serializers import UserSerializer
from connects.api.serializers import PostSerializer
from connects.api.serializers import ReportSerializer
from connects.api.serializers import VideoSerializer

from connects.models import MyUser
from connects.models import Post
from connects.models import Report
from connects.models import Video

# Create your views here.


class MyTokenObtainPairSerializers(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        if user.is_superuser:
            token = super().get_token(user)
            token['username'] = user.username
            return token
        else:
            return Response('username is  jhuyjgbjbhj not valid')
        
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializers



@api_view(['GET'])
def getUsers(request):
    print("succesfully camedd")
    user_ = MyUser.objects.all()
    serializer = UserSerializer(user_ , many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def blockUser(request,id):
    user_ = MyUser.objects.get(id=id)
    if user_.is_active:
        print("Logic Working")
        user_.is_active = False
        status = "Blocked"
        user_.save()
    else:
        print("User is Unblocked")
        user_.is_active = True
        status = "UnBlocked"
        user_.save()
    return Response({"status": f"User {status} successfully."})

@api_view(['POST'])
def deleteUser(request,id):
    user_ = MyUser.objects.get(id=id)
    status = "deleted"
    user_.delete()
    return Response({"status": f"User {status} successfully."})

@api_view(['GET'])
def allPost(request):
    post = Post.objects.all()
    serializer = PostSerializer(post, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def allVIideos(request):
    videos = Video.objects.all()
    serializers = VideoSerializer(videos, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def get_Reports(request):
    reports = Report.objects.all().order_by('-id')
    serializers = ReportSerializer(reports, many=True)
    return Response(serializers.data)

@api_view(['POST'])
def reportIssues(request):
    reportId = request.data['report_id']
    report = Report.objects.get(id=reportId)
    report.delete()
    status = 'Issue Solved'
    return Response({"status":f"{status} successfully"})

# @api_view(['GET'])
# def allPost(request):
#     current_week_start = datetime.now().date().isocalendar()[1]
#     previous_week_start = current_week_start - 1

#     current_week_posts = Post.objects.filter(created_at__week=current_week_start)
#     previous_week_posts = Post.objects.filter(created_at__week=previous_week_start)

#     current_week_serializer = PostSerializer(current_week_posts, many=True)
#     previous_week_serializer = PostSerializer(previous_week_posts, many=True)

#     return Response({
#         'current_week_data': current_week_serializer.data,
#         'previous_week_data': previous_week_serializer.data
#     })
