import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const BarChartView = ({ height, data }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <XAxis dataKey="provincia" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="riesgoActiva" fill="#0d6efd" name="Posible renovación" />
        <Bar
          dataKey="riesgoCancelada"
          fill="#dc3545"
          name="Posible no renovación"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
