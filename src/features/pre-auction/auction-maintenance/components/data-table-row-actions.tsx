'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
import { SelectInput, SelectInputValue } from '@/src/components/ui/select'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
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
import { useRouter } from 'next/navigation'

interface DataTableRowActionsProps<TData> {
   row?: Row<AuctionEntity>
   onSelect?: (value: string) => void
}

export function DataTableRowActions<TData>({
   row,
   onSelect
}: DataTableRowActionsProps<TData>) {
   const router = useRouter()

   const [dialog, setDialog] = React.useState({
      export_lots: false,
      generate_notice: false
   })

   const menuItems = [
      {
         icon: 'add',
         label: 'Ingressar lotes',
         value: 'add-lots',
         filled: false,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.insert_lots(
                  String(row?.original?.auctionCode)
               )
            )
         }
      },
      {
         icon: 'edit',
         label: 'Editar leilão',
         value: 'edit-auction',
         filled: true,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.edit_auction(
                  String(row?.original?.auctionCode)
               )
            )
         }
      },
      {
         icon: 'open_in_new',
         label: 'Exportar lotes',
         value: 'export-lots',
         filled: false,
         disabled: false,
         onClick: () => {
            setDialog({ ...dialog, export_lots: true })
         }
      },
      {
         icon: 'content_paste',
         label: 'Gerar edital de leilão',
         value: 'generate-notice',
         filled: false,
         disabled: false,
         onClick: () => {
            setDialog({ ...dialog, generate_notice: true })
         }
      },
      {
         icon: 'mail',
         label: 'Notificar proprietários',
         value: 'notify-owners',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'download',
         label: 'Importar proprietários',
         value: 'import-owners',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'monitor',
         label: 'Monitor de operações',
         value: 'operations-monitor',
         filled: false,
         disabled: true,
         onClick: () => {}
      }
   ]

   return (
      <React.Fragment>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="icon"
                  size="icon"
                  className="flex data-[state=open]:bg-muted"
               >
                  <span className="material-symbols-outlined text-text-secondary dark:text-dark-text-secondary">
                     more_vert
                  </span>
                  <span className="sr-only">Open menu</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               {menuItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                     {index === menuItems.length - 1 && (
                        <DropdownMenuSeparator />
                     )}
                     <DropdownMenuItem
                        className="font-medium"
                        disabled={item.disabled}
                        onClick={() => {
                           onSelect?.(item.value)
                           item.onClick?.()
                        }}
                     >
                        <span
                           className={cn(
                              'material-symbols-outlined text-text-secondary symbol-md dark:text-dark-text-secondary',
                              item.filled && 'filled'
                           )}
                        >
                           {item.icon}
                        </span>
                        {item.label}
                     </DropdownMenuItem>
                  </React.Fragment>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
         <Dialog open={dialog.export_lots || dialog.generate_notice}>
            <DialogContent
               className={cn({
                  'md:max-w-xl': dialog.export_lots,
                  'md:max-w-7xl': dialog.generate_notice
               })}
            >
               {dialog.export_lots && (
                  <ExportLotsAction
                     id={row?.original?.auctionCode || '-'}
                     onExport={() => {}}
                     onClose={() =>
                        setDialog({
                           ...dialog,
                           export_lots: false
                        })
                     }
                  />
               )}
               {dialog.generate_notice && (
                  <GenerateNoticeAction
                     row={row}
                     onClose={() => {
                        setDialog({
                           ...dialog,
                           generate_notice: false
                        })
                     }}
                  />
               )}
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}

interface ExportLotsActionProps {
   id: string
   onExport: () => void
   onClose: () => void
   onSelected?: (value: SelectInputValue | SelectInputValue[]) => void
}

const ExportLotsAction: React.FC<ExportLotsActionProps> = ({
   id,
   onExport,
   onClose,
   onSelected
}: ExportLotsActionProps) => {
   return (
      <React.Fragment>
         <DialogHeader>
            <DialogTitle onClose={() => onClose()}>Exportar lotes</DialogTitle>
         </DialogHeader>
         <div className="space-y-6 py-4 pb-6">
            <p className="text-lg font-montserrat">
               Leilão <span className="font-semibold">{id}</span>
            </p>
            <div>
               <SelectInput
                  label="Tipo de lote"
                  item="checkbox"
                  placeholder="Selecione o tipo de lote"
                  options={[
                     {
                        id: '1',
                        label: 'Todos os lotes',
                        value: 'all'
                     },
                     {
                        id: '2',
                        label: 'Lotes válidos',
                        value: 'valid'
                     },
                     {
                        id: '3',
                        label: 'Lotes com restrição judicial',
                        value: 'judicial'
                     },
                     {
                        id: '4',
                        label: 'Lotes com restrição de roubo/furto',
                        value: 'robbery'
                     },
                     {
                        id: '5',
                        label: 'Lotes com restrição administrativa',
                        value: 'administrative'
                     }
                  ]}
                  onValueChange={(value) => onSelected?.(value)}
               />
            </div>
         </div>
         <div className="grid md:grid-cols-2 gap-2 mb-6 mt-2">
            <div className="md:order-1 order-2">
               <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => onClose?.()}
               >
                  Cancelar
               </Button>
            </div>
            <div className="md:order-2 order-1">
               <Button
                  variant="default"
                  className="w-full"
                  onClick={() => onExport?.()}
               >
                  Exportar
               </Button>
            </div>
         </div>
      </React.Fragment>
   )
}

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

const GenerateNoticeAction: React.FC<GenerateNoticeActionProps> = ({
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
            <p className="text-lg font-montserrat">
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
