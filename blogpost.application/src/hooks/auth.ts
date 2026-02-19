import {
  authActions,
  selectIsAuthenticated,
  selectIsAuthInitialized,
  selectIsAuthLoading,
} from "@/utils/store/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "./redux";
import type {
  AuthLoginRequestDto,
  AuthRegisterRequestDto,
} from "@/utils/types/auth";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsAuthInitialized);

  const login = (request: AuthLoginRequestDto) => {
    if (isLoading || isAuthenticated) return;

    dispatch(authActions.login(request));
  };

  const register = (request: AuthRegisterRequestDto) => {
    if (isLoading || isAuthenticated) return;

    dispatch(authActions.register(request));
  };

  const logout = () => {
    if (isLoading || !isAuthenticated) return;

    dispatch(authActions.logout());
  };

  return {
    isLoading,
    isAuthenticated,
    isInitialized,
    login,
    register,
    logout,
  };
};

export default useAuth;
