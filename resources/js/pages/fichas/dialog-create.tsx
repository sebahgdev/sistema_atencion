import { useForm } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, FormEventHandler } from 'react'

export function DialogCreateModal({ onClose }: { onClose: () => void }) {
    const { data, setData, post, errors } = useForm({
        nombre: "",
        descripcion: "",
        imagen: "",
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('fichas.store'), {
            onSuccess: () => onClose()
        })
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear ficha</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombre" className="text-right">Nombre</Label>
                        <Input
                            id="nombre"
                            value={data.nombre}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('nombre', e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="descripcion" className="text-right">Descripción</Label>
                        <Input
                            id="descripcion"
                            value={data.descripcion}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('descripcion', e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imagen" className="text-right">Imagen</Label>
                        <Input
                            id="imagen"
                            value={data.imagen}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData('imagen', e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit">Guardar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
