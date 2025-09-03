import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SummaryCard from '@/components/SummaryCard';
import Chart from '@/components/Chart';

export default function Dashboard({ income, expense, net }) {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <h2 className="text-xl/8 font-bold">This Month's Summary</h2>
      {/* Flex Container */}
      <div className="mt-4 flex gap-6">
        {/* Income */}
        <SummaryCard name="Total Income" amount={income} />
        {/* Expense */}
        <SummaryCard name="Total Expense" amount={expense} />
        {/* Net */}
        <SummaryCard name="Net" amount={net.toFixed(2)} />
      </div>
      {/* <Chart /> */}
    </AuthenticatedLayout>
  );
}
