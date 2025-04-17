import { useEffect } from "react";
import { useForm, useAuthStore } from "../../hooks";
import Swal from "sweetalert2";

const loginFormFields = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { isLoading, startLogin, errorMessage } = useAuthStore();

  const { email, password, onInputChange } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email, password });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la authenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div
        className="card shadow-sm p-5"
        style={{ minWidth: "400px", maxWidth: "500px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">Iniciar sesión</h2>

        <form autoComplete="off" onSubmit={loginSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              name="email"
              value={email}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={onInputChange}
              required
            />
          </div>

          {isLoading ? (
            <button className="btn btn-primary w-100" disabled>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Cargando...
            </button>
          ) : (
            <button className="btn btn-primary w-100">Iniciar sesión</button>
          )}
        </form>
      </div>
    </div>
  );
};
