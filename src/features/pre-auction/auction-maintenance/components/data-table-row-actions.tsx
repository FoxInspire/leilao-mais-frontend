'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

interface DataTableRowActionsProps<TData> {
   row?: Row<AuctionEntity>
   onSelect?: (value: string) => void
}

export function DataTableRowActions<TData>({
   row,
   onSelect
}: DataTableRowActionsProps<TData>) {
   const router = useRouter()

   console.log('row?.original', row?.original)

   const menuItems = [
      {
         icon: 'add',
         label: 'Ingressar lotes',
         value: 'add-lots',
         filled: false,
         onClick: () => {}
      },
      {
         icon: 'edit',
         label: 'Editar leilão',
         value: 'edit-auction',
         filled: true,
         onClick: () => {
            router.push(
               pre_auction_routes.edit_auction(
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
         onClick: () => {}
      },
      {
         icon: 'content_paste',
         label: 'Gerar edital de leilão',
         value: 'generate-notice',
         filled: false,
         onClick: () => {}
      },
      {
         icon: 'mail',
         label: 'Notificar proprietários',
         value: 'notify-owners',
         filled: false,
         onClick: () => {}
      },
      {
         icon: 'download',
         label: 'Importar proprietários',
         value: 'import-owners',
         filled: false,
         onClick: () => {}
      },
      {
         icon: 'monitor',
         label: 'Monitor de operações',
         value: 'operations-monitor',
         filled: false,
         onClick: () => {}
      }
   ]

   return (
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
                  {index === menuItems.length - 1 && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                     className="font-medium"
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
   )
}
