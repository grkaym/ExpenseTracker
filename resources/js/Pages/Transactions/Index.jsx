import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Card from '@/components/Card';
import SelectBox from '@/components/SelectBox';
import Button from '@/components/Button';
import Field from '@/components/Field';
import DatePicker from '@/components/DatePicker';
import { useMemo, useCallback, useState } from 'react';
import TransactionTable from '@/components/TransactionTable';
import { isValid } from 'date-fns';
import { toYMD } from '@/utils/format';
import TransactionCard from '@/components/TransactionCard';

export default function Index({ transactions, categories }) {
  // Get shared props
  const { props } = usePage();

  // Get a year ago date
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);

  const initial = props.filters ?? {
    from: toYMD(d),
    to: toYMD(new Date()),
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
  const onFromChange = useCallback((v) => {
    setFilters((prev) => {
      const next = { ...prev, from: toYMD(v) };
      router.get(route('transactions.index'), next);
      return next;
    });
  });
  const onToChange = useCallback((v) => {
    setFilters((prev) => {
      const next = { ...prev, to: toYMD(v) };
      router.get(route('transactions.index'), next);
      return next;
    });
  });
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
      <Card className="mt-4 space-y-4">
        <div className="flex flex-col items-start justify-between gap-2 md:flex-row">
          <Field
            label="Date From"
            className="w-full"
            htmlFor="dateFrom"
            id="dateFromField"
          >
            <DatePicker
              className="w-full"
              value={
                isValid(new Date(filters.from)) ? new Date(filters.from) : d
              }
              id="dateFrom"
              portalId="dateFromField"
              onChange={onFromChange}
            />
          </Field>
          <Field
            label="Date To"
            className="w-full"
            htmlFor="dateTo"
            id="dateToField"
          >
            <DatePicker
              className="w-full"
              value={
                isValid(new Date(filters.to))
                  ? new Date(filters.to)
                  : new Date()
              }
              id="dateTo"
              portalId="dateToField"
              onChange={onToChange}
            />
          </Field>
        </div>
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <Field label="Category" className="w-full">
            <SelectBox
              groupedOptionArray={categoryList}
              onChange={onCategoryChange}
              value={filters.category}
            />
          </Field>
          <Field label="Type" className="w-full">
            <SelectBox
              optionArray={transactionType}
              onChange={onTypeChange}
              value={filters.type}
            />
          </Field>
          <Field label="Sort" className="w-full">
            <SelectBox
              optionArray={sortType}
              onChange={onSortChange}
              value={filters.sort}
            />
          </Field>
        </div>
      </Card>
      <Card className="mt-4 hidden overflow-x-auto md:block">
        <TransactionTable transactions={transactions} />
      </Card>
      <div className="mt-4 grid grid-cols-1 gap-2 md:hidden">
        {transactions.map((transaction) => {
          return <TransactionCard data={transaction} />;
        })}
      </div>
    </AuthenticatedLayout>
  );
}
