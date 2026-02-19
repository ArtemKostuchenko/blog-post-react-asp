import type {
  UpdateUserAvatarRequestDto,
  UpdateUserRequestDto,
} from "@/utils/types/user";
import type { IUserRepository } from "./IUserRepository";
import { fetchApi, objectToFormData } from "@/utils/func";

export const userRepository: IUserRepository = {
  fetchUser: async (accessToken?: string) => {
    return await fetchApi("users/me", {
      accessToken,
    });
  },
  updateUser: async (request: UpdateUserRequestDto, accessToken?: string) => {
    return await fetchApi("users", {
      method: "PUT",
      data: request,
      accessToken,
    });
  },
  updateAvatar: async (
    request: UpdateUserAvatarRequestDto,
    accessToken?: string,
  ) => {
    return await fetchApi("users/update-avatar", {
      method: "POST",
      data: objectToFormData(request),
      accessToken,
    });
  },
};
