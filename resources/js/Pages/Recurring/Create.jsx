import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Card from '@/components/Card';
import Field from '@/components/Field';
import DatePicker from '@/components/DatePicker';
import SelectBox from '@/components/SelectBox';
import { useMemo, useCallback } from 'react';
import AmountInput from '@/components/AmountInput';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
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
    category: '',
    type: '',
    amount: '',
    note: '',
    startDate: today,
    frequency: 'daily',
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

  const dateObj = useMemo(() => parseISO(data.startDate), [data.startDate]);
  const onStartDateChange = useCallback(
    (d) => setData('startDate', format(d, 'yyyy-MM-dd')),
    [setData]
  );

  const onFrequencyChange = useCallback(
    (v) => {
      // Update category
      setData('frequency', v);
    },
    [setData]
  );

  // submit event
  function submit(e) {
    e.preventDefault();
    post(route('recurring.store'));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Add Recurring Rule" />
      <div className="mx-auto max-w-xl md:max-w-2xl">
        <h2 className="text-xl/8 font-bold">Add Recurring Rule</h2>
        <Card className="mt-4">
          <form onSubmit={submit} className="space-y-6">
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
            {/* Amount field */}
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
            {/* Start date field */}
            <Field
              htmlFor="startDate"
              label="Start Date"
              error={errors.startDate}
            >
              <DatePicker
                id="startDate"
                value={dateObj}
                onChange={onStartDateChange}
                className="w-full"
              />
            </Field>
            {/* Frequency field */}
            <Field
              htmlFor="frequency"
              label="Frequency"
              error={errors.frequency}
            >
              <SelectBox
                optionArray={[
                  { label: 'daily', value: 'daily' },
                  { label: 'weekly', value: 'weekly' },
                  { label: 'monthly', value: 'monthly' },
                ]}
                id="frequency"
                value={data.frequency}
                onChange={onFrequencyChange}
                className="flex w-full"
                defaultValue="daily"
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
