import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Card from '@/components/Card';
import Field from '@/components/Field';
import TextInput from '@/components/TextInput';
import SelectBox from '@/components/SelectBox';
import Button from '@/components/Button';

export default function Index({ categories }) {
  // Group categories by type
  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const incomeCategories = categories.filter((c) => c.type === 'income');

  // Form for adding new category
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    type: 'expense',
  });

  // Submit handler
  const submit = (e) => {
    e.preventDefault();
    post(route('categories.store'), {
      onSuccess: () => reset(),
    });
  };

  // Type options for dropdown
  const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Categories" />

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl/8 font-bold">Expense Categories</h2>
          <div className="gap-4 space-y-4 lg:grid lg:grid-cols-4 lg:space-y-0">
            {expenseCategories.map((category) => (
              <Card key={category.id}>
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="ml-2 flex-1 font-medium">
                    {category.name}
                  </span>
                  {category.user_id && (
                    <button
                      type="button"
                      title="Delete"
                      aria-label="Delete category"
                      className="rounded px-2 py-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        if (
                          confirm(
                            'Are you sure you want to delete this category?'
                          )
                        ) {
                          router.delete(
                            route('categories.destroy', category.id),
                            {
                              preserveScroll: true,
                            }
                          );
                        }
                      }}
                    >
                      &times;
                    </button>
                  )}
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
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="ml-2 flex-1 font-medium">
                    {category.name}
                  </span>
                  {category.user_id && (
                    <button
                      type="button"
                      title="Delete"
                      aria-label="Delete category"
                      className="rounded px-2 py-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        if (
                          confirm(
                            'Are you sure you want to delete this category?'
                          )
                        ) {
                          router.delete(
                            route('categories.destroy', category.id),
                            {
                              preserveScroll: true,
                            }
                          );
                        }
                      }}
                    >
                      &times;
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
          {incomeCategories.length === 0 && (
            <p className="text-gray-500">No income categories found.</p>
          )}
        </div>

        {/* Add Category Form */}
        <div>
          <h2 className="mb-4 text-xl/8 font-bold">Add New Category</h2>
          <Card>
            <form
              onSubmit={submit}
              className="flex flex-col gap-4 sm:flex-row sm:items-end"
            >
              <Field
                htmlFor="name"
                label="Name"
                error={errors.name}
                className="flex-1"
              >
                <TextInput
                  id="name"
                  value={data.name}
                  onChange={(v) => setData('name', v)}
                  className="px-4 py-1.5"
                />
              </Field>

              <Field
                htmlFor="type"
                label="Type"
                error={errors.type}
                className="sm:w-40"
              >
                <SelectBox
                  id="type"
                  optionArray={typeOptions}
                  value={data.type}
                  onChange={(v) => setData('type', v)}
                  className="px-4 py-1.5"
                />
              </Field>

              <Button
                type="submit"
                text={processing ? 'Saving...' : 'Save'}
                disabled={processing}
              />
            </form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
