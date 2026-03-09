import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { format } from "date-fns";
import useUser from "@/hooks/user";
import { getResourceUrl, getShortName } from "@/utils/func";
import { Clock, MailIcon, UserIcon, UserRoundPen } from "lucide-react";
import EditProfileSheet from "@/components/edit-profile-sheet.component";
import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";
import { useRef } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { userActions } from "@/utils/store/user/user.slice";

const ProfilePage = () => {
  const { openModal } = useModal(ModalType.EDIT_PROFILE);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { user, mutateStatus } = useUser();

  const handleEditProfileSheet = () => openModal();

  if (!user) {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    dispatch(
      userActions.updateUserAvatar({
        avatar: file,
      }),
    );
  };

  const handleSelectImage = () => {
    if (mutateStatus === "loading") {
      return;
    }

    inputRef.current?.click();
  };

  return (
    <>
      <div className="w-full flex-1 flex sm:flex-row flex-col md:my-10 my-5 gap-6">
        <Card className="flex-1">
          <CardContent className="flex flex-col items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-36 h-36"
              onClick={handleSelectImage}
            >
              <Avatar className="w-35 h-35">
                {user.avatar && (
                  <AvatarImage
                    src={getResourceUrl(user.avatar.url)}
                    alt={user.nickname}
                  />
                )}
                <AvatarFallback className="rounded-lg">
                  {getShortName(user.nickname)}
                </AvatarFallback>
              </Avatar>
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              hidden
            />

            <div className="grid flex-1 text-center text-sm leading-tight">
              <span className="truncate font-medium text-xl">
                {user.nickname}
              </span>
              <span className="truncate text">{user.email}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full flex-3">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>All information about you.</CardDescription>
            <CardAction>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEditProfileSheet}
              >
                <UserRoundPen />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <FieldSet>
              <FieldGroup>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="street">Nickname</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <UserIcon />
                        <InputGroupText className="text-foreground font-normal">
                          {user.nickname}
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end"></InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="street">Email</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <MailIcon />
                        <InputGroupText className="text-foreground font-normal">
                          {user.email}
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end"></InputGroupAddon>
                    </InputGroup>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="street">Account Created</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Clock />
                        <InputGroupText className="text-foreground font-normal">
                          {format(user.createdAt, "MMM dd, yyyy hh:mm:ss")}
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end"></InputGroupAddon>
                    </InputGroup>
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>
      </div>
      <EditProfileSheet />
    </>
  );
};

export default ProfilePage;
