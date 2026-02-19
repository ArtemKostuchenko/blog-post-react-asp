import { fetchApi } from "@/utils/func";
import type { ICommentRepository } from "./ICommentRepository";
import type {
  AddCommentRequestDto,
  CommentQueryParams,
  UpdateCommentRequestDto,
} from "@/utils/types/comment";

export const commentRepository: ICommentRepository = {
  fetchAll: async (query?: CommentQueryParams) => {
    return await fetchApi("comments", {
      query: query,
    });
  },
  getByPostId: async (postId: string) => {
    return await fetchApi(`posts/${postId}/comments`);
  },
  getByUserId: async (query?: CommentQueryParams, accessToken?: string) => {
    return await fetchApi("comments/me", {
      query,
      accessToken,
    });
  },
  addCommentToPost: async (
    request: AddCommentRequestDto,
    accessToken?: string,
  ) => {
    return await fetchApi(`posts/${request.postId}/comments`, {
      method: "POST",
      data: request,
      accessToken,
    });
  },
  updateComment: async (
    request: UpdateCommentRequestDto,
    accessToken?: string,
  ) => {
    return await fetchApi(`comments/${request.commentId}`, {
      method: "PUT",
      data: request,
      accessToken,
    });
  },
  deleteComment: async (commentId: string, accessToken?: string) => {
    return await fetchApi(`comments/${commentId}`, {
      method: "DELETE",
      accessToken,
    });
  },
};
