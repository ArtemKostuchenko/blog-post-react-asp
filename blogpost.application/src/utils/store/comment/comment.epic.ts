import { combineEpics, ofType } from "redux-observable";
import type { AppEpic } from "..";
import { commentActions } from "./comment.slice";
import { switchMap, from, map, catchError, of } from "rxjs";
import { commentRepository } from "@/utils/repositories/comment/CommentRepository";
import type { ApiError } from "@/utils/func";

const autoFetchPostCommentsEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(commentActions.addCommentToPostFulfilled.type),
    map((action) => commentActions.fetchPostComments(action.payload.postId)),
  );

const autoFetchUserCommentsEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(
      commentActions.updateCommentFulfilled.type,
      commentActions.deleteCommentFulfilled.type,
    ),
    map(() =>
      commentActions.fetchUserComments($state.value.comment.queryParams),
    ),
  );

const fetchRecentCommentsEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(commentActions.fetchRecentComments.type),
    switchMap((action) =>
      from(commentRepository.fetchAll(action.payload)).pipe(
        map((data) => commentActions.fetchRecentCommentsFulFilled(data)),
        catchError((apiError: ApiError) =>
          of(commentActions.fetchRecentCommentsRejected(apiError.errors)),
        ),
      ),
    ),
  );

const fetchPostCommentsEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(commentActions.fetchPostComments.type),
    switchMap((action) =>
      from(commentRepository.getByPostId(action.payload)).pipe(
        map((data) => commentActions.fetchPostCommentsFulFilled(data)),
        catchError((apiError: ApiError) =>
          of(commentActions.fetchPostCommentsRejected(apiError.errors)),
        ),
      ),
    ),
  );

const fetchUserCommentsEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(commentActions.fetchUserComments.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(
        commentRepository.getByUserId(action.payload, accessToken),
      ).pipe(
        map((data) => commentActions.fetchUserCommentsFulFilled(data)),
        catchError((apiErr: ApiError) =>
          of(commentActions.fetchUserCommentsRejected(apiErr.errors)),
        ),
      );
    }),
  );

const addCommentToPostEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(commentActions.addCommentToPost.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(
        commentRepository.addCommentToPost(action.payload, accessToken),
      ).pipe(
        map((data) => commentActions.addCommentToPostFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(commentActions.addCommentToPostRejected(apiErr.errors)),
        ),
      );
    }),
  );

const updateCommentEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(commentActions.updateComment.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(
        commentRepository.updateComment(action.payload, accessToken),
      ).pipe(
        map((data) => commentActions.updateCommentFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(commentActions.updateCommentRejected(apiErr.errors)),
        ),
      );
    }),
  );

const deleteCommentEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(commentActions.deleteComment.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(
        commentRepository.deleteComment(action.payload, accessToken),
      ).pipe(
        map((data) => commentActions.deleteCommentFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(commentActions.deleteCommentRejected(apiErr.errors)),
        ),
      );
    }),
  );

export default combineEpics(
  autoFetchPostCommentsEpic,
  autoFetchUserCommentsEpic,
  fetchRecentCommentsEpic,
  fetchPostCommentsEpic,
  fetchUserCommentsEpic,
  addCommentToPostEpic,
  updateCommentEpic,
  deleteCommentEpic,
);
