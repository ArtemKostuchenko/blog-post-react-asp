import type { DataState } from "@/utils/types/app";
import type {
  AddPostRequestDto,
  AddPostResponseDto,
  PostsDto,
  Post,
  PostDto,
  PostQueryParams,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
} from "@/utils/types/post";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface PostState extends DataState {
  post?: Post;
  posts: PostsDto;
  userPosts: PostsDto;
  queryParams?: PostQueryParams;
}

const initialState: PostState = {
  posts: {
    posts: [],
    totalPosts: 0,
    totalPages: 1,
  },
  userPosts: {
    posts: [],
    totalPosts: 0,
    totalPages: 1,
  },
  fetchStatus: "idle",
  mutateStatus: "idle",
  errors: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPosts(state, action: PayloadAction<PostQueryParams | undefined>) {
      state.queryParams = action.payload;
      state.fetchStatus = "loading";
      state.errors = [];
    },
    fetchPostsFulfilled(state, action: PayloadAction<PostsDto>) {
      state.fetchStatus = "success";
      state.posts = action.payload;
    },
    fetchPostsRejected(state, action: PayloadAction<string[]>) {
      state.fetchStatus = "error";
      state.errors = action.payload;
    },
    fetchUserPosts(state, action: PayloadAction<PostQueryParams | undefined>) {
      state.queryParams = action.payload;
      state.fetchStatus = "loading";
      state.errors = [];
    },
    fetchUserPostsFulfilled(state, action: PayloadAction<PostsDto>) {
      state.fetchStatus = "success";
      state.userPosts = action.payload;
    },
    fetchUserPostsRejected(state, action: PayloadAction<string[]>) {
      state.fetchStatus = "error";
      state.errors = action.payload;
    },
    fetchPost(state, _: PayloadAction<string>) {
      state.fetchStatus = "loading";
      state.errors = [];
    },
    fetchPostFulfilled(state, action: PayloadAction<PostDto>) {
      state.post = action.payload;
      state.fetchStatus = "success";
    },
    fetchPostRejected(state, action: PayloadAction<string[]>) {
      state.fetchStatus = "error";
      state.errors = action.payload;
    },
    addPost(state, _: PayloadAction<AddPostRequestDto>) {
      state.mutateStatus = "loading";
      state.errors = [];
    },
    addPostFulfilled(state, _: PayloadAction<AddPostResponseDto>) {
      state.mutateStatus = "success";
    },
    addPostRejected(state, action: PayloadAction<string[]>) {
      state.mutateStatus = "error";
      state.errors = action.payload;
    },
    updatePost(state, _: PayloadAction<UpdatePostRequestDto>) {
      state.mutateStatus = "loading";
      state.errors = [];
    },
    updatePostFulfilled(state, _: PayloadAction<UpdatePostResponseDto>) {
      state.mutateStatus = "success";
    },
    updatePostRejected(state, action: PayloadAction<string[]>) {
      state.mutateStatus = "error";
      state.errors = action.payload;
    },
    deletePost(state, _: PayloadAction<string>) {
      state.mutateStatus = "loading";
      state.errors = [];
    },
    deletePostFulfilled(state, _: PayloadAction<PostDto>) {
      state.mutateStatus = "success";
    },
    deletePostRejected(state, action: PayloadAction<string[]>) {
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

export const postActions = postSlice.actions;

export type PostActions = ReturnType<
  (typeof postActions)[keyof typeof postActions]
>;

export const selectPost = (state: RootState) => state.post.post;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectUserPosts = (state: RootState) => state.post.userPosts;
export const selectPostFetchStatus = (state: RootState) =>
  state.post.fetchStatus;
export const selectPostMutateStatus = (state: RootState) =>
  state.post.mutateStatus;

export default postSlice.reducer;
