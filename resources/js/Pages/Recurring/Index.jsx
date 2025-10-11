import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RecurringRuleCard from '@/components/RecurringRuleCard';
import Button from '@/components/Button';
import { Link } from '@inertiajs/react';

export default function Index({ recurringRules }) {
  const existRuleFlg = recurringRules.length > 0;

  return (
    <AuthenticatedLayout>
      <div className="align-center flex justify-between">
        <h2 className="text-xl/8 font-bold">Recurring Rules</h2>
        {existRuleFlg && (
          <Link href={route('recurring.create')}>
            <Button text="+ Add Recurring Rule" />
          </Link>
        )}
      </div>
      {existRuleFlg ? (
        <div className="mt-4 gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
          {recurringRules.map((recurringRule, index) => {
            return <RecurringRuleCard data={recurringRule} key={index} />;
          })}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center text-gray-500">
          <p className="mb-4">No recurring rules yet.</p>
          <p className="mb-4">
            You can create rules to automatically add transactions.
          </p>
          <Link href={route('recurring.create')}>
            <Button text="+ Add Recurring Rule" />
          </Link>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
