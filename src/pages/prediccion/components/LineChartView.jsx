import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const LineChartView = ({ height, data }) => {
  return (
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
  );
};
