import Card from '@/components/Card';

export default function SummaryCard({ ...props }) {
  return (
    <Card className="grid h-[120px] w-full items-center lg:max-w-[300px]">
      <span className="text-gray-500">{props.name}</span>
      <div className="flex items-center text-4xl">
        <span className="mr-1 text-2xl">$</span>
        {props.amount}
      </div>
    </Card>
  );
}
