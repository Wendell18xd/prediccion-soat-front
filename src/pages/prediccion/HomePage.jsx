import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { usePredictionStore } from "../../hooks";
import { Loading } from "../../components/Loading";
import Swal from "sweetalert2";
import { PieChartView } from "./components/PieChartView";
import { useChart } from "./hooks/useChart";
import { BarChartView } from "./components/BarChartView";

export const HomePage = () => {
  const { isLoading, predicciones, startListPredictions, errorMessage } =
    usePredictionStore();

  const {
    dataActiva,
    dataCancelada,
    dataProvinciaChart,
    mapDataDistritoChart,
    mapDataProvinciaChart,
  } = useChart();

  /* useEffect(() => {
    if (predicciones.length === 0) {
      startListPredictions();
    }
  }, []); */

  useEffect(() => {
    mapDataDistritoChart(predicciones);
    mapDataProvinciaChart(predicciones);
  }, [predicciones]);

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error", errorMessage, "error");
    }
  }, [errorMessage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="m-4 p-0">
        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={startListPredictions}
          >
            <i className="fa-solid fa-rotate me-2"></i>
            Actualizar información de clientes
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
        </div>
      </div>
    </>
  );
};
