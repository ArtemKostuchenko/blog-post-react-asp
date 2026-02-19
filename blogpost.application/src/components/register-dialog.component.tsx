import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "./ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/utils/validations/auth";
import useAuth from "@/hooks/auth";
import { useEffect } from "react";
import { ModalType } from "@/utils/types/app";
import useModal from "@/hooks/modal";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { KeyRound, MailIcon, UserIcon } from "lucide-react";

const RegisterDialog = () => {
  const { open, handleOpenChange, closeModal, openModal } = useModal(
    ModalType.REGISTER,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const {
    isLoading,
    isAuthenticated,
    isInitialized,
    register: registerUser,
  } = useAuth();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, isInitialized]);

  const onSubmit = (data: RegisterFormData) => registerUser(data);

  const handleLoginDialog = () => {
    openModal(ModalType.LOGIN);
    closeModal();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>
              Enter information about you below to register
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
                <FieldError>{errors.email?.message}</FieldError>
              </Field>
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
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="Enter your password"
                  />
                  <InputGroupAddon>
                    <KeyRound />
                  </InputGroupAddon>
                </InputGroup>
                <FieldError>{errors.password?.message}</FieldError>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Register
              </Button>
            </DialogFooter>
            <FieldSeparator />
            <FieldSet>
              <FieldLabel></FieldLabel>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Button
                  variant="link"
                  type="button"
                  onClick={handleLoginDialog}
                >
                  Login
                </Button>
              </FieldDescription>
            </FieldSet>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterDialog;
