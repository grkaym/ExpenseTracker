import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#34d399', // green-400
  '#fbbf24', // amber-400
  '#a78bfa', // violet-400
  '#f472b6', // pink-400
  '#facc15', // yellow-400
  '#fb923c', // orange-400
  '#2dd4bf', // teal-400
  '#e879f9', // fuchsia-400
  '#84cc16', // lime-500
  '#14b8a6', // cyan-600
];

export default function CategoryChart({ data }) {
  // Calculate expense's percent by category
  const total = data.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);
  const catList = data.map((item) => ({
    ...item,
    percent: (item.value / total) * 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={500}>
      <div className="flex flex-row items-center gap-4">
        <PieChart width={450} height={500} className="flex-1">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={180}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <text
            x={225}
            y={40}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-bold"
            fill="#475569"
          >
            {`Total: $${total.toFixed(2)}`}
          </text>
        </PieChart>
        <ul className="flex w-full flex-1 flex-col items-start space-y-2 pl-4 sm:flex-row md:flex-col">
          {catList.map((entry, index) => (
            <li
              key={`label-${entry.name}`}
              className={`text-[${COLORS[index % COLORS.length]}]`}
            >
              {entry.name} - ${entry.value.toFixed(2)} (
              {entry.percent.toFixed(1)}%)
            </li>
          ))}
        </ul>
      </div>
    </ResponsiveContainer>
  );
}
