import type { DataState } from "@/utils/types/app";
import type {
  AddCommentRequestDto,
  AddCommentResponseDto,
  CommentQueryParams,
  CommentsDto,
  UpdateCommentRequestDto,
  UpdateCommentResponseDto,
} from "@/utils/types/comment";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface CommentState extends DataState {
  recentComments: CommentsDto;
  postComments: CommentsDto;
  userComments: CommentsDto;
  queryParams?: CommentQueryParams;
}

const initialState: CommentState = {
  recentComments: {
    comments: [],
    totalComments: 0,
    totalPages: 1,
  },
  postComments: {
    comments: [],
    totalComments: 0,
    totalPages: 1,
  },
  userComments: {
    comments: [],
    totalComments: 0,
    totalPages: 1,
  },
  fetchStatus: "idle",
  mutateStatus: "idle",
  errors: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchRecentComments(
      state,
      _: PayloadAction<CommentQueryParams | undefined>,
    ) {
      state.fetchStatus = "loading";
      state.errors = [];
    },
    fetchRecentCommentsFulFilled(state, action: PayloadAction<CommentsDto>) {
      state.fetchStatus = "success";
      state.recentComments = action.payload;
    },
    fetchRecentCommentsRejected(state, action: PayloadAction<string[]>) {
      state.fetchStatus = "error";
      state.errors = action.payload;
    },
    fetchPostComments(state, _: PayloadAction<string>) {
      state.fetchStatus = "loading";
      state.errors = [];
    },
    fetchPostCommentsFulFilled(state, action: PayloadAction<CommentsDto>) {
      state.fetchStatus = "success";
      state.postComments = action.payload;
    },
    fetchPostCommentsRejected(state, action: PayloadAction<string[]>) {
      state.fetchStatus = "error";
      state.errors = action.payload;
    },
    fetchUserComments(
      state,
      action: PayloadAction<CommentQueryParams | undefined>,
    ) {
      state.queryParams = action.payload;
      state.fetchStatus = "loading";
      state.errors = [];
    },
    fetchUserCommentsFulFilled(state, action: PayloadAction<CommentsDto>) {
      state.fetchStatus = "success";
      state.userComments = action.payload;
    },
    fetchUserCommentsRejected(state, action: PayloadAction<string[]>) {
      state.fetchStatus = "error";
      state.errors = action.payload;
    },
    addCommentToPost(state, _: PayloadAction<AddCommentRequestDto>) {
      state.mutateStatus = "loading";
      state.errors = [];
    },
    addCommentToPostFulfilled(state, _: PayloadAction<AddCommentResponseDto>) {
      state.mutateStatus = "success";
    },
    addCommentToPostRejected(state, action: PayloadAction<string[]>) {
      state.mutateStatus = "error";
      state.errors = action.payload;
    },
    updateComment(state, _: PayloadAction<UpdateCommentRequestDto>) {
      state.mutateStatus = "loading";
      state.errors = [];
    },
    updateCommentFulfilled(state, _: PayloadAction<UpdateCommentResponseDto>) {
      state.mutateStatus = "success";
    },
    updateCommentRejected(state, action: PayloadAction<string[]>) {
      state.mutateStatus = "error";
      state.errors = action.payload;
    },
    deleteComment(state, _: PayloadAction<string>) {
      state.mutateStatus = "loading";
      state.errors = [];
    },
    deleteCommentFulfilled(state, _: PayloadAction<CommentsDto>) {
      state.mutateStatus = "success";
    },
    deleteCommentRejected(state, action: PayloadAction<string[]>) {
      state.mutateStatus = "error";
      state.errors = action.payload;
    },
    resetStatus(state) {
      state.fetchStatus = "idle";
      state.mutateStatus = "idle";
      state.errors = [];
    },
  },
});

export const commentActions = commentSlice.actions;

export type CommentActions = ReturnType<
  (typeof commentActions)[keyof typeof commentActions]
>;

export const selectRecentComments = (state: RootState) =>
  state.comment.recentComments;
export const selectPostComments = (state: RootState) =>
  state.comment.postComments;
export const selectUserComments = (state: RootState) =>
  state.comment.userComments;
export const selectCommentFetchStatus = (state: RootState) =>
  state.comment.fetchStatus;
export const selectCommentMutateStatus = (state: RootState) =>
  state.comment.mutateStatus;

export default commentSlice.reducer;
