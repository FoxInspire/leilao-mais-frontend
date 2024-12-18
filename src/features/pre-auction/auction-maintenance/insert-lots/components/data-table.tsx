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
import { DataTablePagination } from '@/src/components/ui/data-table-pagination'
import { AvaliableLotEntity } from '@/src/types/entities/avaliable-lot.entity'
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
   onSelectionChange?: (selectedRows: TData[]) => void
}

export interface TableInsertLotsHandle {
   resetSelection: () => void
}

export const TableInsertLots = React.forwardRef<
   TableInsertLotsHandle,
   DataTableProps<AvaliableLotEntity>
>(
   (
      { columns, data, globalFilter, setGlobalFilter, onSelectionChange },
      ref
   ) => {
      const [rowSelection, setRowSelection] = React.useState({})
      const [columnVisibility, setColumnVisibility] =
         React.useState<VisibilityState>({})
      const [columnFilters, setColumnFilters] =
         React.useState<ColumnFiltersState>([])

      const [sorting, setSorting] = React.useState<SortingState>([])

      const table = useReactTable({
         data,
         columns,
         initialState: {
            pagination: {
               pageSize: 5,
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
            try {
               const filters = JSON.parse(filterValue)
               return Object.values(filters.filterConditions).every(
                  (condition) =>
                     typeof condition === 'function' && condition(row.original)
               )
            } catch {
               const searchValue = filterValue.toLowerCase()
               const lot = row.original.grvCode
               const plate = row.original.vehiclePlate
               const chassis = row.original.vehicleChassis
               const brand = row.original.vehicleBrand
               const type = row.original.vehicleType
               const color = row.original.vehicleColor
               const previousAuctionCode =
                  row.original.previousAuction?.auctionCode
               const status = row.original.previousStatus

               const searchFields = [
                  lot,
                  plate,
                  chassis,
                  brand,
                  type,
                  color,
                  previousAuctionCode,
                  status
               ]

               return searchFields.some((field) =>
                  String(field || '')
                     .toLowerCase()
                     .includes(searchValue)
               )
            }
         }
      })

      const rowSelectionState = table.getState().rowSelection

      React.useEffect(() => {
         const selectedRows = table
            .getSelectedRowModel()
            .rows.map((row) => row.original)

         onSelectionChange?.(selectedRows)
      }, [table, onSelectionChange, rowSelectionState])

      React.useImperativeHandle(ref, () => ({
         resetSelection: () => {
            table.toggleAllRowsSelected(false)
         }
      }))

      return (
         <div className="space-y-4">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow
                        key={headerGroup.id}
                        className="whitespace-nowrap"
                     >
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead
                                 key={header.id}
                                 colSpan={header.colSpan}
                              >
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
                           className="cursor-default text-center hover:bg-transparent"
                        >
                           <span className="text-base text-text-secondary">
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
)

TableInsertLots.displayName = 'TableInsertLots'
