import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home.page";
import RootLayout from "./pages/layout.page";
import ProtectedLayout from "./components/protected-layout.component";
import ProfilePage from "./pages/profile.page";
import PostPage from "./pages/post.page";
import { store } from "./utils/store";
import { postActions } from "./utils/store/post/post.slice";
import UserCommentsPage from "./pages/user-comments.page";
import UserPostsPage from "./pages/user-posts.page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        Component: ProtectedLayout,
        children: [
          {
            path: "profile",
            Component: ProfilePage,
          },
          {
            path: "user/posts",
            Component: UserPostsPage,
          },
          {
            path: "user/comments",
            Component: UserCommentsPage,
          },
        ],
      },
      {
        path: "posts/:id",
        loader: async ({ params }) => {
          store.dispatch(postActions.fetchPost(params.id!));
          return null;
        },
        Component: PostPage,
      },
    ],
  },
]);
