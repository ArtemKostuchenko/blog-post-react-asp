import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <Card className="relative w-full pt-0">
      <Skeleton className="aspect-video w-full" />
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 max-w-62 w-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 max-w-137 w-full" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default PostCardSkeleton;
