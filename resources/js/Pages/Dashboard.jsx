import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SummaryCard from '@/components/SummaryCard';
import Chart from '@/components/Chart';
import Card from '@/components/Card';
import TransactionTable from '@/components/TransactionTable';

export default function Dashboard({
  income,
  expense,
  net,
  chartData,
  recentTrans,
}) {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <h2 className="text-xl/8 font-bold">This Month's Summary</h2>
      {/* Summary Cards */}
      <div className="my-4 flex flex-col gap-6 md:flex-row">
        {/* Income */}
        <SummaryCard name="Total Income" amount={income} />
        {/* Expense */}
        <SummaryCard name="Total Expense" amount={expense} />
        {/* Net */}
        <SummaryCard name="Net" amount={net.toFixed(2)} />
      </div>
      {/* Monthly Combo Chart */}
      <h2 className="mt-8 text-xl/8 font-bold">Monthly Chart</h2>
      <Card className="my-4">
        <Chart data={chartData} />
      </Card>
      {/* Recent Transactions */}
      <h2 className="mt-8 text-xl/8 font-bold">Recent Transactions</h2>
      <Card className="my-4 overflow-x-auto">
        <TransactionTable transactions={recentTrans} />
      </Card>
    </AuthenticatedLayout>
  );
}
