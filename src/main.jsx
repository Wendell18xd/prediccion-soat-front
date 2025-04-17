import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/boostrap/bootstrap.min.css";
import "./css/style.css";
import { PrediccionApp } from "./PrediccionApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <PrediccionApp />
  </StrictMode>
);
