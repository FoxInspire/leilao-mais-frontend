'use client'

import { DataTableColumnHeader } from '@/features/pre-auction/auction-maintenance/components/data-table-column-header'
import { Checkbox } from '@/src/components/ui/checkbox'
import { AuctionEntity } from '@/types/entities/auction.entity'
import { ColumnDef } from '@tanstack/react-table'

import { OperationsMonitorDataTableRowActions } from './data-table-row-actions'
import { OperationLotStatus } from './lot-status'
import { ScheduleStatus } from './schedule-status'
import { TransactionStatus } from './transaction-status'

export const columns_operation_monitor_details: ColumnDef<AuctionEntity>[] = [
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
      accessorKey: 'lot_status',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status do lote" />
      ),
      cell: ({ row }) => {
         return <OperationLotStatus row={row} />
      }
   },
   {
      accessorKey: 'transaction',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Transação" />
      ),
      cell: ({ row }) => {
         return <TransactionStatus row={row} />
      }
   },
   {
      accessorKey: 'message',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Mensagem" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.description}</div>
      }
   },
   {
      id: 'schedule',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Agendamento" />
      ),
      cell: ({ row }) => <ScheduleStatus row={row} />
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <OperationsMonitorDataTableRowActions
            row={row}
            onSelect={(value) => {}}
         />
      )
   }
]
