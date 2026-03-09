import useAuth from "@/hooks/auth";
import useModal from "@/hooks/modal";
import useUser from "@/hooks/user";
import { ModalType } from "@/utils/types/app";
import type { PostDto } from "@/utils/types/post";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import CommentForm from "./comment-form.component";

const CommentEditDialog = () => {
  const { open, data, handleOpenChange, closeModal } = useModal<PostDto>(
    ModalType.EDIT_COMMENT,
  );
  const { isAuthenticated } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, closeModal]);

  useEffect(() => {
    if (user && data) {
      if (user.id !== data.user.id) {
        closeModal();
      }
    }
  }, [user, data, closeModal]);

  if (!isAuthenticated || !data) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Updating a comment</DialogTitle>
          <DialogDescription>Update your comment</DialogDescription>
        </DialogHeader>
        <CommentForm
          postId=""
          commentId={data.id}
          content={data.content}
          onSuccess={closeModal}
          edit
        />
      </DialogContent>
    </Dialog>
  );
};

export default CommentEditDialog;
