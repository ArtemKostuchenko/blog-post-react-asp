import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";
import DeleteDialog from "./delete-dialog.component";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  postActions,
  selectPostMutateStatus,
} from "@/utils/store/post/post.slice";
import type { PostDto } from "@/utils/types/post";

const PostDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const { open, data, handleOpenChange, closeModal } = useModal<PostDto>(
    ModalType.DELETE_POST,
  );
  const mutateState = useAppSelector(selectPostMutateStatus);
  const isLoading = mutateState === "loading";

  const canDelete = data?.id ? true : false;

  const handleCloseModal = () => closeModal();

  const handleDeleteComment = () => {
    if (!canDelete || !data || isLoading) {
      return;
    }

    dispatch(postActions.deletePost(data.id));
  };

  return (
    <DeleteDialog
      title="Delete post?"
      description=" This will permanently delete this post. Do you really want to do this?"
      canDelete={canDelete}
      loading={isLoading}
      open={open}
      onOpenChanged={handleOpenChange}
      onCancel={handleCloseModal}
      onDelete={handleDeleteComment}
    />
  );
};

export default PostDeleteDialog;
