import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { CommentDto } from "@/utils/types/comment";
import CommentCardSkeleton from "./comment-card-skeleton.component";
import { format } from "date-fns";
import { getResourceUrl, getShortName } from "@/utils/func";
import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Edit2, Trash2 } from "lucide-react";
import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";

interface CommentCardProps {
  comment?: CommentDto;
  skeleton?: boolean;
  editable?: boolean;
  removable?: boolean;
}

const CommentCard = ({
  comment,
  skeleton,
  removable = false,
  editable = false,
}: CommentCardProps) => {
  const { openModal } = useModal<CommentDto>();

  if (skeleton || !comment) {
    return <CommentCardSkeleton />;
  }

  const handleEditDialog = () => openModal(ModalType.EDIT_COMMENT, comment);
  const handleDeleteDialog = () => openModal(ModalType.DELETE_COMMENT, comment);

  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar className="size-8">
          {comment.user.avatar?.url && (
            <AvatarImage src={getResourceUrl(comment.user.avatar.url)} />
          )}
          <AvatarFallback>{getShortName(comment.user.nickname)}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{comment.user.nickname}</ItemTitle>

        <ItemDescription>
          {format(comment.createdAt, "dd MMMM yyy hh:mm:ss")}
        </ItemDescription>
        <p className="truncate">{comment.content}</p>
        {comment.post && (
          <Link to={`/posts/${comment.post.id}`} className="block">
            <Badge variant="outline" className="truncate">
              {comment.post.title}
            </Badge>
          </Link>
        )}
      </ItemContent>
      {(removable || editable) && (
        <ItemActions className="flex flex-row items-start h-full">
          {editable && (
            <Button size="icon-sm" variant="outline" onClick={handleEditDialog}>
              <Edit2 />
            </Button>
          )}
          {removable && (
            <Button
              size="icon-sm"
              variant="outline"
              onClick={handleDeleteDialog}
            >
              <Trash2 />
            </Button>
          )}
        </ItemActions>
      )}
    </Item>
  );
};

export default CommentCard;
