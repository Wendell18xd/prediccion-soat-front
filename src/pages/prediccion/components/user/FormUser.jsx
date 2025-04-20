import { useEffect } from "react";
import { useForm } from "../../../../hooks";
import { useUserStore } from "../../../../hooks/useUserStore";

const fieldForm = {
  nombre: "",
  tipo: "",
  correo: "",
};

export const FormUser = () => {
  const {
    activeUser,
    setActiveUser,
    startSavingUser,
    hasUserSelected,
    isDelete,
  } = useUserStore();
  const {
    nombre,
    tipo,
    correo,
    onInputChange,
    onResetForm,
    formState,
    setValues,
  } = useForm(fieldForm);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !tipo || !correo) return;
    startSavingUser(formState);
    handleCancelar();
  };

  const handleCancelar = () => {
    setActiveUser(null);
    resetForm();
  };

  const resetForm = () => {
    onResetForm();
  };

  useEffect(() => {
    if (activeUser && !isDelete) {
      setValues(activeUser);
    }
  }, [activeUser]);

  useEffect(() => {
    if (!isDelete && activeUser) {
      setValues(activeUser);
    } else {
      onResetForm();
    }
  }, [isDelete]);

  return (
    <div className="card border-secondary">
      <div className="card-header">
        <h3 className="mb-0">
          {hasUserSelected && !isDelete
            ? "Editar Usuario"
            : "Registrar Usuario"}
        </h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={nombre}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Tipo</label>
            <select
              name="tipo"
              className="form-select"
              value={tipo}
              onChange={onInputChange}
              required
            >
              <option value=""></option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={correo}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {hasUserSelected && !isDelete ? "Editar" : "Registrar"}
            </button>
            {hasUserSelected && !isDelete && (
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
  );
};
