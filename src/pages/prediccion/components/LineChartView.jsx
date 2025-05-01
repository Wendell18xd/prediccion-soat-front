import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const LineChartView = ({ height, data, name = "grafico" }) => {
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
          <LineChart data={data}>
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="montoBruto"
              stroke="#0d6efd"
              name="Monto Bruto"
            />
            <Line
              type="monotone"
              dataKey="montoPrima"
              stroke="#20c997"
              name="Monto Prima"
            />
            <Line
              type="monotone"
              dataKey="probabilidad"
              stroke="#ffc107"
              name="Probabilidad"
            />
          </LineChart>
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
