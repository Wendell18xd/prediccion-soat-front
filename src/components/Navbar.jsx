import { Link } from "react-router";
import { useAuthStore } from "../hooks";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-shield-fill-check me-2"></i>Predicción SOAT
        </Link>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <i className="bi bi-house-door-fill me-1"></i>Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reporte">
                <i className="bi bi-bar-chart-fill me-1"></i>Reporte
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <span className="text-white fw-bold me-3">
              <i className="bi bi-person-circle me-1"></i>
              {user.name}
            </span>
            <button
              className="btn btn-outline-danger btn-sm"
              type="button"
              onClick={startLogout}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i>Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
