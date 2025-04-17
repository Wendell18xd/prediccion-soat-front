
export const LoginPage = () => {

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div
        className="card shadow-sm p-5"
        style={{ minWidth: "400px", maxWidth: "500px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">Iniciar sesión</h2>

        <form autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              autoComplete="email"
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
            />
          </div>

          <button className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
