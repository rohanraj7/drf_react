from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=150)
    phoneno = models.CharField(max_length=200)
    image = models.ImageField(null=True, upload_to= 'profile/')
    banner = models.CharField(null=True)
    about = models.CharField(null=True)

    def __str__(self):
        return self.username
    
class Post(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', default=None)
    # video = models.FileField(upload_to='videos/', default=None, null=True)
    description = models.CharField(max_length=255)
    date_posted = models.DateTimeField(default=timezone.now)

class Video(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    video = models.FileField(upload_to='videos/', default=None, null=True)
    description = models.CharField(max_length=255, null=True)
    date_posted = models.DateTimeField(default=timezone.now)

class Friend(models.Model):
    user = models.ForeignKey(MyUser, related_name='user_followers', on_delete=models.CASCADE)
    follow_user = models.ForeignKey(MyUser, related_name='user_following', on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now)


class Notification(models.Model):
    sender = models.ForeignKey(MyUser, related_name='sent_notifications', on_delete=models.CASCADE)
    receiver = models.ForeignKey(MyUser, related_name='received_notifications', on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    created = models.DateTimeField(default=timezone.now)

class Like(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class VideoLike(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.CharField()
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    comment_date = models.DateTimeField(default=timezone.now)

class VideoComment(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    comment = models.CharField()
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    comment_date = models.DateTimeField(default=timezone.now)
    

class Saved(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)   

class videoSaved(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    video = models.ForeignKey(Video , on_delete=models.CASCADE) 

class Report(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, null=True)
    report_message = models.CharField(max_length=255, null=True)
    
