// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router";
import { LoginPage } from "../pages/auth/LoginPage";
import { HomePage } from "../pages/prediccion/HomePage";
import { ReportsPage } from "../pages/prediccion/ReportsPage";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { Loading } from "../components/Loading";
import { UserPage } from "../pages/prediccion/UserPage";

export const AppRouter = () => {
  const { status, checkAuthToken, user } = useAuthStore();
  const tipo = user?.tipo || "";

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <Loading />;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/reporte" element={<ReportsPage />} />

          {tipo === "admin" && (
            <Route path="/usuarios" element={<UserPage />} />
          )}

          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
