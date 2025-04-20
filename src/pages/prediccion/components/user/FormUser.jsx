import { useEffect } from "react";
import { useForm } from "../../../../hooks";
import { useUserStore } from "../../../../hooks/useUserStore";
import Swal from "sweetalert2";

const fieldForm = {
  name: "",
  tipo: "",
  email: "",
};

export const FormUser = () => {
  const {
    activeUser,
    setActiveUser,
    startSavingUser,
    hasUserSelected,
    isDelete,
    tipos,
  } = useUserStore();
  const {
    name,
    tipo,
    email,
    onInputChange,
    onResetForm,
    formState,
    setValues,
  } = useForm(fieldForm);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !tipo || !email) return;
    try {
      await startSavingUser(formState);
      if (activeUser) {
        Swal.fire("Exito!", "Usuario actualizado correctamente", "success");
      } else {
        Swal.fire("Exito!", "Usuario registrado correctamente", "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
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
              name="name"
              className="form-control"
              value={name}
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
              {tipos.map((f) => (
                <option value={f.cod_para} key={f.cod_para}>
                  {f.nom_para}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Correo</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
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
