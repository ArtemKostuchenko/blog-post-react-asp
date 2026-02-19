import type { CommentDto } from "@/utils/types/comment";
import CommentCardSkeleton from "./comment-card-skeleton.component";
import NoItems from "./no-items.component";
import { MessageSquare } from "lucide-react";
import CommentCard from "./comment-card.component";

interface CommentListProps {
  comments: CommentDto[];
  loading: boolean;
  skeletons?: number;
}

const CommentList = ({
  comments,
  loading,
  skeletons = 3,
}: CommentListProps) => {
  if (loading) {
    return (
      <div className="flex w-full flex-col gap-4">
        {Array.from({ length: skeletons }).map((_, index) => (
          <CommentCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (comments.length == 0) {
    return (
      <NoItems
        icon={MessageSquare}
        title="No comments "
        description="New comments will appear here."
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
