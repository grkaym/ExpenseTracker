import Card from '@/components/Card';
import { formatCurrency } from '@/utils/format';

export default function SummaryCard({
  name,
  amount,
  amountStyle = '',
  className = '',
}) {
  return (
    <Card
      className={
        `grid h-[120px] w-full items-center lg:max-w-[300px] ` + className
      }
    >
      <span className="text-gray-500">{name}</span>
      <div className="flex items-center text-4xl">
        <span className="mr-1 text-2xl">$</span>
        <span className={amountStyle}>{formatCurrency(amount)}</span>
      </div>
    </Card>
  );
}
