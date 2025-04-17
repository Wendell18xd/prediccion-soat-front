// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { LoginPage } from "../pages/auth/LoginPage";
import { HomePage } from "../pages/prediccion/HomePage";
import { ReportsPage } from "../pages/prediccion/ReportsPage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reportes"
        element={
          <PrivateRoute>
            <ReportsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
