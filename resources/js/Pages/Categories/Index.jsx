import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Card from '@/components/Card';

export default function Index({ categories }) {
  // Group categories by type
  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const incomeCategories = categories.filter((c) => c.type === 'income');

  return (
    <AuthenticatedLayout>
      <Head title="Categories" />

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl/8 font-bold">Expense Categories</h2>
          <div className="gap-4 space-y-4 lg:grid lg:grid-cols-4 lg:space-y-0">
            {expenseCategories.map((category) => (
              <Card key={category.id}>
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
              </Card>
            ))}
          </div>
          {expenseCategories.length === 0 && (
            <p className="text-gray-500">No expense categories found.</p>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl/8 font-bold">Income Categories</h2>
          <div className="gap-4 space-y-4 lg:grid lg:grid-cols-4 lg:space-y-0">
            {incomeCategories.map((category) => (
              <Card key={category.id}>
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
              </Card>
            ))}
          </div>
          {incomeCategories.length === 0 && (
            <p className="text-gray-500">No income categories found.</p>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
