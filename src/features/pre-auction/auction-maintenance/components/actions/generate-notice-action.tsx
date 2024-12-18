'use client'

import * as React from 'react'

import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from '@/components/ui/table'
import { DataTableColumnHeader } from '@/features/pre-auction/auction-maintenance/components/data-table-column-header'
import { DataTablePagination } from '@/src/components/ui/data-table-pagination'
import { AuctionEntity } from '@/src/types/entities/auction.entity'
import {
   ColumnDef,
   ColumnFiltersState,
   Row,
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

interface GenerateNoticeColumnsProps {
   plate: string
   chassis: string
   model: string
   color: string
   year: string
   owner: string
   financer?: string
   newOwner?: string
}

interface GenerateNoticeActionProps {
   row?: Row<AuctionEntity>
   onClose: () => void
}

export const GenerateNoticeAction: React.FC<GenerateNoticeActionProps> = ({
   row,
   onClose
}: GenerateNoticeActionProps) => {
   const [rowSelection, setRowSelection] = React.useState({})
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   )
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [globalFilter, setGlobalFilter] = React.useState<string | undefined>(
      undefined
   )

   const table = useReactTable({
      data: [
         {
            plate: 'ABC-1234',
            chassis: '9BWZZZ377VT004251',
            model: 'VW GOL 1.0',
            color: 'PRATA',
            year: '2020',
            owner: 'João Silva',
            financer: 'Banco do Brasil',
            newOwner: 'Maria Santos'
         },
         {
            plate: 'XYZ-5678',
            chassis: '8AWPN45Z0BA032454',
            model: 'FIAT PALIO FIRE',
            color: 'BRANCO',
            year: '2019',
            owner: 'Pedro Souza',
            financer: 'Caixa Econômica',
            newOwner: undefined
         },
         {
            plate: 'DEF-9012',
            chassis: '93YLSR7UHCJ920740',
            model: 'RENAULT SANDERO',
            color: 'PRETO',
            year: '2021',
            owner: 'Ana Oliveira',
            financer: undefined,
            newOwner: 'Carlos Ferreira'
         },
         {
            plate: 'GHI-3456',
            chassis: '9BGJK75Z0CB271892',
            model: 'CHEVROLET ONIX',
            color: 'VERMELHO',
            year: '2022',
            owner: 'Mariana Costa',
            financer: 'Santander',
            newOwner: undefined
         },
         {
            plate: 'JKL-7890',
            chassis: '3VWFE21FXMM000123',
            model: 'TOYOTA COROLLA',
            color: 'AZUL',
            year: '2021',
            owner: 'Roberto Lima',
            financer: undefined,
            newOwner: undefined
         }
      ],
      columns: columns_generate_notice,
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
         const searchValue = filterValue.toLowerCase()
         const cellValue = String(row.getValue(columnId)).toLowerCase()
         return cellValue.includes(searchValue)
      }
   })

   return (
      <React.Fragment>
         <DialogHeader>
            <DialogTitle onClose={() => onClose()}>
               Edital de leilão
            </DialogTitle>
         </DialogHeader>
         <div className="space-y-6 py-4 pb-6">
            <p className="font-montserrat text-lg">
               <span className="font-semibold">
                  {row?.original?.auctionCode}
               </span>
            </p>
            <div>
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
                                 colSpan={columns_generate_notice.length}
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
                  {table?.getRowCount() > 0 && (
                     <DataTablePagination table={table} />
                  )}
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

const columns_generate_notice: ColumnDef<GenerateNoticeColumnsProps>[] = [
   {
      accessorKey: 'plate',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Placa" />
      ),
      cell: ({ row }) => <div>{row.getValue('plate')}</div>
   },
   {
      accessorKey: 'chassis',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Chassi" />
      ),
      cell: ({ row }) => <div>{row.getValue('chassis')}</div>
   },
   {
      accessorKey: 'model',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Modelo" />
      ),
      cell: ({ row }) => <div>{row.getValue('model')}</div>
   },
   {
      accessorKey: 'color',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Cor" />
      ),
      cell: ({ row }) => <div>{row.getValue('color')}</div>
   },
   {
      accessorKey: 'year',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Ano" />
      ),
      cell: ({ row }) => <div>{row.getValue('year')}</div>
   },
   {
      accessorKey: 'owner',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Proprietário" />
      ),
      cell: ({ row }) => <div>{row.getValue('owner')}</div>
   },
   {
      accessorKey: 'financer',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Financeira" />
      ),
      cell: ({ row }) => <div>{row.getValue('financer') || '-'}</div>
   },
   {
      accessorKey: 'newOwner',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Novo Proprietário" />
      ),
      cell: ({ row }) => <div>{row.getValue('newOwner') || '-'}</div>
   }
]
