"use client"

import { useEffect, useState } from "react"
import { ChevronDown,MoreHorizontal  } from "lucide-react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  enableFilterColumn?: keyof TData
  enableColumnToggle?: boolean
  enableActions?: boolean
  onEdit?: (row: TData) => void
  onDelete?: (row: TData) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enableFilterColumn,
  enableColumnToggle = false,
  enableActions = false,
  onEdit,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const [filterValue, setFilterValue] = useState("")

  const finalColumns = [...columns]

  // Agrega la columna de acciones si está habilitada
  if (enableActions) {
    finalColumns.push({
      id: "actions",
      header: "Acciones",
      enableHiding: false,
      cell: ({ row }) => {
        const original = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
             {/*  <DropdownMenuLabel>Acciones</DropdownMenuLabel> */}
              <DropdownMenuItem onClick={() => onEdit?.(original)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(original)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    } as ColumnDef<TData, TValue>)
  }


  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

/*   useEffect(() => {
    console.log(filterValue)
    table.getColumn(enableFilterColumn as string)?.setFilterValue(filterValue)
  }, [filterValue]) */

  return (
    <div className="w-full space-y-4">
      {(enableFilterColumn || enableColumnToggle) && (
        <div className="flex items-center gap-4">
          {enableFilterColumn && (
            <Input
              placeholder={`Filtrar por ${String(enableFilterColumn)}...`}
              /* value={filterValue} */
              value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
           /*    onChange={(e) => setFilterValue(e.target.value)} */
           onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
              className="max-w-sm"
            />
          )}

          {enableColumnToggle && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columnas <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
