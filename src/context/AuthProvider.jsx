import { AuthContext } from "./AuthContext";
import { useEffect } from "react";
import { setLogoutCallback } from "../helpers/authRedirectHelper";
import { useAuthStore } from "../hooks";

export const AuthProvider = ({ children }) => {
  const { checkAuthToken } = useAuthStore();

  const logout = async () => {
    await checkAuthToken();
  };

  useEffect(() => {
    setLogoutCallback(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};
