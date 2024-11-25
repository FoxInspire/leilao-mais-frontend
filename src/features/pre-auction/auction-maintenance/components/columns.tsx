'use client'

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select'
import { Auction } from '@/features/pre-auction/auction-maintenance/schemas/auction-mock'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import React from 'react'

export const columns: ColumnDef<Auction>[] = [
   {
      id: 'select',
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
      accessorKey: 'date',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
      cell: ({ row }) => <div>{row.getValue('date')}</div>
   },
   {
      accessorKey: 'auction',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Leilão" />
      ),
      cell: ({ row }) => (
         <div className="font-bold font-nunito text-primary-default uppercase">
            {row.getValue('auction')}
         </div>
      )
   },
   {
      accessorKey: 'location',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Local" />
      ),
      cell: ({ row }) => <div>{row.getValue('location')}</div>
   },
   {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
      cell: ({ row }) => <div>{row.getValue('id')}</div>
   },
   {
      accessorKey: 'status',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status do leilão" />
      ),
      cell: ({ row }) => (
         <div>
            <Select>
               <SelectTrigger
                  unstyled
                  className="flex items-center gap-2 font-bold font-nunito text-primary-default text-base"
               >
                  <SelectValue
                     placeholder={
                        <React.Fragment>{row.getValue('status')}</React.Fragment>
                     }
                  />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="assembly">Montagem</SelectItem>
                  <SelectItem value="organs_evaluation">Avaliação órgão</SelectItem>
                  <SelectItem value="payment_confirmation">
                     Confirmação de pagamento
                  </SelectItem>
               </SelectContent>
            </Select>
         </div>
      )
   },
   {
      accessorKey: 'committer',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Comitente" />
      ),
      cell: ({ row }) => <div>{row.getValue('committer')}</div>
   },
   {
      accessorKey: 'lots',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Lotes" />
      ),
      cell: ({ row }) => (
         <React.Fragment>
            {row.getValue('lots') === 0 ? (
               <Button variant="icon" size="icon">
                  <span className="material-symbols-outlined">add</span>
               </Button>
            ) : (
               <span className="font-bold font-nunito text-primary-default">
                  {row.getValue('lots')}
               </span>
            )}
         </React.Fragment>
      )
   },
   {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} onSelect={(value) => {}} />
   }
]
