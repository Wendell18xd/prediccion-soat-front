// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router";
import { LoginPage } from "../pages/auth/LoginPage";
import { HomePage } from "../pages/prediccion/HomePage";
import { ReportsPage } from "../pages/prediccion/ReportsPage";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { Loading } from "../components/Loading";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

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
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
