'use client'

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/src/components/ui/button'
import { AuctionEntity, AuctionLot } from '@/types/entities/auction.entity'
import { ColumnDef, Row } from '@tanstack/react-table'

import React from 'react'
import { DataTableColumnHeader } from '../../auction-maintenance/components/data-table-column-header'
import { TableAuctionLots } from './data-table'

interface LotAlertsProps {
   row: Row<AuctionEntity>
}

export const LotAlerts: React.FC<LotAlertsProps> = ({
   row
}: LotAlertsProps) => {
   const [dialog, setDialog] = React.useState(false)

   const auctionCount = row.original.AuctionLot?.length || 0
   const hasEmailNotification =
      row.original.AuctionLot?.[0]?.hasEmailNotification || false

   const handleOpenModal = () => setDialog(true)

   return (
      <React.Fragment>
         <div>
            {/* <Select onValueChange={handleValueChange} value={currentStatus}>
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
            </Select> */}
            <div className="flex items-center">
               <React.Fragment>
                  {/* abre o modal */}
                  <Button variant="ghost" size="icon" onClick={handleOpenModal}>
                     <span className="material-symbols-outlined text-primary-default dark:text-dark-primary-default cursor-pointer">
                        warning
                     </span>
                  </Button>

                  {/* só exibe a quantidade de leilões que esse lote já participou */}
                  <Button
                     variant="ghost"
                     size="icon"
                     className="w-auto px-2 hover:bg-transparent cursor-default"
                  >
                     <div className="flex items-center justify-center gap-1">
                        <span className="text-sm text-text-secondary">
                           {auctionCount}
                        </span>
                        <span className="material-symbols-outlined text-text-secondary">
                           sync
                        </span>
                     </div>
                  </Button>

                  {/* se foi enviado notificação, exibe o ícone de email */}
                  {hasEmailNotification && (
                     <Button
                        variant="ghost"
                        size="icon"
                        className="w-auto px-2 hover:bg-transparent cursor-default"
                     >
                        <span className="material-symbols-outlined text-text-secondary">
                           mail
                        </span>
                     </Button>
                  )}
               </React.Fragment>
            </div>
            <Dialog open={dialog} onOpenChange={setDialog}>
               <DialogContent className="md:max-w-6xl">
                  <DialogHeader>
                     <DialogTitle>Restrições</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4 pb-6">
                     <div className="space-y-2">
                        <p className="text-lg font-montserrat font-medium">
                           PROCESSO - {row.original.id}
                        </p>
                     </div>
                     <div className="grid w-full overflow-scroll max-h-[calc(100vh-17.4125rem)]">
                        <div className="flex-1 overflow-auto">
                           <TableAuctionLots
                              data={row.original.AuctionLot || []}
                              columns={process_columns}
                           />
                        </div>
                     </div>
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      </React.Fragment>
   )
}

const process_columns: ColumnDef<AuctionLot>[] = [
   {
      accessorKey: 'origin',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Origem" />
      ),
      cell: ({ row }) => {
         return (
            <div className="space-y-1">
               <div>{row.original.Ggv?.grvCode || '-'}</div>
            </div>
         )
      }
   },
   {
      accessorKey: 'restriction',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Restrição" />
      ),
      cell: ({ row }) => {
         const restriction = row.original.Ggv?.Grv?.Restriction?.[0]
         return (
            <div className="space-y-1">
               <div>{restriction?.name || '-'}</div>
            </div>
         )
      }
   },
   {
      accessorKey: 'subRestriction',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Sub-restrição" />
      ),
      cell: ({ row }) => {
         const restriction = row.original.Ggv?.Grv?.Restriction?.[0]
         return (
            <div className="space-y-1">
               <div>
                  {restriction?.type
                     ? restriction?.type.charAt(0).toUpperCase() +
                       restriction?.type.slice(1).toLowerCase()
                     : '-'}
               </div>
            </div>
         )
      }
   },
   {
      accessorKey: 'observation',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Observação" />
      ),
      cell: ({ row }) => {
         return (
            <div className="space-y-1">
               <div>{'-'}</div>
            </div>
         )
      }
   }
]
