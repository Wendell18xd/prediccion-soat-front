import Modal from "react-bootstrap/Modal";
import { useModalStore } from "../../../hooks/useModalStore";
import { useForm, usePredictionStore } from "../../../hooks";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { useState } from "react";
import { LoadingOverlay } from "../../../components/LoadingOverlay";

const fields = {
  fileUpload: null,
};

export const ModalCargaExcel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, modalType, hideModal } = useModalStore();
  const { fileUpload, setValues } = useForm(fields);
  const { startListPredictions } = usePredictionStore();

  const handleHideModal = () => {
    hideModal();
    setValues(fields); // Reinicia los valores del formulario al cerrar el modal
  };

  // Función para manejar la selección de archivos
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
      "text/csv", // .csv
    ];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Formato de archivo no permitido. Solo se permiten archivos .xlsx, .xls y .csv.",
      });
      e.target.value = null; // Limpia el input
      return;
    }

    setValues({ fileUpload: file }); // Guarda el archivo en el estado
  };

  const startCargarClientes = async (e) => {
    e.preventDefault();

    if (!fileUpload) {
      Swal.fire({
        icon: "warning",
        title: "Por favor, selecciona un archivo.",
        text: "",
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = await fileUpload.arrayBuffer();
      setIsLoading(false);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Primera hoja
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" }); // Convierte a JSON

      await startListPredictions("2", jsonData);

      Swal.fire("Exito!", "Carga de clientes exitosa", "success");

      handleHideModal();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Error al procesar el archivo", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {modalType === "uploadClientes" && (
        <Modal show={isOpen} onHide={handleHideModal}>
          <Modal.Header closeButton className="bg-primary" closeVariant="white">
            <Modal.Title className="text-white">Carga de clientes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={startCargarClientes}>
              <div className="mb-3">
                <label htmlFor="fileUpload" className="form-label w-100">
                  Subir archivo (Excel o CSV)
                  <a
                    href="/assets/plantillas/plantilla_prediccion.xlsx"
                    download="Plantilla Clientes.xlsx"
                    className="link-info float-end"
                  >
                    Descargar plantilla
                  </a>
                </label>
                <input
                  type="file"
                  name="fileUpload"
                  onChange={handleFileChange}
                  className="form-control"
                  accept=".xlsx, .xls, .csv"
                />
              </div>
              <button className="btn btn-primary float-end">
                Empezar carga
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}

      <LoadingOverlay show={isLoading} />
    </>
  );
};
