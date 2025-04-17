import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/bootstrap.min.css";
import "./css/style.css";
import { PrediccionApp } from "./PrediccionApp.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PrediccionApp />
    </Provider>
  </StrictMode>
);
