import { useUserStore } from "../../../../hooks/useUserStore";
import { useModalStore } from "../../../../hooks/useModalStore";

export const TablaUser = () => {
  const { users, activeUser, setActiveUser, isDeleteUser, findTipo } =
    useUserStore();

  const { setToogleModal } = useModalStore();

  const handleEditar = (user) => {
    isDeleteUser(false);
    setActiveUser(user);
  };

  const confirmEliminar = (user) => {
    isDeleteUser(true);
    setActiveUser(user);
    setToogleModal();
  };

  return (
    <div className="card border-secondary">
      <div className="card-header">
        <h3 className="mb-0">Listado de Usuarios</h3>
      </div>
      <div className="card-body">
        {users.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={
                      activeUser?.id === user.id ? "table-warning" : ""
                    }
                  >
                    <td>{user.nombre}</td>
                    <td>{user.correo}</td>
                    <td>{findTipo(user.tipo)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditar(user)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmEliminar(user)}
                      >
                        <i className="fas fa-trash-alt"></i>
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
