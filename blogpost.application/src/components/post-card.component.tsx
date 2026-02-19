import type { PostDto } from "@/utils/types/post";
import { Badge } from "./ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getResourceUrl, getShortName } from "@/utils/func";
import NoImage from "@/assets/no-image.jpg";
import {
  CalendarArrowUp,
  Edit2,
  MessageCircleMore,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router";
import PostCardSkeleton from "./post-card-skeleton.component";
import { Button } from "./ui/button";
import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";

interface PostCardProps {
  post?: PostDto;
  link?: boolean;
  skeleton?: boolean;
  editable?: boolean;
  removable?: boolean;
  totalComments?: number;
}

interface PostImageProps {
  src: string;
  alt: string;
}

const PostImage = ({ src, alt }: PostImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className="relative z-20 aspect-video w-full object-cover rounded-t-xl"
    />
  );
};

const PostCard = ({
  post,
  link = false,
  skeleton = false,
  removable = false,
  editable = false,
  totalComments = 0,
}: PostCardProps) => {
  const { openModal } = useModal<PostDto>();

  if (skeleton || !post) {
    return <PostCardSkeleton />;
  }

  const handleEditDialog = () => openModal(ModalType.EDIT_POST, post);

  const handleDeleteDialog = () => openModal(ModalType.DELETE_POST, post);

  const postImage = post.image ? getResourceUrl(post.image.url) : NoImage;

  return (
    <Card className="h-full relative w-full pt-0 group">
      {(removable || editable) && (
        <div className="absolute z-25 top-4 right-4 transition-all group-hover:opacity-100 sm:opacity-0 opacity-100 flex items-center gap-2">
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
        </div>
      )}

      {link && (
        <Link to={`/posts/${post.id}`}>
          <PostImage src={postImage} alt={post.title} />
        </Link>
      )}
      {!link && <PostImage src={postImage} alt={post.title} />}
      <CardHeader>
        <CardTitle>
          {link && <Link to={`/posts/${post.id}`}>{post.title}</Link>}
          {!link && post.title}
        </CardTitle>
        <CardDescription>{post.content}</CardDescription>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              {post.user.avatar && (
                <AvatarImage
                  src={getResourceUrl(post.user.avatar.url)}
                  alt={post.user.nickname}
                />
              )}
              <AvatarFallback className="rounded-lg">
                {getShortName(post.user.nickname)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{post.user.nickname}</span>
            </div>
          </div>
          <div>
            <Badge variant="secondary" className="bg-green-50">
              <MessageCircleMore data-icon="inline-start" />
              <span className="font-bold">{totalComments}</span>
            </Badge>
            <Badge variant="secondary" className="bg-sky-50">
              <CalendarArrowUp data-icon="inline-start" />
              {format(post.createdAt, "dd MMMM yyy")}
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PostCard;
