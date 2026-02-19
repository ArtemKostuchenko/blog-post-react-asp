import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import { appActions } from "./utils/store/app/app.slice";

store.dispatch(appActions.appStarted());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
