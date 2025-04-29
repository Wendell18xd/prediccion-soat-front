import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useHistorialStore, usePredictionStore } from "../../hooks";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import moment from "moment";
import { useNavigate } from "react-router";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#1a1a1a",
      color: "#fff",
      fontWeight: "bold",
    },
  },
};

export const HistorialPage = () => {
  const { historiales, isLoading, startListHistorial } = useHistorialStore();
  const { isLoading: isLoadPred, listPrediccionWithCodigo } =
    usePredictionStore();
  const navigate = useNavigate();

  const columns = [
    {
      name: "Codigo",
      selector: (row) => row.codigo,
      sortable: true,
      wrap: false,
    },
    {
      name: "Porcentaje (%)",
      selector: (row) => parseFloat(row.porcentaje).toFixed(2),
      sortable: true,
      wrap: false,
    },
    {
      name: "Fecha",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
      sortable: true,
      wrap: false,
    },
    {
      name: "Usuario",
      selector: (row) => row.userName,
      sortable: true,
      wrap: false,
    },
    {
      name: "",
      cell: (row) => (
        <button
          className="btn btn-sm btn-outline-info w-100"
          onClick={() => handleCargar(row)}
        >
          <i className="fa-solid fa-magnifying-glass me-2"></i>Ver Predicción
        </button>
      ),
      ignoreRowClick: true,
      width: "12%",
    },
  ];

  const handleCargar = async (row) => {
    try {
      await listPrediccionWithCodigo(row.codigo);
      navigate("/");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  useEffect(() => {
    if (historiales.length === 0) {
      startListHistorial()
        .then(() => {})
        .catch((error) => {
          Swal.fire("Error!", error.message, "error");
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="m-4">
        <div className="row"></div>
        <div className="col-md-12">
          <h1>Historial de Predicciones</h1>
          <p>Aquí puedes ver el historial de predicciones realizadas.</p>
        </div>

        <hr />

        <DataTable
          columns={columns}
          data={historiales}
          pagination
          striped
          highlightOnHover
          responsive
          persistTableHead
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 335px)"
          noDataComponent="No hay datos disponibles"
          customStyles={customStyles}
        />
      </div>
      <LoadingOverlay show={isLoading || isLoadPred} />
    </>
  );
};
