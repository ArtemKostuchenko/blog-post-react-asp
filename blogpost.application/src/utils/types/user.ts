import type { Image } from "./image";

export interface User {
  id: string;
  nickname: string;
  email: string;
  avatar: Image | null;
  createdAt: string;
}

export interface UpdateUserRequestDto {
  nickname: string;
}

export interface UpdateUserRequestDto {
  nickname: string;
}

export interface UpdateUserResponseDto {
  id: string;
  nickname: string;
  avatar: Image | null;
  createdAt: string;
}

export interface UpdateUserAvatarRequestDto {
  avatar: File;
}
