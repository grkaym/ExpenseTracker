import Card from '@/components/Card';

export default function SummaryCard({ ...props }) {
  return (
    <Card className="grid h-[120px] min-w-[300px] items-center">
      <span className="text-gray-500">{props.name}</span>
      <div className="flex items-center text-4xl">
        <span className="mr-1 text-2xl">$</span>
        {props.amount}
      </div>
    </Card>
  );
}
