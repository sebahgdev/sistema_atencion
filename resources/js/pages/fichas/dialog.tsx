import { useForm } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEventHandler } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Ficha, columns } from "./columns"
export function DialogModal({ row, onClose }: { row: Ficha, onClose: () => void }) {

    const { data, setData, put, errors } = useForm({
        nombre: row.nombre || "",
        descripcion: row.descripcion || "",
        imagen: row.imagen || "",
      })
  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    put(route('fichas.update', row.id), {
      onSuccess: () => onClose()
    })
  }
    return (
      <Dialog open={!!row} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar ficha</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="grid gap-4 py-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nombre</Label>
              <Input id="name" defaultValue={row.nombre}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setData('nombre', e.target.value)}
              className="col-span-3" />
            </div>
            {/* Otros campos */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">
              Descripción
            </Label>
            <Input
              id="descripcion"
              defaultValue={row.descripcion}

              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imagen" className="text-right">
              Imagen
            </Label>
            <Input
              id="imagen"
              defaultValue={row.imagen}
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
