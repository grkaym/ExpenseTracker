import Card from '@/components/Card';
import { formatCurrency, toYMD, toDateString } from '@/utils/format';

export default function RecurringRuleCard({ data }) {
  return (
    <Card className="max-w-xl">
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
        {/* recurring status (active or paused) */}
        <div className="flex justify-between">
          <div className="text-gray-400">Status</div>
          <div className="ml-4 font-bold">
            <span
              className={
                `rounded-full px-3 py-1 ` +
                (data.status === 'active'
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-gray-100 text-gray-500')
              }
            >
              {data.status}
            </span>
          </div>
        </div>
        {/* frequency */}
        <div className="flex justify-between leading-5">
          <div className="text-gray-400">Schedule</div>
          <div className="ml-4 font-bold">{data.frequency}</div>
        </div>
        {/* recurring start date */}
        <div className="flex justify-between leading-5">
          <div className="text-gray-400">Start</div>
          <div className="ml-4 font-bold">{toDateString(data.start_date)}</div>
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
