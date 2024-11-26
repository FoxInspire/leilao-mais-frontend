'use client'

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog'
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
         <div className="font-bold font-nunito text-primary-default dark:text-dark-primary-default uppercase">
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
      cell: ({ row }) => {
         const [dialog, setDialog] = React.useState(false)

         return (
            <React.Fragment>
               <div>
                  <Select onValueChange={() => setDialog(true)}>
                     <SelectTrigger
                        unstyled
                        className="flex items-center gap-2 font-bold font-nunito text-primary-default dark:text-dark-primary-default text-sm uppercase"
                     >
                        <SelectValue
                           placeholder={
                              <React.Fragment>
                                 {row.getValue('status')}
                              </React.Fragment>
                           }
                        />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="assembly">Montagem</SelectItem>
                        <SelectItem value="organs_evaluation">
                           Avaliação órgão
                        </SelectItem>
                        <SelectItem value="payment_confirmation">
                           Confirmação de pagamento
                        </SelectItem>
                     </SelectContent>
                  </Select>
                  <Dialog>
                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Busca avançada</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4 pb-6">
                           <p className="text-lg font-montserrat">
                              Preencha os campos necessários para busca
                           </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 mb-6 mt-2">
                           <div className="md:order-1 order-2">
                              <Button variant="destructive" className="w-full">
                                 Cancelar
                              </Button>
                           </div>
                           <div className="md:order-2 order-1">
                              <Button variant="default" className="w-full">
                                 Buscar
                              </Button>
                           </div>
                        </div>
                     </DialogContent>
                  </Dialog>
               </div>
            </React.Fragment>
         )
      }
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
               <span className="font-bold font-nunito text-primary-default dark:text-dark-primary-default">
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
