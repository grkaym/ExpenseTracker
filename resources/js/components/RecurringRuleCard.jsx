import Card from '@/components/Card';
import { formatCurrency, toYMD } from '@/utils/format';

export default function RecurringRuleCard({ data }) {
  return (
    <Card className="max-w-xl">
      <div className="flex justify-between">
        <p className="text-xl font-bold">{data.category.name}</p>
        <div className="flex gap-4">
          {/* transaction type */}
          <div>{data.type}</div>
          {/* recurring status (active or paused) */}
          <div>{data.status}</div>
        </div>
      </div>
      <div>
        {/* amount */}
        <div>Amount: ${formatCurrency(data.amount)}</div>
        {/* frequency */}
        <div>Schedule: {data.frequency}</div>
        {/* recurring start date */}
        <div>Start: {toYMD(data.start_date)}</div>
        {/* recurring end date (if exists) */}
        {data.end_date && <div>End: {toYMD(data.end_date)}</div>}
        {/* next run data */}
        <div>Next: {toYMD(data.next_run_date)}</div>
        {/* note (if exists) */}
        {data.note && <div>Note: {data.note}</div>}
      </div>
    </Card>
  );
}
