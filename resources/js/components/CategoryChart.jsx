import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/format';

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
    <div className="flex gap-4">
      <ResponsiveContainer width="100%" height={500} className="flex-1">
        <PieChart width={450} height={500} className="flex-1">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="80%"
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
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-bold"
          >
            <tspan
              fill="#475569" // slate-600 背景色
              stroke="white"
              strokeWidth="4"
              paintOrder="stroke"
            >
              {`$${formatCurrency(total.toFixed(2))}`}
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
      <ul className="flex w-full flex-1 flex-col items-start justify-center space-y-2 pl-4 md:flex-col">
        {catList.map((entry, index) => (
          <li
            key={`label-${entry.name}`}
            className={`text-[${COLORS[index % COLORS.length]}]`}
          >
            {entry.name} - ${formatCurrency(entry.value.toFixed(2))} (
            {entry.percent.toFixed(1)}
            %)
          </li>
        ))}
      </ul>
    </div>
  );
}
