"use client"
import { Plus, FileDown } from "lucide-react"
import * as XLSX from "xlsx"
import { useEffect, useState } from "react"
import { ChevronDown, MoreHorizontal, ChevronRight, ChevronLeft } from "lucide-react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getPaginationRowModel
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

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";


import { Pagination, PaginationContent, PaginationItem, PaginationLink, } from "@/components/ui/pagination"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    enableFilterColumn?: keyof TData
    enableColumnToggle?: boolean
    enableActions?: boolean
    onEdit?: (row: TData) => void
    onDelete?: (row: TData) => void
    onCreate?: (row: TData) => void
}

export function DataTable<TData, TValue>({
    columns,

    data,
    enableFilterColumn,
    enableColumnToggle = false,
    enableActions = false,
    onEdit,
    onCreate,
    onDelete,
}: DataTableProps<TData, TValue>) {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });


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
        state: {
            pagination,

        },
        columns: finalColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
    })

    const handleExport = () => {
        const exportData = data.map((row: any) => {
            const rowObj: Record<string, any> = {}

            finalColumns.forEach((col: any) => {
                if (col.accessorKey) {
                    rowObj[col.header] = row[col.accessorKey]
                }
            })

            return rowObj
        })

        const worksheet = XLSX.utils.json_to_sheet(exportData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos")

        XLSX.writeFile(workbook, "fichas.xlsx")
    }


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


                    <Select
                        value={pagination.pageSize.toString()}
                        onValueChange={(value) =>
                            setPagination((prev) => ({
                                ...prev,
                                pageSize: Number(value),
                                pageIndex: 0,
                            }))
                        }
                    >
                        <SelectTrigger className="w-[80px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 50, 100].map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button variant="default" className="flex items-center gap-2" onClick={() => onCreate?.()}>
                        <Plus className="h-4 w-4" />
                        Agregar
                    </Button>

                    <Button
                        variant="default"
                        className="flex items-center gap-2"
                        onClick={() => handleExport()}
                    >
                        <FileDown className="h-4 w-4" />
                        Exportar
                    </Button>


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


            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    <b>Total registros: {table.getFilteredRowModel().rows.length}</b>
                </div>
                <div className="space-x-2">
                    <Pagination>
                        <PaginationContent className="gap-0 border rounded-lg divide-x overflow-hidden">
                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    className="rounded-none"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                ><ChevronLeft />
                                </Button>
                                {/* <PaginationPrevious onClick={() => table.previousPage()} href="#" className="rounded-none" /> */}
                            </PaginationItem>
                            {Array.from({ length: table.getPageCount() }).map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href=""
                                        className={cn(
                                            {
                                                [buttonVariants({
                                                    variant: "default",
                                                    className: "hover:!text-primary-foreground dark:!bg-white dark:!text-black dark:hover:!bg-neutral-200",
                                                })]: (index === pagination.pageIndex),
                                            },
                                            "rounded-none border-none"
                                        )}
                                        isActive={index === pagination.pageIndex}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            table.setPageIndex(index)
                                        }}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                {/* <PaginationNext onClick={() => table.nextPage()} href="#" className="rounded-none" /> */}
                                <Button
                                    variant="outline"
                                    className="rounded-none"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                ><ChevronRight />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>


                </div>
            </div>




        </div>
    )
}
