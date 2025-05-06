import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Fichas',
        href: '/fichas',
    },
];

export default function Ficha() {
    const {fichas} = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creacion ficha" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div>
                <Link  href={route('fichas.create')}
                    className='px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Crear ficha
                    </Link>

            </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <th scope="col" className='px-6 py-3'>ID</th>
                        <th scope="col" className='px-6 py-3'>Nombre</th>
                        <th scope="col" className='px-6 py-3'>Descripcion</th>
                        <th scope="col" className='px-6 py-3'>Acción</th>


                        </thead>
                       <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                       </tr>
                        <tbody>
                            {fichas.map(({nombre,descripcion,imagen}) => (




                            <tr key={id}>
                                <td>{nombre}</td>
                                <td>{descripcion}</td>
                                <td>{imagen}</td>
                                <td></td>
                            </tr>
                                 ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
