import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Card from '@/components/Card';
import Field from '@/components/Field';
import AmountInput from '@/components/AmountInput';
import DatePicker from '@/components/DatePicker';
import SelectBox from '@/components/SelectBox';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';

export default function Create() {
  // Get useForm to control forms.
  const { data, setData, post, processing, errors } = useForm({
    date: new Date(),
    category: '1',
    type: 'expense',
    amount: '',
    note: '',
  });

  // submit event
  function submit(e) {
    e.preventDefault();
    post(route('transactions.store'));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Add Transaction" />
      <h2 className="text-xl/8 font-bold">Add Transaction</h2>
      <Card className="mt-4">
        <form onSubmit={submit} className="space-y-6">
          {/* Date field */}
          <Field htmlFor="date" label="Date" error={errors.date}>
            <DatePicker
              id="date"
              value={data.date}
              onChange={(d) => setData('date', new Date(d))}
              className="w-full"
            />
          </Field>
          {/* Category field */}
          <Field htmlFor="category" label="Category" error={errors.category}>
            <SelectBox
              optionArray={[
                { value: '1', label: 'Food' },
                { value: '2', label: 'Transport' },
              ]}
              id="category"
              value={data.category}
              onChange={(v) => setData('category', v)}
              className="flex w-full"
            />
          </Field>
          {/* Type field */}
          <Field htmlFor="type" label="Type" error={errors.type}>
            <SelectBox
              optionArray={[
                { value: 'expense', label: 'expense' },
                { value: 'income', label: 'income' },
              ]}
              id="type"
              value={data.type}
              onChange={(v) => setData('type', v)}
              className="flex w-full"
            />
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
    </AuthenticatedLayout>
  );
}
