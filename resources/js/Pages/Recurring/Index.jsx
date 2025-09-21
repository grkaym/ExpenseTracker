import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RecurringRuleCard from '@/components/RecurringRuleCard';

export default function Index() {
  return (
    <AuthenticatedLayout>
      <h2 className="text-xl/8 font-bold">Recurring Rules</h2>
      <RecurringRuleCard></RecurringRuleCard>
    </AuthenticatedLayout>
  );
}
