import { useUserStore } from "../../../../hooks/useUserStore";
import { useModalStore } from "../../../../hooks/useModalStore";
import { useEffect } from "react";

export const TablaUser = () => {
  const {
    users,
    activeUser,
    setActiveUser,
    isDeleteUser,
    findTipo,
    startLoadingUsers,
  } = useUserStore();

  const { showModal } = useModalStore();

  const handleEditar = (user) => {
    isDeleteUser(false);
    setActiveUser(user);
  };

  const confirmEliminar = (user) => {
    isDeleteUser(true);
    setActiveUser(user);
    showModal("deleteUser", { user });
  };

  const confirmReset = (user) => {
    isDeleteUser(true);
    setActiveUser(user);
    showModal("sendEmail", { user });
  };

  useEffect(() => {
    if (users.length === 0) {
      startLoadingUsers();
    }
  }, []);

  return (
    <div className="card border-secondary">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Listado de Usuarios</h3>
        <button className="btn btn-outline-primary btn-sm rounded-5" onClick={startLoadingUsers}>
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className="card-body">
        {users.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nro Documento</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.uid}
                    className={
                      activeUser?.uid === user.uid ? "table-warning" : ""
                    }
                  >
                    <td>{user.documento}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{findTipo(user.tipo)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        title="Editar Usuario"
                        onClick={() => handleEditar(user)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        title="Eliminar Usuario"
                        onClick={() => confirmEliminar(user)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-info"
                        title="Enviar Correo"
                        onClick={() => confirmReset(user)}
                      >
                        <i className="fas fa-envelope"></i>
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
  );
};
