import { Navbar } from "../../components/Navbar";
import { useUserStore } from "../../hooks/useUserStore";
import { FormUser } from "./components/user/FormUser";
import { TablaUser } from "./components/user/TablaUser";
import { useModalStore } from "../../hooks/useModalStore";
import { ConfirmModal } from "../../components/ConfirmModal";

export const UserPage = () => {
  const { startDeletingUser, setActiveUser } = useUserStore();
  const { showModal, setToogleModal } = useModalStore();

  const handleDeleteUser = () => {
    startDeletingUser();
    setToogleModal();
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
    </>
  );
};
