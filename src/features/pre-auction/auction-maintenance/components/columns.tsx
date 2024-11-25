'use client'

import { Checkbox } from '@/src/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/src/components/ui/button'
import React from 'react'

export const columns: ColumnDef<Task>[] = [
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
         <div className="font-semibold text-primary-default">
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
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="icon" size="icon">
                        <span className="material-symbols-outlined">add</span>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem>
                        <span className="material-symbols-outlined text-text-secondary symbol-md">
                           add
                        </span>
                        Ingressar lotes
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <span className="material-symbols-outlined text-text-secondary symbol-md filled">
                           edit
                        </span>
                        Editar leilão
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <span className="material-symbols-outlined text-text-secondary symbol-md">
                           open_in_new
                        </span>
                        Exportar lotes
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <span className="material-symbols-outlined text-text-secondary symbol-md">
                           content_paste
                        </span>
                        Gerar edital de leilão
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <span className="material-symbols-outlined text-text-secondary symbol-md">
                           mail
                        </span>
                        Notificar proprietários
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <span className="material-symbols-outlined text-text-secondary symbol-md">
                           download
                        </span>
                        Importar proprietários
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>
                        <span className="material-symbols-outlined text-text-secondary symbol-md">
                           monitor
                        </span>
                        Monitor de operações
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            ) : (
               <div>{row.getValue('lots')}</div>
            )}
         </React.Fragment>
      )
   },
   {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} />
   }
]
