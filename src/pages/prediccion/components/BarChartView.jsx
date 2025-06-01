import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useExportToExcel } from "../../../hooks";

const columnsMap = {
  Provincia: "provincia",
  "Probabilidad Activa(%)": "riesgoActiva",
  "Probabilidad Cancelada(%)": "riesgoCancelada",
};

export const BarChartView = ({ height, data, name = "grafico" }) => {
  const chartRef = useRef(null);
  const { exportToExcel } = useExportToExcel();

  const handleExport = async () => {
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement("a");
    link.download = name + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleExportExcel = () => {
    exportToExcel(data, columnsMap, name + ".xlsx");
  };

  return (
    <>
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <XAxis dataKey="provincia" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="riesgoActiva"
              fill="#0d6efd"
              name="Posible renovación"
            />
            <Bar
              dataKey="riesgoCancelada"
              fill="#dc3545"
              name="Posible no renovación"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <button
        onClick={handleExport}
        className="btn btn-sm btn-outline-primary mt-2"
        title="Descargar gráfico como imagen"
      >
        <i className="fas fa-download"></i>
      </button>
      <button
        onClick={handleExportExcel}
        className="btn btn-sm btn-outline-success mt-2 ms-2"
        title="Exportar datos del grafico"
      >
        <i className="fas fa-file-excel"></i>
      </button>
    </>
  );
};
