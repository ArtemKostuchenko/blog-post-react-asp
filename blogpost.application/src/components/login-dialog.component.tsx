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
import { loginSchema, type LoginFormData } from "@/utils/validations/auth";
import useAuth from "@/hooks/auth";
import { useEffect } from "react";
import useModal from "@/hooks/modal";
import { ModalType } from "@/utils/types/app";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { KeyRound, MailIcon } from "lucide-react";

const LoginDialog = () => {
  const { open, handleOpenChange, closeModal, openModal } = useModal(
    ModalType.LOGIN,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { isLoading, isAuthenticated, isInitialized, login } = useAuth();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      closeModal();
    }
  }, [isInitialized, isAuthenticated, closeModal]);

  const onSubmit = (data: LoginFormData) => login(data);

  const handleRegisterDialog = () => {
    openModal(ModalType.REGISTER);
    closeModal();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your email and password to login
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
                Login
              </Button>
            </DialogFooter>
            <FieldSeparator />
            <FieldSet>
              <FieldLabel></FieldLabel>
              <FieldDescription className="text-center">
                Don`t have an account?{" "}
                <Button
                  variant="link"
                  type="button"
                  onClick={handleRegisterDialog}
                >
                  Register
                </Button>
              </FieldDescription>
            </FieldSet>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginDialog;
