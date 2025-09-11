import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Bar,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
export default function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart data={data}>
        <XAxis dataKey="ym" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar
          dataKey="expense_total"
          barSize={30}
          fill="#f87171"
          name="expense"
        />
        <Line
          type="monotone"
          dataKey="income_total"
          stroke="#60a5fa"
          name="income"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
