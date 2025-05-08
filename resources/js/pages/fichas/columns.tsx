"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Ficha = {
  id: number

  nombre: string
  descripcion: string
  imagen: string
}

export const columns: ColumnDef<Ficha>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
    },
    {
      accessorKey: "imagen",
      header: "Imagen",
    },
  ];
