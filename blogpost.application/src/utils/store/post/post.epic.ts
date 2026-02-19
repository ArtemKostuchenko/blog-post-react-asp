import { combineEpics, ofType } from "redux-observable";
import type { AppEpic } from "..";
import { postActions } from "./post.slice";
import { catchError, from, map, switchMap, of } from "rxjs";
import { postRepository } from "@/utils/repositories/post/PostRepository";
import type { ApiError } from "@/utils/func";

const autoFetchPostsEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(postActions.addPostFulfilled.type),
    map(() => postActions.fetchPosts($state.value.post.queryParams)),
  );

const autoFetchUsersPostsEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(
      postActions.addPostFulfilled.type,
      postActions.updatePostFulfilled.type,
      postActions.deletePostFulfilled.type,
    ),
    map(() => postActions.fetchUserPosts($state.value.post.queryParams)),
  );

const fetchPostEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(postActions.fetchPost.type),
    switchMap((action) =>
      from(postRepository.fetchPost(action.payload)).pipe(
        map((data) => postActions.fetchPostFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(postActions.fetchPostRejected(apiErr.errors)),
        ),
      ),
    ),
  );

const fetchPostsEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(postActions.fetchPosts.type),
    switchMap((action) =>
      from(postRepository.fetchAll(action.payload)).pipe(
        map((data) => postActions.fetchPostsFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(postActions.fetchPostsRejected(apiErr.errors)),
        ),
      ),
    ),
  );

const fetchUserPostsEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(postActions.fetchUserPosts.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(postRepository.getByUserId(action.payload, accessToken)).pipe(
        map((data) => postActions.fetchUserPostsFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(postActions.fetchUserPostsRejected(apiErr.errors)),
        ),
      );
    }),
  );

const addPostEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(postActions.addPost.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(postRepository.addPost(action.payload, accessToken)).pipe(
        map((data) => postActions.addPostFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(postActions.addPostRejected(apiErr.errors)),
        ),
      );
    }),
  );

const updatePostEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(postActions.updatePost.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(postRepository.updatePost(action.payload, accessToken)).pipe(
        map((data) => postActions.updatePostFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(postActions.updatePostRejected(apiErr.errors)),
        ),
      );
    }),
  );

const deletePostEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(postActions.deletePost.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(postRepository.deletePost(action.payload, accessToken)).pipe(
        map((data) => postActions.deletePostFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(postActions.deletePostRejected(apiErr.errors)),
        ),
      );
    }),
  );

export default combineEpics(
  autoFetchPostsEpic,
  autoFetchUsersPostsEpic,
  fetchPostEpic,
  fetchPostsEpic,
  fetchUserPostsEpic,
  addPostEpic,
  updatePostEpic,
  deletePostEpic,
);
