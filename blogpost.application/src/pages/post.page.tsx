import CommentForm from "@/components/comment-form.component";
import CommentList from "@/components/comment-list.component";
import NoItems from "@/components/no-items.component";
import PostCardSkeleton from "@/components/post-card-skeleton.component";
import PostCard from "@/components/post-card.component";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  commentActions,
  selectCommentFetchStatus,
  selectPostComments,
} from "@/utils/store/comment/comment.slice";
import {
  selectPost,
  selectPostFetchStatus,
} from "@/utils/store/post/post.slice";
import { MessageCircleMore, Scroll } from "lucide-react";
import { useEffect } from "react";
const PostPage = () => {
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    isInitialized,
    isLoading: isAuthLoading,
  } = useAuth();
  const post = useAppSelector(selectPost);
  const postComments = useAppSelector(selectPostComments);
  const postFetchStatus = useAppSelector(selectPostFetchStatus);
  const commentFetchStatus = useAppSelector(selectCommentFetchStatus);
  const isPostLoading = postFetchStatus === "loading";
  const isCommentsLoading = commentFetchStatus === "loading";

  useEffect(() => {
    if (!isPostLoading && post) {
      dispatch(commentActions.fetchPostComments(post.id));
    }
  }, [isPostLoading, post, dispatch]);

  if (isPostLoading) {
    return (
      <div className="flex flex-1 lg:flex-row flex-col sm:my-10 my-5 gap-10">
        <div className="flex-5">
          <PostCardSkeleton />
        </div>
        <div className="flex-2 flex flex-col gap-4"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <NoItems
        icon={Scroll}
        title="Post not found"
        description="It seems that this post is not insulated or has been deleted."
      />
    );
  }

  return (
    <div className="flex flex-1 lg:flex-row flex-col sm:my-10 my-5 sm:gap-10 gap-4">
      <div className="flex-5">
        <PostCard post={post} totalComments={postComments.totalComments} />
      </div>
      <div className="flex-2 flex flex-col gap-4">
        {!isAuthLoading && isInitialized && isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle>Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <CommentForm postId={post.id} />
            </CardContent>
          </Card>
        )}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircleMore data-icon="inline-start" className="w-5 h-5" />
              Comments
              <Badge variant="outline">{postComments.totalComments}</Badge>
            </CardTitle>

            <div className="mt-5 w-full">
              <CommentList
                comments={postComments.comments}
                loading={isCommentsLoading}
              />
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default PostPage;
