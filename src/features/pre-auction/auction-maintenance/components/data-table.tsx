'use client'

import * as React from 'react'

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from '@/components/ui/table'
import { DataTablePagination } from '@/features/pre-auction/auction-maintenance/components/data-table-pagination'
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable
} from '@tanstack/react-table'

interface DataTableProps<TData> {
   data: TData[]
   columns: ColumnDef<TData>[]
   globalFilter?: string
   setGlobalFilter?: (value: string) => void
}

export function DataTable<TData>({
   columns,
   data,
   globalFilter,
   setGlobalFilter
}: DataTableProps<TData>) {
   const [rowSelection, setRowSelection] = React.useState({})
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   )
   const [sorting, setSorting] = React.useState<SortingState>([])

   const table = useReactTable({
      data,
      columns,
      initialState: {
         pagination: {
            pageSize: 10,
            pageIndex: 0
         }
      },
      state: {
         sorting,
         columnVisibility,
         rowSelection,
         columnFilters,
         globalFilter
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: (row, columnId, filterValue) => {
         const searchValue = filterValue.toLowerCase()
         const cellValue = String(row.getValue(columnId)).toLowerCase()
         return cellValue.includes(searchValue)
      }
   })

   return (
      <div className="space-y-4">
         <Table>
            <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="whitespace-nowrap">
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead key={header.id} colSpan={header.colSpan}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                   )}
                           </TableHead>
                        )
                     })}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                     <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className="whitespace-nowrap"
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell
                        colSpan={columns.length}
                        className="text-center hover:bg-transparent cursor-default"
                     >
                        <span className="text-text-secondary text-base">
                           Nenhum resultado encontrado.
                        </span>
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
         {table?.getRowCount() > 0 && <DataTablePagination table={table} />}
      </div>
   )
}
