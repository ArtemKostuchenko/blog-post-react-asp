import type {
  UpdateUserAvatarRequestDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  User,
} from "@/utils/types/user";

export interface IUserRepository {
  fetchUser(accessToken?: string): Promise<User>;
  updateUser(
    request: UpdateUserRequestDto,
    accessToken?: string,
  ): Promise<UpdateUserResponseDto>;
  updateAvatar(
    request: UpdateUserAvatarRequestDto,
    accessToken?: string,
  ): Promise<UpdateUserResponseDto>;
}
