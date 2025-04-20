import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ConfirmModal = ({
  showModal,
  handelHideModal,
  handleConfirm,
  title = "",
  body = "",
}) => {
  return (
    <Modal show={showModal} onHide={handelHideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handelHideModal}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
