'use client'

import { DataTableColumnHeader } from '@/features/pre-auction/auction-maintenance/components/data-table-column-header'
import { DataTableRowActions } from '@/features/pre-auction/auction-maintenance/components/data-table-row-actions'
import { Checkbox } from '@/src/components/ui/checkbox'
import { AuctionEntity } from '@/types/entities/auction.entity.ts'
import { ColumnDef } from '@tanstack/react-table'

export const columns_auction_lots: ColumnDef<AuctionEntity>[] = [
   {
      id: 'select',
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
               table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
         />
      ),
      enableSorting: false,
      enableHiding: false
   },
   {
      accessorKey: 'lotNumber',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Lote" />
      ),
      cell: ({ row }) => <div>{row.original.AuctionLot?.[0]?.lotNumber}</div>
   },
   {
      accessorKey: 'process',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Processo" />
      ),
      cell: ({ row }) => <div>{row.original.auctionCode}</div>
   },
   {
      accessorKey: 'plate',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Placa" />
      ),
      cell: ({ row }) => (
         <div>{row.original.AuctionLot?.[0]?.Vehicle?.plate}</div>
      )
   },
   {
      accessorKey: 'chassis',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Chassi" />
      ),
      cell: ({ row }) => (
         <div>{row.original.AuctionLot?.[0]?.Vehicle?.chassis}</div>
      )
   },
   {
      accessorKey: 'model',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Marca/Modelo" />
      ),
      cell: ({ row }) => (
         <div>
            {`${row.original.AuctionLot?.[0]?.Vehicle?.brand?.name || ''} / ${
               row.original.AuctionLot?.[0]?.Vehicle?.model?.name || ''
            }`}
         </div>
      )
   },
   {
      accessorKey: 'type',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Tipo" />
      ),
      cell: ({ row }) => (
         <div>{row.original.AuctionLot?.[0]?.Vehicle?.type?.name || ''}</div>
      )
   },
   {
      accessorKey: 'status',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status do lote" />
      ),
      cell: ({ row }) => {
         const status = row.original.AuctionLot?.[0]?.status || 'pending'
         const statusMap: Record<string, string> = {
            assembly: 'Em montagem',
            organs_evaluation: 'Avaliação dos órgãos',
            payment_confirmation: 'Confirmação de pagamento',
            pending: 'Pendente'
         }
         return <div>{statusMap[status]}</div>
      }
   },
   {
      accessorKey: 'alerts',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Alertas" />
      ),
      cell: ({ row }) => {
         const debts = row.original.VehicleDebt || []
         const hasDebt = debts.length > 0
         const totalDebtValue = debts.reduce(
            (sum, debt) => sum + (debt.value || 0),
            0
         )

         return (
            <div className="flex items-center gap-2">
               {hasDebt && (
                  <>
                     <span className="material-symbols-outlined text-red-500">
                        warning
                     </span>
                     <span className="text-sm text-red-500">
                        {`${debts.length} débito${
                           debts.length > 1 ? 's' : ''
                        } (R$ ${totalDebtValue.toFixed(2)})`}
                     </span>
                  </>
               )}
            </div>
         )
      }
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <DataTableRowActions
            row={row}
            onSelect={(value) => console.log(value)}
         />
      )
   }
]
