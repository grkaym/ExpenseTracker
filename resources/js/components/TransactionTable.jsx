export default function TransactionTable({ transactions }) {
  return (
    <table className="w-full table-fixed border shadow-sm">
      <thead>
        <tr className="bg-slate-100 text-left">
          <th className="w-32 border-l border-slate-200 px-4 py-2">Date</th>
          <th className="w-48 border-l border-slate-200 px-4 py-2">Category</th>
          <th className="w-24 border-l border-slate-200 px-4 py-2">Type</th>
          <th className="w-64 border-l border-slate-200 px-4 py-2">Amount</th>
          <th className="w-64 truncate border-l border-slate-200 px-4 py-2">
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, index) => {
          return (
            <tr key={index} className="border-t odd:bg-white even:bg-gray-50">
              <td className="border-l border-slate-200 px-4 py-2">{t.date}</td>
              <td className="border-l border-slate-200 px-4 py-2">
                {t.category.name}
              </td>
              <td className="border-l border-slate-200 px-4 py-2">{t.type}</td>
              <td
                className={
                  `border-l border-slate-200 px-4 py-2 text-right ` +
                  (t.type === 'expense' ? 'text-red-400' : 'text-blue-400')
                }
              >
                ${t.amount}
              </td>
              <td className="truncate border-l border-slate-200 px-4 py-2">
                {t.note}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
