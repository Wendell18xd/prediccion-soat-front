import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { setLogoutCallback } from "../helpers/authRedirectHelper";
import { useAuthStore } from "../hooks";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { checkAuthToken } = useAuthStore();

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    await checkAuthToken();
    navigate("/auth/login", { replace: true });
    Swal.fire("Expirado", "Sesión Expirada", "warning");
  };

  useEffect(() => {
    setLogoutCallback(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};
