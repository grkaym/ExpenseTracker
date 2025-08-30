import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SummaryCard from '@/components/SummaryCard';
import Chart from '@/components/Chart';

export default function Dashboard({ ...props }) {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <h2 className="text-xl/8 font-bold">This Month's Summary</h2>
      {/* Flex Container */}
      <div className="mt-4 flex gap-6">
        {/* Income */}
        <SummaryCard name="Total Income" amount={props.income} />
        {/* Expense */}
        <SummaryCard name="Total Expense" amount={props.expense} />
        {/* Net */}
        <SummaryCard name="Net" amount={props.net.toFixed(2)} />
      </div>
      {/* <Chart /> */}
    </AuthenticatedLayout>
  );
}
