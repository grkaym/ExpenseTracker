import Card from '@/components/Card';
import { formatCurrency, toYMD } from '@/utils/format';
import { useCallback } from 'react';
import { Link, router } from '@inertiajs/react';

export default function TransactionCard({ data }) {
  const handleEdit = useCallback(() => {
    // Placeholder: server handling not implemented yet
    // eslint-disable-next-line no-alert
    alert(`Edit clicked for transaction id: ${data.id} (not implemented)`);
  }, [data.id]);

  const handleDelete = useCallback(() => {
    // Confirm then call server to delete
    // eslint-disable-next-line no-alert
    if (confirm('Delete this transaction?')) {
      router.delete(route('transactions.destroy', data.id));
    }
  }, [data.id]);

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: data.category?.color || '#cbd5e1' }}
          />
          <p className="text-xl font-bold">{data.category.name}</p>
          {/* transaction type */}
          <div>
            <span className="text-sm text-gray-400">{data.type}</span>
          </div>
        </div>
        {/* amount */}
        <div>
          <span
            className={
              data.type === 'expense' ? 'text-red-400' : 'text-blue-400'
            }
          >
            ${formatCurrency(data.amount)}
          </span>
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Link
          href={route('transactions.edit', data.id)}
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
      <hr className="mb-2 mt-4" />
      <div className="space-y-2">
        {/* date */}
        <div className="leading-5">
          <div className="text-gray-400">Date</div>
          <div className="ml-4 font-bold">{toYMD(data.date)}</div>
        </div>
        {/* note (if exists) */}
        {data.note && (
          <div className="leading-5">
            <div className="text-gray-400">Note</div>
            <div className="ml-4 truncate italic">{data.note}</div>
          </div>
        )}
      </div>
    </Card>
  );
}
