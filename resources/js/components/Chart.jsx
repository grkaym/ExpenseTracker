import { Pie, PieChart, Tooltip } from 'recharts';
export default function Chart() {
  return (
    <PieChart width={400} height={400}>
      <Pie
        activeShape={{
          fill: 'oklch(76.9% 0.188 70.08)',
        }}
        data={[
          { name: 'Page A', uv: 590 },
          { name: 'Page B', uv: 590 },
          { name: 'Page C', uv: 868 },
        ]}
        dataKey="uv"
      />
      <Tooltip defaultIndex={2} />
    </PieChart>
  );
}
