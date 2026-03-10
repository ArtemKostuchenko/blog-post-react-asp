import { authRepository } from "@/utils/repositories/auth/AuthRepository";
import type { AppEpic } from "..";
import { authActions } from "./auth.slice";
import { combineEpics, ofType } from "redux-observable";
import { from, switchMap, map, catchError, of, mergeMap } from "rxjs";
import type { ApiError } from "@/utils/func";
import { notificationActions } from "../notification/notification.slice";

const authLoginEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(authActions.login.type),
    switchMap((action) =>
      from(authRepository.login(action.payload)).pipe(
        map((data) => {
          localStorage.setItem("_rt", data.refreshToken);

          return authActions.loginFulfilled(data);
        }),
        catchError((err: ApiError) =>
          of(authActions.loginRejected(err.errors)),
        ),
      ),
    ),
  );

const authRegisterEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(authActions.register.type),
    switchMap((action) =>
      from(authRepository.register(action.payload)).pipe(
        map((data) => {
          localStorage.setItem("_rt", data.refreshToken);

          return authActions.registerFulfilled(data);
        }),
        catchError((err: ApiError) =>
          of(authActions.registerRejected(err.errors)),
        ),
      ),
    ),
  );

const authLogoutEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(authActions.logout.type),
    switchMap(() => {
      const accessToken = $state.value.auth.accessToken;

      return from(authRepository.logout(accessToken)).pipe(
        map(() => {
          localStorage.removeItem("_rt");
          return authActions.logoutFulfilled();
        }),
        catchError((apiErr: ApiError) =>
          of(authActions.logoutRejected(apiErr.errors)),
        ),
      );
    }),
  );

const authRefreshEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(authActions.refresh.type),
    switchMap((action) =>
      from(authRepository.refresh(action.payload)).pipe(
        map((data) => {
          localStorage.setItem("_rt", data.refreshToken);
          return authActions.refreshFulfilled(data);
        }),
        catchError((err: ApiError) =>
          of(authActions.refreshRejected(err.errors)),
        ),
      ),
    ),
  );

const authErrorsEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(authActions.loginRejected.type),
    mergeMap((action) =>
      from(action.payload).pipe(
        map((message) =>
          notificationActions.addNotification({
            type: "error",
            message,
          }),
        ),
      ),
    ),
  );

export default combineEpics(
  authLoginEpic,
  authRegisterEpic,
  authLogoutEpic,
  authRefreshEpic,
  authErrorsEpic,
);
