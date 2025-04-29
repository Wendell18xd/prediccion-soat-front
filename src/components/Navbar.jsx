import {
  Navbar as AppNavbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../hooks";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();
  const { pathname } = useLocation();
  const tipo = user?.tipo || "";

  return (
    <AppNavbar
      bg="primary"
      variant="dark"
      expand="lg"
      collapseOnSelect
      className="shadow-sm"
    >
      <Container fluid>
        <AppNavbar.Brand as={Link} to="/" className="fw-bold">
          <i className="bi bi-shield-fill-check me-2"></i>Predicción SOAT
        </AppNavbar.Brand>
        <AppNavbar.Toggle aria-controls="main-navbar" />
        <AppNavbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={pathname === "/"}>
              <i className="fa-solid fa-chart-line me-2"></i>Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reporte"
              active={pathname.startsWith("/reporte")}
            >
              <i className="fa-regular fa-file-lines me-2"></i>Reporte
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/historial"
              active={pathname.startsWith("/historial")}
            >
              <i className="fa-regular fa-calendar me-2"></i>Historial
            </Nav.Link>
            {tipo === "admin" && (
              <Nav.Link
                as={Link}
                to="/usuarios"
                active={pathname.startsWith("/usuarios")}
              >
                <i className="fa-solid fa-users me-2"></i>Usuarios
              </Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            <span className="text-white fw-bold me-3">
              <i className="bi bi-person-circle me-1"></i>
              {user.name}
            </span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={startLogout}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i>Salir
            </button>
          </Nav>
        </AppNavbar.Collapse>
      </Container>
    </AppNavbar>
  );
};
