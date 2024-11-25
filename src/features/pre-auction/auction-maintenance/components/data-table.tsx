import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from '@/components/ui/table'
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
import * as React from 'react'
import { DataTablePagination } from './data-table-pagination'

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
   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
      {}
   )
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
   const [sorting, setSorting] = React.useState<SortingState>([])

   const table = useReactTable({
      data,
      columns,
      initialState: {
         pagination: {
            pageSize: 8,
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
         <div className="rounded-md border">
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
                           className="h-24 text-center"
                        >
                           Nenhum resultado encontrado.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <DataTablePagination table={table} />
      </div>
   )
}
