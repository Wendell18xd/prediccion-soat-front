import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/boostrap/bootstrap.min.css";
import "./css/style.css";
import { PrediccionApp } from "./PrediccionApp.jsx";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PrediccionApp />
    </Provider>
  </StrictMode>
);
