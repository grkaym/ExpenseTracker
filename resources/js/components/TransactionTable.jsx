import { formatCurrency } from '@/utils/format';
import { useCallback } from 'react';
import { Link, router } from '@inertiajs/react';

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
          <th className="w-36 border-l border-slate-200 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, index) => {
          const handleDelete = useCallback(() => {
            // Confirm then call server to delete
            // eslint-disable-next-line no-alert
            if (confirm('Delete this transaction?')) {
              router.delete(route('transactions.destroy', t.id));
            }
          }, [t.id]);

          return (
            <tr key={index} className="border-t odd:bg-white even:bg-gray-50">
              <td className="border-l border-slate-200 px-4 py-2">{t.date}</td>
              <td className="border-l border-slate-200 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: t.category?.color || '#cbd5e1' }}
                  />
                  <span>{t.category.name}</span>
                </div>
              </td>
              <td className="border-l border-slate-200 px-4 py-2">{t.type}</td>
              <td
                className={
                  `border-l border-slate-200 px-4 py-2 text-right ` +
                  (t.type === 'expense' ? 'text-red-400' : 'text-blue-400')
                }
              >
                ${formatCurrency(t.amount)}
              </td>
              <td className="truncate border-l border-slate-200 px-4 py-2">
                {t.note}
              </td>
              <td className="border-l border-slate-200 px-4 py-2">
                <div className="flex gap-2">
                  <Link
                    href={route('transactions.edit', t.id)}
                    className="rounded px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded px-3 py-1 text-sm font-medium text-red-600 ring-1 ring-red-100 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
