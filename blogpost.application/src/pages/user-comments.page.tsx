import CommentCardSkeleton from "@/components/comment-card-skeleton.component";
import CommentCard from "@/components/comment-card.component";
import CommentDeleteDialog from "@/components/comment-delete-dialog.component";
import CommentEditDialog from "@/components/comment-edit-dialog.component";
import NoItems from "@/components/no-items.component";
import OrderForm from "@/components/order-form.component";
import PaginationItems from "@/components/pagination.component";
import ResetQueryButton from "@/components/reset-query-button.component";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useQueryParams from "@/hooks/query-params";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  commentActions,
  selectCommentFetchStatus,
  selectUserComments,
} from "@/utils/store/comment/comment.slice";
import { MessageSquare, MessageSquareQuote } from "lucide-react";
import { useEffect } from "react";

const UserCommentsPage = () => {
  const dispatch = useAppDispatch();
  const { defaultQueryParams } = useQueryParams();
  const userComments = useAppSelector(selectUserComments);
  const fetchStatus = useAppSelector(selectCommentFetchStatus);
  const isLoading = fetchStatus === "loading";

  useEffect(() => {
    dispatch(commentActions.fetchUserComments(defaultQueryParams));
  }, [dispatch, defaultQueryParams]);

  if (isLoading && userComments.comments.length === 0) {
    return (
      <div className="sm:my-10 my-5 space-y-6">
        <Skeleton className="w-50 h-6" />
        <div className="grid md:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <CommentCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (userComments.comments.length === 0) {
    return (
      <NoItems
        icon={MessageSquare}
        title="You have no comments"
        description="Comments you add will appear here"
      />
    );
  }
  return (
    <div className="flex-1 w-full flex flex-col gap-6 sm:my-10 my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquareQuote />
          <h4 className=" scroll-m-20 text-lg font-semibold tracking-tight">
            My Comments
          </h4>
          <Badge variant="outline">{userComments.totalComments}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <OrderForm />
          <ResetQueryButton />
        </div>
      </div>
      <div className="flex-1">
        <div className="grid md:grid-cols-3 gap-5">
          {userComments.comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              editable
              removable
            />
          ))}
        </div>
      </div>
      <PaginationItems totalPages={userComments.totalPages} />
      <CommentEditDialog />
      <CommentDeleteDialog />
    </div>
  );
};

export default UserCommentsPage;
