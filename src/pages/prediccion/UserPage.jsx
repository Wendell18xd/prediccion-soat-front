import { Navbar } from "../../components/Navbar";
import { useUserStore } from "../../hooks/useUserStore";
import { FormUser } from "./components/user/FormUser";
import { TablaUser } from "./components/user/TablaUser";
import { useModalStore } from "../../hooks/useModalStore";
import { ConfirmModal } from "../../components/ConfirmModal";
import Swal from "sweetalert2";
import { LoadingOverlay } from "../../components/LoadingOverlay";

export const UserPage = () => {
  const { startDeletingUser, setActiveUser, isLoading } = useUserStore();
  const { showModal, setToogleModal } = useModalStore();

  const handleDeleteUser = async () => {
    setToogleModal();
    try {
      await startDeletingUser();
      Swal.fire("Exito!", "Usuario eliminado correctamente", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
    setActiveUser(null);
  };

  const handelHideModal = () => {
    setToogleModal();
    setActiveUser(null);
  };

  return (
    <>
      <Navbar />
      <div className="m-4">
        <div className="row">
          {/* Formulario */}
          <div className="col-md-4">
            <FormUser />
          </div>

          {/* Tabla de usuarios */}
          <div className="col-md-8">
            <TablaUser />
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        showModal={showModal}
        handelHideModal={handelHideModal}
        handleConfirm={handleDeleteUser}
        title="Confirmar Eliminación"
        body="¿Estás seguro de que deseas eliminar este usuario?"
      />

      <LoadingOverlay show={isLoading} />
    </>
  );
};
