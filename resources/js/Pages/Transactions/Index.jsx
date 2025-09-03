import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Card from '@/components/Card';
import SelectBox from '@/components/SelectBox';
import Button from '@/components/Button';
import { Link } from '@inertiajs/react';

export default function Index({ ...props }) {
  const transactionType = [
    { value: 'both', label: 'both' },
    { value: 'expense', label: 'expense' },
    { value: 'income', label: 'income' },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Transactions" />
      <div className="align-center flex justify-between">
        <h2 className="text-xl/8 font-bold">Transactions</h2>
        <Link href={route('transactions.create')}>
          <Button text="+ Add Transaction" />
        </Link>
      </div>
      <Card className="mt-4">
        Type :
        <SelectBox optionArray={transactionType} />
      </Card>
      <Card className="mt-4">
        <table className="w-full table-fixed border shadow-sm">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="w-32 border-l border-slate-200 px-4 py-2">Date</th>
              <th className="w-48 border-l border-slate-200 px-4 py-2">
                Category
              </th>
              <th className="w-24 border-l border-slate-200 px-4 py-2">Type</th>
              <th className="w-64 border-l border-slate-200 px-4 py-2">
                Amount
              </th>
              <th className="truncate border-l border-slate-200 px-4 py-2">
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {props.transactions.map((t, index) => {
              return (
                <tr key={index} className="border-t">
                  <td className="border-l border-slate-200 px-4 py-2">
                    {t.date}
                  </td>
                  <td className="border-l border-slate-200 px-4 py-2">
                    {t.category.name}
                  </td>
                  <td className="border-l border-slate-200 px-4 py-2">
                    {t.type}
                  </td>
                  <td className="border-l border-slate-200 px-4 py-2 text-right">
                    ${t.amount}
                  </td>
                  <td className="truncate border-l border-slate-200 px-4 py-2">
                    {t.note}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </AuthenticatedLayout>
  );
}
