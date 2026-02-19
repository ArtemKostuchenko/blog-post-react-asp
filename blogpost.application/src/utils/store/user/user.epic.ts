import { combineEpics, ofType } from "redux-observable";
import { switchMap, of, from, map, catchError } from "rxjs";
import type { AppEpic } from "..";
import { userActions } from "./user.slice";
import { userRepository } from "@/utils/repositories/user/UserRepository";
import type { ApiError } from "@/utils/func";
import { authActions } from "../auth/auth.slice";

const autoFetchUserEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(
      authActions.loginFulfilled.type,
      authActions.registerFulfilled.type,
      authActions.refreshFulfilled.type,
      userActions.updateUserFulfilled.type,
      userActions.updateUserAvatarFulfilled.type,
    ),
    map(() => userActions.fetchUser()),
  );

const fetchUserEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(userActions.fetchUser.type),
    switchMap(() => {
      const accessToken = $state.value.auth.accessToken;

      return from(userRepository.fetchUser(accessToken)).pipe(
        map((data) => userActions.fetchUserFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(userActions.fetchUserRejected(apiErr.errors)),
        ),
      );
    }),
  );

const updateUserEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(userActions.updateUser.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(userRepository.updateUser(action.payload, accessToken)).pipe(
        map((data) => userActions.updateUserFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(userActions.updateUserRejected(apiErr.errors)),
        ),
      );
    }),
  );

const updateUserAvatarEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(userActions.updateUserAvatar.type),
    switchMap((action) => {
      const accessToken = $state.value.auth.accessToken;

      return from(
        userRepository.updateAvatar(action.payload, accessToken),
      ).pipe(
        map((data) => userActions.updateUserAvatarFulfilled(data)),
        catchError((apiErr: ApiError) =>
          of(userActions.updateUserAvatarRejected(apiErr.errors)),
        ),
      );
    }),
  );

export default combineEpics(
  autoFetchUserEpic,
  fetchUserEpic,
  updateUserEpic,
  updateUserAvatarEpic,
);
