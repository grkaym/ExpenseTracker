import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useMemo, useCallback } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Card from '@/components/Card';
import Field from '@/components/Field';
import AmountInput from '@/components/AmountInput';
import DatePicker from '@/components/DatePicker';
import SelectBox from '@/components/SelectBox';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import { format, parseISO } from 'date-fns';

export default function Create({ categories }) {
  // Convert categories to an option array
  const categoryList = useMemo(() => {
    return [
      ...categories.map((c) => ({
        value: String(c.id),
        label: c.name,
        type: c.type,
      })),
    ];
  }, [categories]);

  // Get today's Date object.
  const today = format(new Date(), 'yyyy-MM-dd');

  // Get useForm to control forms.
  const { data, setData, post, processing, errors } = useForm({
    date: today,
    category: '',
    type: '',
    amount: '',
    note: '',
  });

  // Cache to prevent unnecessary rendering component.
  const onCategoryChange = useCallback(
    (v) => {
      // Update category
      setData('category', v);

      // Find target category's type
      const type = categoryList.find((c) => c.value === v)?.type;
      // Update type
      setData('type', type);
    },
    [setData]
  );

  const onDateChange = useCallback(
    (d) => setData('date', format(d, 'yyyy-MM-dd')),
    [setData]
  );
  const dateObj = useMemo(() => parseISO(data.date), [data.date]);

  // submit event
  function submit(e) {
    e.preventDefault();
    post(route('transactions.store'));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Add Transaction" />
      <div className="mx-auto max-w-xl md:max-w-2xl">
        <h2 className="text-xl/8 font-bold">Add Transaction</h2>
        <Card className="mt-4">
          <form onSubmit={submit} className="space-y-6">
            {/* Date field */}
            <Field htmlFor="date" label="Date" error={errors.date}>
              <DatePicker
                id="date"
                value={dateObj}
                onChange={onDateChange}
                className="w-full"
              />
            </Field>
            {/* Category field */}
            <Field htmlFor="category" label="Category" error={errors.category}>
              <SelectBox
                groupedOptionArray={categoryList}
                id="category"
                value={data.category}
                onChange={onCategoryChange}
                className="flex w-full"
                ph="Select a category..."
              />
            </Field>
            {/* Type field */}
            <Field htmlFor="type" label="Type" error={errors.type}>
              {data.type ? (
                <div className="p-2 text-lg font-normal text-slate-500">
                  {data.type}
                </div>
              ) : (
                <div className="p-2 text-lg font-normal text-slate-400">
                  Select a category...
                </div>
              )}
            </Field>
            {/* Amound field */}
            <Field htmlFor="amount" label="Amount" error={errors.amount}>
              <AmountInput
                id="amount"
                value={data.amount}
                onChange={(v) => setData('amount', v)}
                className="w-full"
              />
            </Field>
            {/* Note field */}
            <Field htmlFor="note" label="Note" error={errors.note}>
              <TextArea
                id="note"
                value={data.note}
                onChange={(v) => setData('note', v)}
                className="w-full"
              />
            </Field>
            {/* Submit button */}
            <Button text="Submit" type="submit" disabled={processing} />
          </form>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
