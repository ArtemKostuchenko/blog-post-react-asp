import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./app/app.slice";
import authReducer, { type AuthActions } from "./auth/auth.slice";
import userReducer, { type UserActions } from "./user/user.slice";
import postReducer, { type PostActions } from "./post/post.slice";
import commentReducer, { type CommentActions } from "./comment/comment.slice";
import notificationReducer, {
  type NotificationActions,
} from "./notification/notification.slice";

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  notification: notificationReducer,
  post: postReducer,
  comment: commentReducer,
});

export type RootActions =
  | AuthActions
  | UserActions
  | PostActions
  | CommentActions
  | NotificationActions;
