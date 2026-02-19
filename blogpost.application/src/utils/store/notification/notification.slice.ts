import type {
  Notification,
  NotificationPayload,
} from "@/utils/types/notification";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import type { RootState } from "..";

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: {
      prepare(notification: NotificationPayload) {
        return { payload: { ...notification, id: v4() } };
      },
      reducer(state, action: PayloadAction<Notification>) {
        state.notifications.push(action.payload);
      },
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
  },
});
export const notificationActions = notificationSlice.actions;

export type NotificationActions = ReturnType<
  (typeof notificationActions)[keyof typeof notificationActions]
>;

export const selectNotifications = (state: RootState) =>
  state.notification.notifications;

export default notificationSlice.reducer;
