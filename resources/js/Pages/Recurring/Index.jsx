import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RecurringRuleCard from '@/components/RecurringRuleCard';
import Button from '@/components/Button';
import { Link } from '@inertiajs/react';

export default function Index({ recurringRules }) {
  return (
    <AuthenticatedLayout>
      <div className="align-center flex justify-between">
        <h2 className="text-xl/8 font-bold">Recurring Rules</h2>
        <Link href={route('recurring.create')}>
          <Button text="+ Add Recurring Rule" />
        </Link>
      </div>
      <div className="mt-4 gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
        {recurringRules.map((recurringRule, index) => {
          return <RecurringRuleCard data={recurringRule} key={index} />;
        })}
      </div>
    </AuthenticatedLayout>
  );
}
