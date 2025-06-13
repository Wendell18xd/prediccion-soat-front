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

export const BarChartView = ({
  height,
  data,
  name = "grafico",
  label1 = "",
  label2 = "",
  key0 = "",
  key1 = "",
  key2 = "",
  columnsMap,
}) => {
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
            <XAxis dataKey={key0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={key1} fill="#0d6efd" name={label1} />
            <Bar dataKey={key2} fill="#dc3545" name={label2} />
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
