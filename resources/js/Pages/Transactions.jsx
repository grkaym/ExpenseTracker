import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Card from '@/Components/Card';
import SelectBox from '@/Components/SelectBox';
import Button from '@/Components/Button';
import { Link } from '@inertiajs/react';

export default function Transactions({ ...props }) {
    const transactionType = [
        {value: 'both', label: 'both'},
        {value: 'expense', label: 'expense'},
        {value: 'income', label: 'income'}
    ];
    
    return (
        <AuthenticatedLayout>
            <Head title='Transactions' />
            <div className='flex justify-between align-center'>
                <h2 className='font-bold text-xl/8'>
                    Transactions
                </h2>
                <Link href={route('dashboard')}>
                    <Button text='+ Add Transaction' />
                </Link>
            </div>
            <Card className='mt-4'>
                Type : 
                <SelectBox optionArray={transactionType} />
            </Card>
            <Card className='mt-4'>
                <table className='w-full border shadow-sm table-fixed'>
                    <thead>
                        <tr className='text-left bg-slate-100'>
                            <th className='w-32 px-4 py-2 border-l border-slate-200'>Date</th>
                            <th className='w-32 px-4 py-2 border-l border-slate-200'>Category</th>
                            <th className='w-24 px-4 py-2 border-l border-slate-200'>Type</th>
                            <th className='w-64 px-4 py-2 border-l border-slate-200'>Amount</th>
                            <th className='px-4 py-2 truncate border-l border-slate-200'>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.transactions.map((t, index) => {
                            return (
                                <tr key={index} className='border-t'>
                                    <td className='px-4 py-2 border-l border-slate-200'>{t.date}</td>
                                    <td className='px-4 py-2 border-l border-slate-200'>{t.category.name}</td>
                                    <td className='px-4 py-2 border-l border-slate-200'>{t.type}</td>
                                    <td className='px-4 py-2 text-right border-l border-slate-200'>${t.amount}</td>
                                    <td className='px-4 py-2 truncate border-l border-slate-200'>{t.note}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Card>
        </AuthenticatedLayout>
    );
}
