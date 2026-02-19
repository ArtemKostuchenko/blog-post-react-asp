import { combineEpics } from "redux-observable";
import appEpic from "./app/app.epic";
import authEpic from "./auth/auth.epic";
import userEpic from "./user/user.epic";
import postEpic from "./post/post.epic";
import commentEpic from "./comment/comment.epic";
import notificationEpic from "./notification/notification.epic";

export default combineEpics(
  appEpic,
  authEpic,
  userEpic,
  postEpic,
  commentEpic,
  notificationEpic,
);
