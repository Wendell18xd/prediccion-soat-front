import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";

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

export const PieChartView = ({ height, data, name = "grafico" }) => {
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
          <PieChart>
            <Pie
              data={data}
              dataKey="riesgo"
              nameKey="nombre"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
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
