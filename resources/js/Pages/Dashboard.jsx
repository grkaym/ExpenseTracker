import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SummaryCard from '@/components/SummaryCard';
import Chart from '@/components/Chart';
import Card from '@/components/Card';
import TransactionTable from '@/components/TransactionTable';
import CategoryChart from '@/components/CategoryChart';

export default function Dashboard({
  income,
  expense,
  net,
  chartData,
  recentTrans,
  pieData,
}) {
  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <h2 className="text-xl/8 font-bold">This Month's Summary</h2>
      {/* Summary Cards */}
      <div className="my-4 flex flex-col gap-6 md:flex-row">
        {/* Income */}
        <SummaryCard
          name="Total Income"
          amount={income}
          amountStyle="text-blue-400"
        />
        {/* Expense */}
        <SummaryCard
          name="Total Expense"
          amount={expense}
          amountStyle="text-red-400"
        />
        {/* Net */}
        <SummaryCard
          name="Net"
          amount={net.toFixed(2)}
          className={net > 0 ? '!bg-blue-50' : '!bg-red-50'}
          amountStyle={net > 0 ? 'text-blue-400' : 'text-red-400'}
        />
      </div>
      <div className="flex flex-col md:gap-4 lg:flex-row">
        {/* Monthly Combo Chart */}
        <div className="flex-1">
          <h2 className="mt-8 text-xl/8 font-bold">
            Monthly Expenses and Income
          </h2>
          <Card className="my-4">
            <Chart data={chartData} />
          </Card>
        </div>
        <div className="flex-1">
          {/* Category Chart */}
          <h2 className="mt-8 text-xl/8 font-bold">
            This Month's Expenses by Category
          </h2>
          <Card className="my-4">
            <CategoryChart data={pieData} />
          </Card>
        </div>
      </div>
      {/* Recent Transactions */}
      <h2 className="mt-8 text-xl/8 font-bold">Recent Transactions</h2>
      <Card className="my-4 overflow-x-auto">
        <TransactionTable transactions={recentTrans} />
      </Card>
    </AuthenticatedLayout>
  );
}
