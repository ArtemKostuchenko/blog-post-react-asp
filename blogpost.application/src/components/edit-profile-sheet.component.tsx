import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/user";
import {
  updateUserSchema,
  type UpdateUserFormData,
} from "@/utils/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Spinner } from "./ui/spinner";
import { userActions } from "@/utils/store/user/user.slice";
import { useAppDispatch } from "@/hooks/redux";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { UserIcon } from "lucide-react";

const EditProfileSheet = () => {
  const dispatch = useAppDispatch();
  const { open, closeModal, handleOpenChange } = useModal(
    ModalType.EDIT_PROFILE,
  );
  const { user, mutateStatus } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      nickname: user?.nickname,
    },
  });

  useEffect(() => {
    if (mutateStatus === "success") {
      closeModal();
      dispatch(userActions.resetStatus());
    }
  }, [mutateStatus, closeModal, dispatch]);

  const isLoading = mutateStatus === "loading";

  const onSubmit = (data: UpdateUserFormData) => {
    dispatch(userActions.updateUser(data));
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form
          id="edit-profile-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid flex-1 auto-rows-min gap-6 px-4"
        >
          <div className="grid gap-3">
            <Field>
              <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="nickname"
                  {...register("nickname")}
                  placeholder="Enter your nickname"
                />
                <InputGroupAddon>
                  <UserIcon />
                </InputGroupAddon>
              </InputGroup>
              <FieldError>{errors.nickname?.message}</FieldError>
            </Field>
          </div>
        </form>
        <SheetFooter>
          <Button type="submit" form="edit-profile-form" disabled={isLoading}>
            {isLoading && <Spinner data-icon="inline-start" />}
            Save changes
          </Button>
          <SheetClose asChild disabled={isLoading}>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfileSheet;
