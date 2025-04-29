import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { usePredictionStore } from "../../hooks";
import Swal from "sweetalert2";
import { PieChartView } from "./components/PieChartView";
import { useChart } from "./hooks/useChart";
import { BarChartView } from "./components/BarChartView";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { LineChartView } from "./components/LineChartView";
import { useModalStore } from "../../hooks/useModalStore";
import { ModalCargaExcel } from "./components/ModalCargaExcel";

export const HomePage = () => {
  const {
    isLoading,
    predicciones,
    startListPredictions,
    listUltimaPrediccion,
    errorMessage,
  } = usePredictionStore();
  const { showModal } = useModalStore();

  const {
    dataActiva,
    dataCancelada,
    dataProvinciaChart,
    mapDataDistritoChart,
    mapDataProvinciaChart,
    dataCanceladaLineChart,
    mapDataCanceladaLineChart,
  } = useChart();

  useEffect(() => {
    if (predicciones.length === 0) {
      listUltimaPrediccion()
        .then(() => {})
        .catch((error) => {
          Swal.fire("Error!", error.message, "error");
        });
    }
  }, []);

  useEffect(() => {
    mapDataDistritoChart(predicciones);
    mapDataProvinciaChart(predicciones);
    mapDataCanceladaLineChart(predicciones);
  }, [predicciones]);

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <>
      <Navbar />
      <div className="m-4 p-0">
        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-info btn-sm me-2"
            onClick={() => startListPredictions()}
          >
            <i className="fa-solid fa-rotate me-2"></i>
            Clientes API
          </button>

          <button
            className="btn btn-success btn-sm"
            onClick={() => showModal("uploadClientes")}
          >
            <i className="fas fa-file-excel me-2"></i>
            Cargar Clientes
          </button>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card border-secondary mb-3">
              <div className="card-header">
                Distritos con posible renovación
              </div>
              <div className="card-body">
                <PieChartView height={300} data={dataActiva} />
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card border-secondary mb-3">
              <div className="card-header">
                Distritos con posible no renovación
              </div>
              <div className="card-body">
                <PieChartView height={300} data={dataCancelada} />
              </div>
            </div>
          </div>

          <div className="col-md-12 mb-4">
            <div className="card border-secondary mb-3">
              <div className="card-header">Provincias</div>
              <div className="card-body">
                <BarChartView height={500} data={dataProvinciaChart} />
              </div>
            </div>
          </div>

          <div className="col-md-12 mb-4">
            <div className="card border-secondary mb-3">
              <div className="card-header">Tendencia de Cancelaciones</div>
              <div className="card-body">
                <LineChartView height={400} data={dataCanceladaLineChart} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalCargaExcel />

      <LoadingOverlay show={isLoading} />
    </>
  );
};
