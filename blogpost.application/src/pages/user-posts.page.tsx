import NoItems from "@/components/no-items.component";
import OrderForm from "@/components/order-form.component";
import PaginationItems from "@/components/pagination.component";
import PostCardSkeleton from "@/components/post-card-skeleton.component";
import PostCard from "@/components/post-card.component";
import PostDeleteDialog from "@/components/post-delete-dialog.component";
import PostDialog from "@/components/post-dialog.component";
import ResetQueryButton from "@/components/reset-query-button.component";
import SearchForm from "@/components/search-form.component";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useQueryParams from "@/hooks/query-params";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useScrollToTop from "@/hooks/scroll";
import {
  postActions,
  selectPostFetchStatus,
  selectUserPosts,
} from "@/utils/store/post/post.slice";
import { Scroll } from "lucide-react";
import { useEffect } from "react";

const UserPostsPage = () => {
  useScrollToTop();

  const dispatch = useAppDispatch();
  const { defaultQueryParams } = useQueryParams();
  const userPosts = useAppSelector(selectUserPosts);
  const fetchStatus = useAppSelector(selectPostFetchStatus);
  const isLoading = fetchStatus === "loading";

  useEffect(() => {
    dispatch(postActions.fetchUserPosts(defaultQueryParams));
  }, [dispatch, defaultQueryParams]);

  if (isLoading && userPosts.posts.length === 0) {
    return (
      <div className="sm:my-10 my-5 space-y-6">
        <Skeleton className="w-50 h-6" />
        <div className="grid md:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (userPosts.posts.length === 0) {
    return (
      <NoItems
        icon={Scroll}
        title="You have no posts"
        description="Posts you add will appear here"
      />
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6 sm:my-10 my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scroll />
          <h4 className=" scroll-m-20 text-lg font-semibold tracking-tight">
            My Posts
          </h4>
          <Badge variant="outline">{userPosts.totalPosts}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <SearchForm placeholder="Search your posts..." />
          <OrderForm />
          <ResetQueryButton />
        </div>
      </div>
      <div className="flex-1">
        <div className="grid md:grid-cols-3 gap-5">
          {userPosts.posts.map((post) => (
            <PostCard key={post.id} post={post} link editable removable />
          ))}
        </div>
      </div>
      <PaginationItems totalPages={userPosts.totalPages} />
      <PostDialog edit />
      <PostDeleteDialog />
    </div>
  );
};

export default UserPostsPage;
