import { Scroll } from "lucide-react";
import NoItems from "./no-items.component";
import PostCard from "./post-card.component";
import type { PostDto } from "@/utils/types/post";
import PostCardSkeleton from "./post-card-skeleton.component";

interface PostListProps {
  posts: PostDto[];
  loading: boolean;
  skeletons?: number;
  onRefresh?: () => void;
}

const PostList = ({
  posts,
  loading,
  skeletons = 10,
  onRefresh,
}: PostListProps) => {
  if (loading) {
    return (
      <div className="flex-3 space-y-10">
        {Array.from({ length: skeletons }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (posts.length == 0) {
    return (
      <NoItems
        icon={Scroll}
        title="No Posts"
        description="There are no posts. New posts will appear here."
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <div className="flex-3 space-y-10">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} link />
      ))}
    </div>
  );
};

export default PostList;
