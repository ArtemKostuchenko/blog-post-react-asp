import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  postActions,
  selectPostMutateStatus,
} from "@/utils/store/post/post.slice";
import { postSchema, type PostFormData } from "@/utils/validations/post";
import { Textarea } from "./ui/textarea";
import useAuth from "@/hooks/auth";
import { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2Icon } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
import { Spinner } from "./ui/spinner";
import type { PostDto } from "@/utils/types/post";
import useUser from "@/hooks/user";
import { getResourceUrl } from "@/utils/func";
import UploadFileBlock from "./upload-file-block.component";

interface PostDialogProps {
  edit?: boolean;
}

const PostDialog = ({ edit = false }: PostDialogProps) => {
  const modalType = edit ? ModalType.EDIT_POST : ModalType.POST;
  const dispatch = useAppDispatch();
  const { open, data, handleOpenChange, closeModal } =
    useModal<PostDto>(modalType);
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mutateStatus = useAppSelector(selectPostMutateStatus);
  const isLoading = mutateStatus === "loading";

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const image = watch("image");

  useEffect(() => {
    if (!isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user && data) {
      if (user.id !== data.user.id) {
        closeModal();
      }
    }
  }, [user, data]);

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);

      if (data.image) {
        setPreview(getResourceUrl(data.image.url));
      }
    }

    return () => {
      setPreview(null);
    };
  }, [data]);

  useEffect(() => {
    if (mutateStatus === "success") {
      closeModal();

      if (!edit) {
        reset();
      }
    }
  }, [mutateStatus, edit]);

  useEffect(() => {
    if (!image) {
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const onSubmit = (postData: PostFormData) => {
    if (isLoading) {
      return;
    }

    if (edit && data) {
      dispatch(
        postActions.updatePost({
          id: data.id,
          ...postData,
        }),
      );
    } else {
      dispatch(postActions.addPost(postData));
    }
  };

  const handleChooseImage = () => {
    if (isLoading) {
      return;
    }

    inputRef.current?.click();
  };

  const handleClickPreview = () => {
    if (edit) {
      handleChooseImage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setValue("image", file);
  };

  const handleResetPreview = () => {
    if (isLoading) {
      return;
    }

    if (edit && data && data.image) {
      setPreview(getResourceUrl(data.image.url));
    } else {
      setPreview(null);
    }

    setValue("image", undefined);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{edit ? "Editing a post" : "Adding a post"}</DialogTitle>
          <DialogDescription>
            {edit
              ? "Update information about your post"
              : " Enter information about your post"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} id="post-form">
          <FieldGroup>
            {!preview && (
              <UploadFileBlock
                icon={ImagePlus}
                title="Your preview image"
                description="Upload your preview image for post."
                onUploadFile={handleChooseImage}
                error={errors.image?.message?.toString()}
              />
            )}
            {preview && (
              <>
                <AspectRatio
                  ratio={16 / 9}
                  className="bg-muted rounded-lg"
                  onClick={handleClickPreview}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </AspectRatio>
                {image && (
                  <Item variant="outline">
                    <ItemContent>
                      <ItemTitle>Selected image</ItemTitle>
                      <ItemDescription className="max-w-sm truncate">
                        {image.name}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={handleResetPreview}
                      >
                        <Trash2Icon className="destructive" />
                      </Button>
                    </ItemActions>
                  </Item>
                )}
                <FieldError>{errors.image?.message?.toString()}</FieldError>
              </>
            )}

            <Field>
              <Input
                type="file"
                ref={inputRef}
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                hidden
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" {...register("title")} />
              <FieldError>{errors.title?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="title">Content</FieldLabel>
              <Textarea
                id="title"
                {...register("content")}
                className="min-h-25 max-h-60"
              />
              <FieldError>{errors.content?.message}</FieldError>
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            form="post-form"
          >
            {isLoading && <Spinner data-icon="inline-start" />}
            {edit ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
