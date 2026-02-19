import CommentList from "@/components/comment-list.component";
import PaginationItems from "@/components/pagination.component";
import PostList from "@/components/post-list.component";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useQueryParams from "@/hooks/query-params";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useScrollToTop from "@/hooks/scroll";
import {
  commentActions,
  selectCommentFetchStatus,
  selectRecentComments,
} from "@/utils/store/comment/comment.slice";
import {
  postActions,
  selectPostFetchStatus,
  selectPosts,
} from "@/utils/store/post/post.slice";
import { MessageSquare } from "lucide-react";
import { useEffect } from "react";

const HomePage = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const recentComments = useAppSelector(selectRecentComments);
  const postFetchStatus = useAppSelector(selectPostFetchStatus);
  const commentFetchStatus = useAppSelector(selectCommentFetchStatus);
  const { defaultQueryParams } = useQueryParams();

  useEffect(() => {
    dispatch(postActions.fetchPosts(defaultQueryParams));
  }, [dispatch, defaultQueryParams]);

  useEffect(() => {
    dispatch(commentActions.fetchRecentComments());
  }, [dispatch]);

  const handleRefreshPosts = () => {
    dispatch(postActions.fetchPosts(defaultQueryParams));
  };

  return (
    <div className="flex flex-1 md:flex-row flex-col sm:my-10 my-5 gap-6">
      <div className="flex-5">
        <PostList
          posts={posts.posts}
          onRefresh={handleRefreshPosts}
          loading={postFetchStatus === "loading"}
        />
        <PaginationItems totalPages={posts.totalPages} />
      </div>
      <div className="flex-2 ">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare data-icon="inline-start" className="w-5 h-5" />
              Recent Comments
            </CardTitle>

            <ScrollArea className="mt-5 w-full h-full max-h-150">
              <div className="pr-5">
                <CommentList
                  comments={recentComments.comments}
                  loading={commentFetchStatus === "loading"}
                />
              </div>
            </ScrollArea>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
