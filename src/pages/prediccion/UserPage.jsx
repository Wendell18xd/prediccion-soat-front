import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useUserStore } from "../../hooks/useUserStore";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const UserPage = () => {
  const { usuarios, addUsuario, removeUsuario, editUsuario } = useUserStore();

  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "usuario",
    correo: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.tipo || !formData.correo) return;

    if (editIndex !== null) {
      editUsuario(editIndex, formData);
      setEditIndex(null);
    } else {
      addUsuario(formData);
    }

    setFormData({ nombre: "", tipo: "usuario", correo: "" });
  };

  const handleEditar = (index) => {
    setFormData(usuarios[index]);
    setEditIndex(index);
  };

  const handleCancelar = () => {
    setEditIndex(null);
    setFormData({ nombre: "", tipo: "usuario", correo: "" });
  };

  const confirmEliminar = (index) => {
    setDeleteIndex(index);
    setShowModal(true);
  };

  const handleConfirmarEliminacion = () => {
    removeUsuario(deleteIndex);
    setShowModal(false);
    setDeleteIndex(null);
  };

  return (
    <>
      <Navbar />
      <div className="container m-4">
        <div className="row">
          {/* Formulario */}
          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h3 className="mb-4">
                {editIndex !== null ? "Editar Usuario" : "Registrar Usuario"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Tipo</label>
                  <select
                    name="tipo"
                    className="form-control"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="admin">admin</option>
                    <option value="usuario">usuario</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Correo</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {editIndex !== null ? "Editar" : "Registrar"}
                  </button>
                  {editIndex !== null && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelar}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="col-md-8">
            <div className="card p-3 shadow-sm">
              <h3 className="mb-3">Listado de Usuarios</h3>
              {usuarios.length === 0 ? (
                <p>No hay usuarios registrados.</p>
              ) : (
                <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>Correo</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((user, index) => (
                      <tr
                        key={index}
                        className={editIndex === index ? "table-warning" : ""}
                      >
                        <td>{user.nombre}</td>
                        <td>{user.tipo}</td>
                        <td>{user.correo}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => handleEditar(index)}
                          >
                            Editar
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => confirmEliminar(index)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmarEliminacion}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
