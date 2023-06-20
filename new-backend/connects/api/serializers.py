from rest_framework.serializers import ModelSerializer
from connects.models import MyUser
from connects.models import Post
from connects.models import Friend
from connects.models import Like
from connects.models import Comment
from connects.models import Saved
from connects.models import Notification
from connects.models import Video
from connects.models import VideoLike
from connects.models import Report 
from connects.models import VideoComment

class UserSerializer(ModelSerializer):
    class Meta:
        model = MyUser
        fields = '__all__'

class PostSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Post
        fields = "__all__"

class VideoSerializer(ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Video
        fields = '__all__'

class FollowingSerializer(ModelSerializer):
    user = UserSerializer()
    follow_user = UserSerializer()
    
    class Meta:
        model = Friend
        fields = '__all__'

class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class VideoLikeSerializer(ModelSerializer):
    class Meta:
        model = VideoLike
        fields = '__all__'

class CommentSerializer(ModelSerializer):
    user = UserSerializer()
    post = PostSerializer()
    class Meta:
        model = Comment
        fields = '__all__'

class VideoCommentSerializers(ModelSerializer):
    user = UserSerializer()
    video = VideoSerializer()
    class Meta:
        model = VideoComment
        fields = '__all__'

class SavedSerializer(ModelSerializer):
    user = UserSerializer()
    post = PostSerializer()

    class Meta:
        model = Saved
        fields = '__all__'

class VideoSavedSerializer(ModelSerializer):
    user = UserSerializer()
    video = VideoSerializer()
    
    class Meta:
        model = Video
        fields = '__all__'

class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class ReportSerializer(ModelSerializer):
    user = UserSerializer()
    post = PostSerializer()
    video = VideoSerializer()
    
    class Meta:
        model = Report
        fields = '__all__'

