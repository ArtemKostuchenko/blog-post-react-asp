import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";
import type { CommentDto } from "@/utils/types/comment";
import DeleteDialog from "./delete-dialog.component";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  commentActions,
  selectCommentMutateStatus,
} from "@/utils/store/comment/comment.slice";

const CommentDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const { open, data, handleOpenChange, closeModal } = useModal<CommentDto>(
    ModalType.DELETE_COMMENT,
  );
  const mutateState = useAppSelector(selectCommentMutateStatus);
  const isLoading = mutateState === "loading";

  const canDelete = data?.id ? true : false;

  const handleCloseModal = () => closeModal();

  const handleDeleteComment = () => {
    if (!canDelete || !data || isLoading) {
      return;
    }

    dispatch(commentActions.deleteComment(data.id));
  };

  return (
    <DeleteDialog
      title="Delete comment?"
      description=" This will permanently delete this comment. Do you really want to do this?"
      canDelete={canDelete}
      loading={isLoading}
      open={open}
      onOpenChanged={handleOpenChange}
      onCancel={handleCloseModal}
      onDelete={handleDeleteComment}
    />
  );
};

export default CommentDeleteDialog;
