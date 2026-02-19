import { Item, ItemContent, ItemMedia } from "./ui/item";
import { Skeleton } from "./ui/skeleton";

const CommentCardSkeleton = () => {
  return (
    <Item variant="outline" className="items-start">
      <ItemMedia>
        <Skeleton className=" size-8 rounded-full" />
      </ItemMedia>
      <ItemContent>
        <div className="flex flex-col gap-1">
          <Skeleton className="w-25 h-5" />
          <Skeleton className="w-35 h-5" />
        </div>
        <Skeleton className="w-full h-20" />
      </ItemContent>
    </Item>
  );
};

export default CommentCardSkeleton;
