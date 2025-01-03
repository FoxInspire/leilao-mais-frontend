'use client'

import * as React from 'react'

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog'
import { TableAuctionLots } from '@/features/pre-auction/auction-lots/components/data-table'
import { DataTableColumnHeader } from '@/features/pre-auction/auction-maintenance/components/data-table-column-header'
import { Button } from '@/src/components/ui/button'
import { AuctionEntity, AuctionLot } from '@/types/entities/auction.entity'
import { ColumnDef, Row } from '@tanstack/react-table'

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

   return (
      <React.Fragment>
         <div>
            <div className="flex items-center">
               <React.Fragment>
                  {row.original.AuctionLot?.[0]?.Ggv?.Grv?.Restriction?.[0] && (
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDialog(true)}
                     >
                        <span className="material-symbols-outlined text-primary-default dark:text-dark-primary-default cursor-pointer">
                           warning
                        </span>
                     </Button>
                  )}
                  {auctionCount > 0 && (
                     <Button
                        variant="ghost"
                        size="icon"
                        className="w-auto px-2 hover:bg-transparent cursor-default"
                     >
                        <div className="flex items-center justify-center gap-1">
                           <span className="text-sm text-text-secondary">
                              {auctionCount}
                           </span>
                           <span className="material-symbols-outlined text-text-secondary dark:text-dark-text-secondary">
                              sync
                           </span>
                        </div>
                     </Button>
                  )}
                  {hasEmailNotification && (
                     <Button
                        variant="ghost"
                        size="icon"
                        className="w-auto px-2 hover:bg-transparent cursor-default"
                     >
                        <span className="material-symbols-outlined text-text-secondary dark:text-dark-text-secondary">
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
                        <div className="flex-1 overflow-auto pb-4">
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

         const subRestrictionMapper: Record<string, string> = {
            administrative: 'Administrativa',
            judicial: 'Judicial',
            theft: 'Roubo',
            alienation: 'Alienação'
         }
         return (
            <div className="space-y-1">
               <div>
                  {restriction?.type
                     ? subRestrictionMapper[restriction.type] || '-'
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
