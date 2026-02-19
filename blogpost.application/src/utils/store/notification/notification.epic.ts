import { type AppEpic } from "@/utils/store";
import { notificationActions } from "./notification.slice";
import { delay, map } from "rxjs";
import { combineEpics, ofType } from "redux-observable";

const autoRemoveNotificationEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(notificationActions.addNotification.type),
    delay(4000),
    map((action) => notificationActions.removeNotification(action.payload.id)),
  );

export default combineEpics(autoRemoveNotificationEpic);
