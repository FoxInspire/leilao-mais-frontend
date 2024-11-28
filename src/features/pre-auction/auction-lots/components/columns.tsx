'use client'

import { DataTableColumnHeader } from '@/features/pre-auction/auction-maintenance/components/data-table-column-header'
import { DataTableRowActions } from '@/features/pre-auction/auction-maintenance/components/data-table-row-actions'
import { Checkbox } from '@/src/components/ui/checkbox'
import { AuctionEntity } from '@/types/entities/auction.entity.ts'
import { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import { LotStatus } from './lot-status'

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
      cell: ({ row }) => {
         const lots = row.original.AuctionLot || []
         return (
            <div className="space-y-1">
               {lots.map((lot) => (
                  <div key={lot.id}>{lot.lotNumber}</div>
               ))}
            </div>
         )
      }
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
      cell: ({ row }) => {
         const lots = row.original.AuctionLot || []
         return (
            <div className="space-y-1">
               {lots.map((lot) => (
                  <div key={lot.id}>{lot.Vehicle?.plate}</div>
               ))}
            </div>
         )
      }
   },
   {
      accessorKey: 'chassis',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Chassi" />
      ),
      cell: ({ row }) => {
         const lots = row.original.AuctionLot || []
         return (
            <div className="space-y-1">
               {lots.map((lot) => (
                  <div key={lot.id}>{lot.Vehicle?.chassis}</div>
               ))}
            </div>
         )
      }
   },
   {
      accessorKey: 'model',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Marca/Modelo" />
      ),
      cell: ({ row }) => {
         const lots = row.original.AuctionLot || []
         return (
            <div className="space-y-1">
               {lots.map((lot) => (
                  <div key={lot.id}>
                     {`${lot.Vehicle?.brand?.name || ''} / ${
                        lot.Vehicle?.model?.name || ''
                     }`}
                  </div>
               ))}
            </div>
         )
      }
   },
   {
      accessorKey: 'type',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Tipo" />
      ),
      cell: ({ row }) => {
         const lots = row.original.AuctionLot || []
         return (
            <div className="space-y-1">
               {lots.map((lot) => (
                  <div key={lot.id}>{lot.Vehicle?.type?.name || ''}</div>
               ))}
            </div>
         )
      }
   },
   {
      accessorKey: 'status',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status do lote" />
      ),
      cell: ({ row }) => <LotStatus row={row} />
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
                  <React.Fragment>
                     <span className="material-symbols-outlined text-red-500">
                        warning
                     </span>
                     <span className="text-sm text-red-500">
                        {`${debts.length} débito${
                           debts.length > 1 ? 's' : ''
                        } (R$ ${totalDebtValue.toFixed(2)})`}
                     </span>
                  </React.Fragment>
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
