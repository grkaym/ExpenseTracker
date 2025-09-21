import Card from '@/components/Card';
export default function RecurringRuleCard() {
  return (
    <Card>
      <div className="flex justify-between">
        <p className="text-xl font-bold">Rent</p>
        <div className="flex gap-4">
          <div>expense</div>
          <div>active</div>
        </div>
      </div>
      <div>
        <div>Amount: $1,000.00</div>
        <div>Schedule: Daily</div>
        <div>Start: 2025/09/01</div>
        <div>End: 2025/10/30</div>
        <div>Next: 2025/09/21</div>
      </div>
    </Card>
  );
}
