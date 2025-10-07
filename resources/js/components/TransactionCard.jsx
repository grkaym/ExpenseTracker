import Card from '@/components/Card';
import { formatCurrency, toYMD } from '@/utils/format';

export default function TransactionCard({ data }) {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
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
