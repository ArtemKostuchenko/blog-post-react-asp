import type { AppEpic } from "..";
import { combineEpics, ofType } from "redux-observable";
import { appActions } from "./app.slice";
import { switchMap, of } from "rxjs";
import { authActions } from "../auth/auth.slice";

const appInitEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(appActions.appStarted.type),
    switchMap(() => {
      const refreshToken = localStorage.getItem("_rt");

      if (!refreshToken) {
        return of(authActions.logout());
      }

      return of(authActions.refresh({ refreshToken }));
    }),
  );

export default combineEpics(appInitEpic);
