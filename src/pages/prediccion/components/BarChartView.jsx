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

export const BarChartView = ({ height, data, name = "grafico" }) => {
  const chartRef = useRef(null);

  const handleExport = async () => {
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement("a");
    link.download = name + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
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
    </>
  );
};
