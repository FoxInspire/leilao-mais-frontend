'use client'

import { Checkbox } from '@/src/components/ui/checkbox'
import { DataTableColumnHeader } from '@/src/components/ui/data-table-column-header'
import { AvaliableLotEntity } from '@/src/types/entities/avaliable-lot.entity'
import { auctionLotStatusOptions } from '@/src/utils/auction-lot-status'
import { ColumnDef } from '@tanstack/react-table'

export const columns_insert_lots: ColumnDef<AvaliableLotEntity>[] = [
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
      accessorKey: 'grvCode',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Processo" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.grvCode}</div>
      }
   },
   {
      accessorKey: 'vehiclePlate',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Placa" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.vehiclePlate}</div>
      }
   },
   {
      accessorKey: 'vehicleChassis',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Chassi" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.vehicleChassis}</div>
      }
   },
   {
      accessorKey: 'vehicleBrand',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Marca" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.vehicleBrand}</div>
      }
   },
   {
      accessorKey: 'vehicleType',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Tipo" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.vehicleType}</div>
      }
   },
   {
      accessorKey: 'vehicleColor',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Cor" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.vehicleColor}</div>
      }
   },
   {
      accessorKey: 'previousAuction',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Leilão anterior" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.previousAuction?.auctionCode || '-'}</div>
      }
   },
   {
      accessorKey: 'previousStatus',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status anterior" />
      ),
      cell: ({ row }) => {
         return (
            <div>
               {auctionLotStatusOptions.find(
                  (option) => option.value === row.original.previousStatus
               )?.label || '-'}
            </div>
         )
      }
   }
]
