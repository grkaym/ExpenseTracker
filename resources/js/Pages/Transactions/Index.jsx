import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Card from '@/components/Card';
import SelectBox from '@/components/SelectBox';
import Button from '@/components/Button';
import Field from '@/components/Field';
import { useMemo, useCallback, useState } from 'react';

export default function Index({ transactions, categories }) {
  // Get shared props
  const { props } = usePage();
  const initial = props.filters ?? {
    type: 'both',
    category: 'all',
    sort: 'newest',
  };

  // Set transaction types
  const transactionType = useMemo(
    () => [
      { value: 'both', label: 'Both' },
      { value: 'expense', label: 'Expense' },
      { value: 'income', label: 'Income' },
    ],
    []
  );
  // Set order Type
  const sortType = useMemo(
    () => [
      { value: 'newest', label: 'Newest' },
      { value: 'oldest', label: 'Oldest' },
    ],
    []
  );
  // Convert categories to an option array
  const categoryList = useMemo(() => {
    return [
      { value: 'all', label: 'All', type: '' },
      ...categories.map((c) => ({
        value: String(c.id),
        label: c.name,
        type: c.type,
      })),
    ];
  }, [categories]);

  // Get useForm to control forms
  const [filters, setFilters] = useState(initial);

  // Set state on change
  const onCategoryChange = useCallback((v) => {
    setFilters((prev) => {
      const next = { ...prev, category: String(v) };
      router.get(route('transactions.index'), next);
      return next;
    });
  }, []);
  const onTypeChange = useCallback((v) => {
    setFilters((prev) => {
      const next = { ...prev, type: String(v) };
      router.get(route('transactions.index'), next);
      return next;
    });
  }, []);
  const onSortChange = useCallback((v) => {
    setFilters((prev) => {
      const next = { ...prev, sort: String(v) };
      router.get(route('transactions.index'), next);
      return next;
    });
  }, []);

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
        <div className="flex justify-between gap-2">
          <Field label="Category" className="w-full">
            <SelectBox
              groupedOptionArray={categoryList}
              onChange={onCategoryChange}
              defaultValue={filters.category}
            />
          </Field>
          <Field label="Type" className="w-full">
            <SelectBox
              optionArray={transactionType}
              onChange={onTypeChange}
              defaultValue={filters.type}
            />
          </Field>
          <Field label="Sort" className="w-full">
            <SelectBox
              optionArray={sortType}
              onChange={onSortChange}
              defaultValue={filters.sort}
            />
          </Field>
        </div>
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
            {transactions.map((t, index) => {
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
