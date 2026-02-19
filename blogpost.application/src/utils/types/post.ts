import type { DefaultQueryParams } from "./app";
import type { Image } from "./image";
import type { User } from "./user";

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
  image?: Image;
}

export interface PostQueryParams extends DefaultQueryParams {}

export interface PostDto {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
  image?: Image;
}

export interface ShortPostDto {
  id: string;
  title: string;
}

export interface PostsDto {
  posts: PostDto[];
  totalPosts: number;
  totalPages: number;
}

export interface AddPostRequestDto {
  title: string;
  content: string;
  image?: File;
}

export interface AddPostResponseDto {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
  image?: Image;
}

export interface UpdatePostRequestDto {
  id: string;
  title: string;
  content: string;
  image?: File;
}

export interface UpdatePostResponseDto {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
  image?: Image;
}
