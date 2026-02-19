import useAuth from "@/hooks/auth";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import {
  commentSchema,
  type CommentFormData,
} from "@/utils/validations/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "./ui/spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  commentActions,
  selectCommentMutateStatus,
} from "@/utils/store/comment/comment.slice";
import { useEffect } from "react";

interface CommentFormProps {
  postId: string;
  commentId?: string;
  content?: string;
  edit?: boolean;
  onSuccess?: () => void;
}

const CommentForm = ({
  postId,
  commentId,
  content,
  edit = false,
  onSuccess,
}: CommentFormProps) => {
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    isInitialized,
    isLoading: isAuthLoading,
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content,
    },
  });
  const mutateStatus = useAppSelector(selectCommentMutateStatus);

  useEffect(() => {
    if (mutateStatus === "success") {
      onSuccess?.();
      reset();
      dispatch(commentActions.resetStatus());
    }
  }, [mutateStatus]);

  const isLoading = mutateStatus === "loading";

  const onSubmit = (data: CommentFormData) => {
    if (edit && commentId) {
      dispatch(
        commentActions.updateComment({
          commentId,
          ...data,
        }),
      );
    } else {
      dispatch(
        commentActions.addCommentToPost({
          postId,
          ...data,
        }),
      );
    }
  };

  if (isAuthLoading || (isInitialized && !isAuthenticated)) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="comment">Your comment</FieldLabel>
          <Textarea
            id="comment"
            className="min-h-25 resize-none"
            {...register("content")}
          />
        </Field>
        <Button
          type="submit"
          disabled={!isValid || (!edit && !isDirty) || isLoading}
        >
          {isLoading && <Spinner data-icon="inline-start" />}
          {edit ? "Save" : "Leave"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default CommentForm;
