import { useEffect, useState } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import { Navbar } from "../../components/Navbar";
import { usePredictionStore } from "../../hooks";
import { Loading } from "../../components/Loading";
import Swal from "sweetalert2";

const COLORS = [
  "#007bff",
  "#6610f2",
  "#6f42c1",
  "#e83e8c",
  "#fd7e14",
  "#20c997",
  "#17a2b8",
  "#ffc107",
];

export const HomePage = () => {
  const { isLoading, predicciones, startListPredictions, errorMessage } =
    usePredictionStore();
  const [dataActiva, setDataActiva] = useState([]);
  const [dataCancelada, setDataCancelada] = useState([]);

  const armarGraficos = () => {
    const activas = {};
    const canceladas = {};

    predicciones.forEach((p) => {
      const key = p.distrito || "Desconocido";
      const prob = parseFloat(p.probabilidad) || 0;

      if (p.estado_emision_prediccion === "Activa") {
        if (!activas[key]) activas[key] = { total: 0, count: 0 };
        activas[key].total += prob;
        activas[key].count += 1;
      } else if (p.estado_emision_prediccion === "Cancelada") {
        if (!canceladas[key]) canceladas[key] = { total: 0, count: 0 };
        canceladas[key].total += prob;
        canceladas[key].count += 1;
      }
    });

    const formatear = (obj) =>
      Object.entries(obj).map(([distrito, { total, count }]) => ({
        distrito,
        riesgo: parseFloat((total / count).toFixed(2)), // Promedio redondeado
      }));

    setDataActiva(formatear(activas));
    setDataCancelada(formatear(canceladas));
  };

  /* useEffect(() => {
    if (predicciones.length === 0) {
      startListPredictions();
    }
  }, []); */

  useEffect(() => {
    armarGraficos();
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
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataActiva}
                      dataKey="riesgo"
                      nameKey="distrito"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {dataActiva.map((_, index) => (
                        <Cell
                          key={`cell-activa-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card border-secondary mb-3">
              <div className="card-header">
                Distritos con posible no renovación
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataCancelada}
                      dataKey="riesgo"
                      nameKey="distrito"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {dataCancelada.map((_, index) => (
                        <Cell
                          key={`cell-cancelada-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
