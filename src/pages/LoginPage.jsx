import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    dispatch(login({ name: "Usuario" }));
    // Redirige a la ruta principal
    navigate("/");
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-body-tertiary">
      <div
        className="card shadow-sm p-4"
        style={{ minWidth: "300px", maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">Iniciar sesión</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="••••••••"
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};
