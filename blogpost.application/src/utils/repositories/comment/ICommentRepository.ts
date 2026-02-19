import type {
  AddCommentRequestDto,
  AddCommentResponseDto,
  CommentQueryParams,
  CommentsDto,
  UpdateCommentRequestDto,
  UpdateCommentResponseDto,
} from "@/utils/types/comment";

export interface ICommentRepository {
  fetchAll(query?: CommentQueryParams): Promise<CommentsDto>;
  getByPostId(postId: string): Promise<CommentsDto>;
  getByUserId(
    query?: CommentQueryParams,
    accessToken?: string,
  ): Promise<CommentsDto>;
  addCommentToPost(
    request: AddCommentRequestDto,
    accessToken?: string,
  ): Promise<AddCommentResponseDto>;
  updateComment(
    request: UpdateCommentRequestDto,
    accessToken?: string,
  ): Promise<UpdateCommentResponseDto>;
  deleteComment(commentId: string, accessToken?: string): Promise<CommentsDto>;
}
