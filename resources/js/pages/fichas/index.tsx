import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { toast } from "sonner"
import { useEffect } from 'react'
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react'
import { DialogModal } from './dialog' // importa el modal
import { DialogCreateModal } from './dialog-create';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { type Ficha, columns } from "./columns"

import type { PageProps as InertiaPageProps } from "@inertiajs/core";

import { DataTable } from "./data-table"
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

    const [editingRow, setEditingRow] = useState<Ficha | null>(null)
    const [createRow, setCreateRow] = useState(null)
    const handleEdit = (row: Ficha) => {
        console.log(row)
        setEditingRow(row)
    }
    const handleCreate = () => {

        setCreateRow(true);
    }


    interface PageProps extends InertiaPageProps {
        fichas: Ficha[];
    }

    const { flash, fichas } = usePage<PageProps>().props;

    console.log(flash)


    useEffect(() => {

        if (flash?.success) {
            console.log('entro flash')
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash])



    const { delete: destroy } = useForm();
    const destroyFicha: FormEventHandler = (e, id) => {
        e.preventDefault();
        if (window.confirm('Estas seguro de eliminar el ficha?')) {
            destroy(route('fichas.destroy', id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creacion ficha" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <div>
                    <Link href={route('fichas.create')}
                        className='px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                        Crear ficha
                    </Link>

                </div> */}
                <div className="overflow-x-auto">

                    <DataTable columns={columns} data={fichas} enableFilterColumn="nombre" enableColumnToggle enableActions
                        /* onEdit={(row) => console.log("Editar:", row)} */
                        onEdit={handleEdit}
                        onCreate={handleCreate}
                        onDelete={(row) => console.log("Eliminar:", row)} />
                    {/*     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                            {fichas.map(({id,nombre,descripcion,imagen}) => (





                            <tr key={id}>
                                <td>{nombre}</td>
                                <td>{descripcion}</td>
                                <td>{imagen}</td>
                                <td>
                                    <form onSubmit={(e) => destroyFicha(e,id)}>
                                    <Link
                                    href={route('fichas.edit',id)}
                                    className="px-3 py-2 text-xs-font-medium  bg-primary rounded-lg">
                                        Editar
                                    </Link>

                                    <button className="px-3 py-2 text-xs-font-medium  bg-primary rounded-lg">
                                        Eliminar
                                    </button>
                                    </form>
                                </td>
                            </tr>
                                 ))}

                        </tbody>
                    </table> */}
                </div>
            </div>

            {editingRow && (
                <DialogModal
                    row={editingRow}
                    onClose={() => setEditingRow(null)}
                />
            )}

            {createRow && (
                <DialogCreateModal

                    onClose={() => setCreateRow(null)}
                />
            )}
        </AppLayout>
    );
}
