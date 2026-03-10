import type { DefaultQueryParams } from "./app";
import type { ShortPostDto } from "./post";
import type { User } from "./user";

export interface CommentDto {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  post: ShortPostDto | null;
}

export interface CommentsDto {
  comments: CommentDto[];
  totalComments: number;
  totalPages: number;
}

export type CommentQueryParams = DefaultQueryParams;

export interface AddCommentRequestDto {
  postId: string;
  content: string;
}

export interface AddCommentResponseDto {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
}

export interface UpdateCommentRequestDto {
  commentId: string;
  content: string;
}

export interface UpdateCommentResponseDto {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
}
