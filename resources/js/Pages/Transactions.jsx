import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Card from '@/Components/Card';

export default function Transactions({ ...props }) {
    return (
        <AuthenticatedLayout>
            <Head title="Transactions" />
            <h2 className='font-bold text-xl/8'>
                Transactions
            </h2>
            <Card className='mt-4'>
                Filter :
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
                        {props.transactions.map((t) => {
                            return (
                                <tr className='border-t'>
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
