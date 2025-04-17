import { useAuthStore } from "../hooks";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Predicción SOAT
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Dashboard
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Reportes
              </a>
            </li>
          </ul>
          <div className="d-flex justify-content-center align-items-center">
            <span className="me-2">{user.name}</span>
            <button
              className="btn btn-danger my-2 my-sm-0"
              type="submit"
              onClick={startLogout}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
