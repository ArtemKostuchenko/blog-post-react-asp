import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { type RootActions } from "./root.reducer";
import { createEpicMiddleware, type Epic } from "redux-observable";
import rootEpic from "./root.epic";
import { userActions } from "./user/user.slice";
import { postActions } from "./post/post.slice";
export type RootState = ReturnType<typeof rootReducer>;

export type AppEpic = Epic<RootActions, RootActions, RootState>;

const epicMiddleware = createEpicMiddleware<
  RootActions,
  RootActions,
  RootState
>();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          userActions.updateUserAvatar.type,
          postActions.addPost.type,
          postActions.updatePost.type,
        ],
      },
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
