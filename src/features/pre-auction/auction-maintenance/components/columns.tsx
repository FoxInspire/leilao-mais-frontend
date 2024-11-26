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
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import React from 'react'

export const columns: ColumnDef<Auction>[] = [
   //    {
   //       id: 'select',
   //       header: ({ table }) => (
   //          <Checkbox
   //             checked={
   //                table.getIsAllPageRowsSelected() ||
   //                (table.getIsSomePageRowsSelected() && 'indeterminate')
   //             }
   //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
   //             aria-label="Select all"
   //             className="translate-y-[2px]"
   //          />
   //       ),
   //       cell: ({ row }) => (
   //          <Checkbox
   //             checked={row.getIsSelected()}
   //             onCheckedChange={(value) => row.toggleSelected(!!value)}
   //             aria-label="Select row"
   //             className="translate-y-[2px]"
   //          />
   //       ),
   //       enableSorting: false,
   //       enableHiding: false
   //    },
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
         const [tempStatus, setTempStatus] = React.useState<string | null>(null)
         const [currentStatus, setCurrentStatus] = React.useState(
            row.getValue('status') as string
         )

         const handleValueChange = (value: string) => {
            setTempStatus(value)
            setDialog(true)
         }

         const handleConfirm = () => {
            if (tempStatus) {
               setCurrentStatus(tempStatus)
               console.log('Novo status:', tempStatus)
            }
            setTempStatus(null)
            setDialog(false)
         }

         const handleCancel = () => {
            setTempStatus(null)
            setDialog(false)
         }

         const statusOptions = [
            { value: 'assembly', label: 'Montagem' },
            { value: 'organs_evaluation', label: 'Avaliação órgão' },
            { value: 'payment_confirmation', label: 'Confirmação de pagamento' }
         ]

         return (
            <React.Fragment>
               <div>
                  <Select
                     onValueChange={handleValueChange}
                     value={
                        statusOptions.find(
                           (option) => option.label === currentStatus
                        )?.value || undefined
                     }
                  >
                     <SelectTrigger
                        unstyled
                        className="flex items-center gap-2 font-bold font-nunito text-primary-default dark:text-dark-primary-default text-sm uppercase"
                     >
                        <SelectValue
                           placeholder={
                              statusOptions.find(
                                 (option) => option.value === currentStatus
                              )?.label || ''
                           }
                        />
                     </SelectTrigger>
                     <SelectContent>
                        {statusOptions.map((option) => (
                           <SelectItem key={option.value} value={option.value}>
                              {option.label}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <Dialog open={dialog} onOpenChange={setDialog}>
                     <DialogContent className="md:max-w-lg">
                        <DialogHeader>
                           <DialogTitle>Alterar status</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4 pb-6">
                           <div className="flex flex-1 justify-center items-center">
                              <span className="material-symbols-outlined text-error-default symbol-xl">
                                 warning
                              </span>
                           </div>
                           <div className="space-y-2">
                              <p className="text-lg text-center font-montserrat font-medium">
                                 Alterar o status do leilão
                              </p>
                              <p className="text-center text-sm font-montserrat">
                                 Esta ação irá notificar o Pátio/DETRAN. Deseja
                                 continuar?
                              </p>
                           </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 mb-6 mt-2">
                           <div className="md:order-1 order-2">
                              <Button
                                 variant="destructive"
                                 className="w-full"
                                 onClick={handleCancel}
                              >
                                 Cancelar
                              </Button>
                           </div>
                           <div className="md:order-2 order-1">
                              <Button
                                 variant="default"
                                 className="w-full"
                                 onClick={handleConfirm}
                              >
                                 Confirmar
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
