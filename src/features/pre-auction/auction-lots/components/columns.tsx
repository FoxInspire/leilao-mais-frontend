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
      cell: ({ row }) => <div>{row.original.internalAuctionOrder}</div>
   },
   {
      accessorKey: 'plate',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Placa" />
      ),
      cell: ({ row }) => (
         <div>{row.original.AuctionLot?.[0]?.LotHistory?.[0]?.plate}</div>
      )
   },
   {
      accessorKey: 'chassis',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Chassi" />
      ),
      cell: ({ row }) => (
         <div>{row.original.AuctionLot?.[0]?.LotHistory?.[0]?.chassis}</div>
      )
   },
   {
      accessorKey: 'brandModel',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Marca/Modelo" />
      ),
      cell: ({ row }) => <div>{row.original.description}</div>
   },
   {
      accessorKey: 'color',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Cor" />
      ),
      cell: ({ row }) => <div>{row.getValue('color')}</div>
   },
   {
      accessorKey: 'type',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Tipo" />
      ),
      cell: ({ row }) => (
         <div>
            {row.original.AuctionLot?.[0]?.Characteristics?.vehicleCondition}
         </div>
      )
   },
   {
      accessorKey: 'lotStatus',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status do lote" />
      ),
      cell: ({ row }) => (
         <div>Status do lote: {row.original.AuctionLot?.[0]?.status}</div>
      )
   },
   {
      accessorKey: 'alerts',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Alertas" />
      ),
      cell: ({ row }) => {
         const debts = row.original.VehicleDebt?.length || 0
         return (
            <div className="flex items-center">
               {debts > 0 && (
                  <span className="material-symbols-outlined text-red-500">
                     warning
                  </span>
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
