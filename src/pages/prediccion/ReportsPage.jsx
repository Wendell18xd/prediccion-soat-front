import DataTable from "react-data-table-component";
import { Navbar } from "../../components/Navbar";
import { useExportToExcel, usePredictionStore } from "../../hooks";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "../../components/LoadingOverlay";

const columnsMap = {
  Estado: "estado_emision_prediccion",
  "Probabilidad (%)": "probabilidad",
  Contratante: "nombre_contratante",
  DNI: "nro_documento",
  Placa: "placa",
  Canal: "canal",
  Departamento: "departamento",
  Provincia: "provincia",
  Distrito: "distrito",
  Dirección: "direccion_contratante",
  "Inicio Vigencia": "fec_ini_vig",
  "Fin Vigencia": "fec_fin_vig",
  "Monto Bruto": "monto_bruto",
  Prima: "monto_prima",
  "Medio de Pago": "medio_de_pago",
  "Tipo Persona": "tipo_de_persona",
};

export const ReportsPage = () => {
  const { isLoading, predicciones, startListPredictions } =
    usePredictionStore();
  const [filterPredicciones, setFilterPredicciones] = useState(predicciones);
  const { exportToExcel } = useExportToExcel();

  const columns = [
    {
      name: "Estado",
      selector: (row) => row.estado_emision_prediccion,
      wrap: false,
      sortable: true,
      cell: (row) => (
        <span
          className={`badge bg-${
            row.estado_emision_prediccion === "Activa" ? "success" : "danger"
          }`}
        >
          {row.estado_emision_prediccion}
        </span>
      ),
    },
    {
      name: "Probabilidad (%)",
      selector: (row) => parseFloat(row.probabilidad).toFixed(2),
      sortable: true,
      wrap: false,
    },
    {
      name: "Contratante",
      selector: (row) => row.nombre_contratante,
      sortable: true,
      wrap: false,
    },
    {
      name: "DNI",
      selector: (row) => row.nro_documento,
      sortable: true,
      wrap: false,
    },
    {
      name: "Placa",
      selector: (row) => row.placa,
      sortable: true,
      wrap: false,
    },
    {
      name: "Canal",
      selector: (row) => row.canal,
      sortable: true,
      wrap: false,
    },
    {
      name: "Departamento",
      selector: (row) => row.departamento,
      sortable: true,
      wrap: false,
    },
    {
      name: "Provincia",
      selector: (row) => row.provincia,
      sortable: true,
      wrap: false,
    },
    {
      name: "Distrito",
      selector: (row) => row.distrito,
      sortable: true,
      wrap: false,
    },
    {
      name: "Dirección",
      selector: (row) => row.direccion_contratante,
      wrap: false,
    },
    {
      name: "Inicio Vigencia",
      selector: (row) => new Date(row.fec_ini_vig).toLocaleDateString(),
      sortable: true,
      wrap: false,
    },
    {
      name: "Fin Vigencia",
      selector: (row) => new Date(row.fec_fin_vig).toLocaleDateString(),
      sortable: true,
      wrap: false,
    },
    {
      name: "Monto Bruto",
      selector: (row) => `S/ ${parseFloat(row.monto_bruto).toFixed(2)}`,
      wrap: false,
    },
    {
      name: "Prima",
      selector: (row) => `S/ ${parseFloat(row.monto_prima).toFixed(2)}`,
      wrap: false,
    },
    {
      name: "Medio Pago",
      selector: (row) => row.medio_de_pago,
      wrap: false,
    },
    {
      name: "Tipo Persona",
      selector: (row) => row.tipo_de_persona,
      wrap: false,
    },
  ];

  const handleChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "") {
      setFilterPredicciones(predicciones); // Todos
    } else {
      const filtradas = predicciones.filter(
        (prediccion) => prediccion.estado_emision_prediccion === selectedValue
      );
      setFilterPredicciones(filtradas);
    }
  };

  const handleExport = () => {
    exportToExcel(filterPredicciones, columnsMap, "Reporte_Predicciones.xlsx");
  };

  useEffect(() => {
    if (predicciones.length === 0) {
      startListPredictions();
    }
  }, []);

  useEffect(() => {
    setFilterPredicciones(predicciones);
  }, [predicciones]);

  return (
    <>
      <Navbar />
      <div className="m-4">
        <div className="row mb-4">
          <div className="col-md-9">
            <h3 className="mb-3">Reporte de Predicciones</h3>
            <button
              className="btn btn-success mt-2"
              onClick={handleExport}
              disabled={filterPredicciones.length === 0}
            >
              <i className="fas fa-file-excel me-2"></i> Exportar
            </button>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <label className="form-label">Tipo de Predicción</label>
                <select className="form-select" onChange={handleChange}>
                  <option value="">(TODOS)</option>
                  <option value="Activa">RENOVARAN</option>
                  <option value="Cancelada">NO RENOVARAN</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filterPredicciones}
          pagination
          striped
          highlightOnHover
          responsive
          persistTableHead
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 335px)"
          noDataComponent="No hay datos disponibles"
        />
      </div>

      <LoadingOverlay show={isLoading} />
    </>
  );
};
