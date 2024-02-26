from django.db import models


class CommentModel(models.Model):
    commentid = models.AutoField(primary_key=True)
    postid = models.IntegerField(blank=True, null=True)
    userid = models.IntegerField(blank=True, null=True)
    content = models.TextField()
    createdat = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'blog_platform_comments'