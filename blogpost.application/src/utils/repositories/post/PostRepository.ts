import { fetchApi, objectToFormData } from "@/utils/func";
import type { IPostRepository } from "./IPostRepository";
import type {
  AddPostRequestDto,
  PostQueryParams,
  UpdatePostRequestDto,
} from "@/utils/types/post";

export const postRepository: IPostRepository = {
  fetchPost: async (id: string) => {
    return await fetchApi(`posts/${id}`);
  },
  fetchAll: async (query?: PostQueryParams) => {
    return await fetchApi("posts", {
      query: query,
    });
  },
  getByUserId: async (query?: PostQueryParams, accessToken?: string) => {
    return await fetchApi("posts/me", {
      query: query,
      accessToken,
    });
  },
  addPost: async (request: AddPostRequestDto, accessToken?: string) => {
    return await fetchApi("posts", {
      method: "POST",
      data: objectToFormData(request),
      accessToken,
    });
  },
  updatePost: async (request: UpdatePostRequestDto, accessToken?: string) => {
    return await fetchApi(`posts/${request.id}`, {
      method: "PUT",
      data: objectToFormData(request),
      accessToken,
    });
  },
  deletePost: async (postId: string, accessToken?: string) => {
    return await fetchApi(`posts/${postId}`, {
      method: "DELETE",
      accessToken,
    });
  },
};
