'use client'

import { DataTableColumnHeader } from '@/features/pre-auction/auction-maintenance/components/data-table-column-header'
import { Checkbox } from '@/src/components/ui/checkbox'
import { AuctionEntity } from '@/types/entities/auction.entity'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export const columns_insert_lots: ColumnDef<AuctionEntity>[] = [
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
      accessorKey: 'process',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Processo" />
      ),
      cell: ({ row }) => {
         const lots = row.original.AuctionLot || []
         return (
            <div className="space-y-1">
               {lots.map((lot) => (
                  <div key={lot.id}>{lot.Auction?.auctionCode || '-'}</div>
               ))}
            </div>
         )
      }
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
      accessorKey: 'color',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Cor" />
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
      accessorKey: 'previous_auction',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Leilão anterior" />
      ),
      cell: ({ row }) => {
         return <div className="space-y-1">{'-'}</div>
      }
   },
   {
      accessorKey: 'previous_status',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status anterior" />
      ),
      cell: ({ row }) => {
         return <div className="space-y-1">{'-'}</div>
      }
   },
   {
      accessorKey: 'endRemovalDate',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Data/hora remoção" />
      ),
      cell: ({ row }) => {
         return (
            <div className="space-y-1">
               {format(row.original.endRemovalDate, 'dd/MM/yyyy HH:mm')}
            </div>
         )
      }
   }
]
