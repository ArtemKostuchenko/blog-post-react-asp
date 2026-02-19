import type {
  AuthLoginRequestDto,
  AuthRefreshRequestDto,
  AuthRegisterRequestDto,
} from "@/utils/types/auth";
import type { IAuthRepository } from "./IAuthRepository";
import { fetchApi } from "@/utils/func";

export const authRepository: IAuthRepository = {
  login: async (request: AuthLoginRequestDto) => {
    return await fetchApi("auth/login", {
      method: "POST",
      data: request,
    });
  },
  register: async (request: AuthRegisterRequestDto) => {
    return await fetchApi("auth/register", {
      method: "POST",
      data: request,
    });
  },
  refresh: async (request: AuthRefreshRequestDto) => {
    return await fetchApi("auth/refresh", {
      method: "POST",
      data: request,
    });
  },
  logout: async (accessToken?: string) => {
    return await fetchApi("auth/logout", {
      method: "POST",
      accessToken,
    });
  },
};
