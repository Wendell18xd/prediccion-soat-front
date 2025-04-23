import { Navbar } from "../../components/Navbar";
import { useUserStore } from "../../hooks/useUserStore";
import { FormUser } from "./components/user/FormUser";
import { TablaUser } from "./components/user/TablaUser";
import { useModalStore } from "../../hooks/useModalStore";
import { ConfirmModal } from "../../components/ConfirmModal";
import Swal from "sweetalert2";
import { LoadingOverlay } from "../../components/LoadingOverlay";

export const UserPage = () => {
  const {
    startDeletingUser,
    setActiveUser,
    startSendResetPasswordUser,
    isLoading,
  } = useUserStore();
  const { isOpen, modalType, modalProps, hideModal } = useModalStore();

  const handleDeleteUser = async () => {
    hideModal();
    try {
      await startDeletingUser();
      Swal.fire("Exito!", "Usuario eliminado correctamente", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
    setActiveUser(null);
  };

  const handelHideModal = () => {
    hideModal();
    setActiveUser(null);
  };

  const handleSendEmail = async () => {
    hideModal();
    try {
      await startSendResetPasswordUser();
      Swal.fire("Exito!", "Correo enviado correctamente", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
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
      {modalType === "deleteUser" && (
        <ConfirmModal
          showModal={isOpen}
          handelHideModal={handelHideModal}
          handleConfirm={handleDeleteUser}
          btnColor="danger"
          btnLabel="Eliminar"
          title="Confirmar Eliminación"
          body="¿Estás seguro de que deseas eliminar este usuario?"
        />
      )}

      {modalType === "sendEmail" && (
        <ConfirmModal
          showModal={isOpen}
          handelHideModal={handelHideModal}
          handleConfirm={handleSendEmail}
          btnColor="info"
          btnLabel="Enviar"
          title="Confirmar envio de correo"
          body={`Se enviará un correo con el link de restablecimiento de contraseña al usuario seleccionado. ${modalProps.user.email}`}
        />
      )}

      <LoadingOverlay show={isLoading} />
    </>
  );
};
