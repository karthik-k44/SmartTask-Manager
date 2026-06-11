// @ts-ignore: Allow side-effect CSS import in this TSX entry point
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./apps/frontend/redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./apps/frontend/routes/app-router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
