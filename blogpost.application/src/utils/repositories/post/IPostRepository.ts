import type {
  AddPostRequestDto,
  AddPostResponseDto,
  PostsDto,
  PostDto,
  PostQueryParams,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from "@/utils/types/post";

export interface IPostRepository {
  fetchPost(id: string): Promise<PostDto>;
  fetchAll(query?: PostQueryParams): Promise<PostsDto>;
  getByUserId(query?: PostQueryParams, accessToken?: string): Promise<PostsDto>;
  addPost(
    request: AddPostRequestDto,
    accessToken?: string,
  ): Promise<AddPostResponseDto>;
  updatePost(
    request: UpdatePostRequestDto,
    accessToken?: string,
  ): Promise<UpdatePostResponseDto>;
  deletePost(postId: string, accessToken?: string): Promise<PostDto>;
}
