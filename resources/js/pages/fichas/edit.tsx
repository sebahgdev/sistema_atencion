import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head,Link, useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Editar ficha',
        href: '/dashboard',
    },

];

export default function FichaEdit() {
    const {fichas} = usePage().props;

    const {data, setData, errors, put} = useForm({
        nombre: fichas.nombre || "",
        descripcion:fichas.descripcion || "",
        imagen:fichas.imagen || ""
    });

    const  submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('fichas.update',fichas.id));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fichas" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div>
                <Link  href={route('fichas.index')}
                    className='px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Volver atras
                    </Link>



            </div>

            <form onSubmit={submit} className='space-y-6'>
                <div className="grid gap-2">
                    <label htmlFor="">Nombre</label>
                    <Input type="text" id='nombre' className='mt-1 block w-full' value={data.nombre} onChange={(e:ChangeEvent<HTMLInputElement>) => setData('nombre', e.target.value)} required autoComplete='name' placeholder='Nombre' />
                    <InputError className='mt-2' message={errors.nombre} />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="">Descripcion</label>
                    <Input type="text" id='descripcion' className='mt-1 block w-full' value={data.descripcion} onChange={(e:ChangeEvent<HTMLInputElement>) => setData('descripcion', e.target.value)} required autoComplete='name' placeholder='descripcion' />
                    <InputError className='mt-2' message={errors.descripcion} />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="">Imagen</label>
                    <Input type="text" id='imagen' className='mt-1 block w-full' value={data.imagen} onChange={(e:ChangeEvent<HTMLInputElement>) => setData('imagen', e.target.value)} required autoComplete='name' placeholder='imagen' />
                    <InputError className='mt-2' message={errors.imagen} />
                </div>

                <div>
                    <Button>Guardar</Button>
                </div>
            </form>

            </div>
        </AppLayout>
    );
}
