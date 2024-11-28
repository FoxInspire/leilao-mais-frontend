'use client'

import { DataTableRowActions } from '@/features/pre-auction/auction-lots/components/data-table-row-actions'
import { LotAlerts } from '@/features/pre-auction/auction-lots/components/lot-alert'
import { LotStatus } from '@/features/pre-auction/auction-lots/components/lot-status'
import { DataTableColumnHeader } from '@/features/pre-auction/auction-maintenance/components/data-table-column-header'
import { Checkbox } from '@/src/components/ui/checkbox'
import { AuctionEntity } from '@/types/entities/auction.entity'
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
         return <LotAlerts row={row} />
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
