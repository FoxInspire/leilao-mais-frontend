'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ExportLotsAction } from '@/features/pre-auction/auction-maintenance/components/actions/export-lots-action'
import { GenerateNoticeAction } from '@/features/pre-auction/auction-maintenance/components/actions/generate-notice-action'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

interface DataTableRowActionsProps {
   row?: Row<AuctionEntity>
   onSelect?: (value: string) => void
}

export function DataTableRowActions({
   row,
   onSelect
}: DataTableRowActionsProps) {
   const router = useRouter()

   const [dialog, setDialog] = React.useState({
      export_lots: false,
      generate_notice: false
   })

   const menuItems = [
      {
         icon: 'add',
         label: 'Ingressar lotes',
         value: 'add-lots',
         filled: false,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.auction.insert_lots(
                  String(row?.original?.auctionCode)
               )
            )
         }
      },
      {
         icon: 'edit',
         label: 'Editar leilão',
         value: 'edit-auction',
         filled: true,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.auction.edit(
                  String(row?.original?.auctionCode)
               )
            )
         }
      },
      {
         icon: 'open_in_new',
         label: 'Exportar lotes',
         value: 'export-lots',
         filled: false,
         disabled: false,
         onClick: () => {
            setDialog({ ...dialog, export_lots: true })
         }
      },
      {
         icon: 'content_paste',
         label: 'Gerar edital de leilão',
         value: 'generate-notice',
         filled: false,
         disabled: false,
         onClick: () => {
            setDialog({ ...dialog, generate_notice: true })
         }
      },
      {
         icon: 'mail',
         label: 'Notificar proprietários',
         value: 'notify-owners',
         filled: false,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.auction.notify_owners(
                  String(row?.original?.auctionCode)
               )
            )
         }
      },
      {
         icon: 'download',
         label: 'Importar proprietários',
         value: 'import-owners',
         filled: false,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.auction.import_owners(
                  String(row?.original?.auctionCode)
               )
            )
         }
      },
      {
         icon: 'monitor',
         label: 'Monitor de operações',
         value: 'operations-monitor',
         filled: false,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.operations.details(
                  String(row?.original?.auctionCode)
               )
            )
         }
      }
   ]

   return (
      <React.Fragment>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="icon"
                  size="icon"
                  className="flex data-[state=open]:bg-muted"
               >
                  <span className="material-symbols-outlined text-text-secondary dark:text-dark-text-secondary">
                     more_vert
                  </span>
                  <span className="sr-only">Open menu</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               {menuItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                     {index === menuItems.length - 1 && (
                        <DropdownMenuSeparator />
                     )}
                     <DropdownMenuItem
                        className="font-medium"
                        disabled={item.disabled}
                        onClick={() => {
                           onSelect?.(item.value)
                           item.onClick?.()
                        }}
                     >
                        <span
                           className={cn(
                              'material-symbols-outlined text-text-secondary symbol-md dark:text-dark-text-secondary',
                              item.filled && 'filled'
                           )}
                        >
                           {item.icon}
                        </span>
                        {item.label}
                     </DropdownMenuItem>
                  </React.Fragment>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
         <Dialog open={dialog.export_lots || dialog.generate_notice}>
            <DialogContent
               className={cn({
                  'md:max-w-xl': dialog.export_lots,
                  'md:max-w-7xl': dialog.generate_notice
               })}
            >
               {dialog.export_lots && (
                  <ExportLotsAction
                     id={row?.original?.auctionCode || '-'}
                     onExport={() => {}}
                     onClose={() =>
                        setDialog({
                           ...dialog,
                           export_lots: false
                        })
                     }
                  />
               )}
               {dialog.generate_notice && (
                  <GenerateNoticeAction
                     row={row}
                     onClose={() => {
                        setDialog({
                           ...dialog,
                           generate_notice: false
                        })
                     }}
                  />
               )}
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}
