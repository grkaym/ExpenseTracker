import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Card from '@/components/Card';

export default function Create({ ...props }) {
    return (
        <AuthenticatedLayout>
            <Head title='Add Transaction' />
            <h2 className='font-bold text-xl/8'>
                Add Transaction
            </h2>
            <Card className='mt-4'>
                <div>
                    Date
                </div>
            </Card>
        </AuthenticatedLayout>
    );
}
