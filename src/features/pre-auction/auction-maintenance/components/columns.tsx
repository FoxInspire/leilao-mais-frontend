'use client'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Auction } from '@/src/features/pre-auction/auction-maintenance/data/schema'
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
         <div className="font-semibold text-primary-default uppercase">
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
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-6 py-0">
                     <span className="font-semibold">{row.getValue('status')}</span>
                     <span className="material-symbols-outlined rotate-180 ml-1">
                        keyboard_arrow_up
                     </span>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuItem>Montagem</DropdownMenuItem>
                  <DropdownMenuItem>Avaliação órgão</DropdownMenuItem>
                  <DropdownMenuItem>Confirmação de pagamento</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
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
               <span className="font-semibold text-primary-default">
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
