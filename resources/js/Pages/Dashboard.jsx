import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SummaryCard from '@/Components/SummaryCard';
import Chart from '@/Components/Chart';


export default function Dashboard({ ...props }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h2 className='font-bold text-xl/8'>
                This Month's Summary
            </h2>
            {/* Flex Container */}
            <div className='flex gap-6 mt-4'>
                {/* Income */}
                <SummaryCard name='Total Income' amount={props.income} />
                {/* Expense */}
                <SummaryCard name='Total Expense' amount={props.expense} />
                {/* Net */}
                <SummaryCard name='Net' amount={props.net.toFixed(2)} />
            </div>
            {/* <Chart /> */}
        </AuthenticatedLayout>
    );
}
