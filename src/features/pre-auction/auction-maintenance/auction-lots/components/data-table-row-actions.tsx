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
   row?: Row<AuctionEntity & { lotNumber: string }>
   onSelect?: (value: string) => void
}

export function DataTableRowActions<TData>({
    row,
   onSelect
}: DataTableRowActionsProps<TData>) {
    const router = useRouter()

   const menuItems = [
      {
         icon: 'edit',
         label: 'Editar lote',
         value: 'edit-lot',
         filled: false,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.auction.update_lot(
                  row?.original?.lotNumber as string
               )
            )
         }
      },
      {
         icon: 'check_circle',
         label: 'Lançar perícia',
         value: 'launch-expertise',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'calendar_today',
         label: 'Histórico',
         value: 'history',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'content_cut',
         label: 'Zerar numeração',
         value: 'reset-numbering',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'content_paste',
         label: 'Criar numeração lote',
         value: 'create-lot-numbering',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'delete',
         label: 'Deletar lote',
         value: 'delete-lot',
         filled: false,
         disabled: true,
         onClick: () => {}
      }
   ]
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="icon"
               size="icon"
               className="data-[state=open]:bg-muted flex"
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
                     disabled={item.disabled}
                     onClick={() => {
                        onSelect?.(item.value)
                        item?.onClick()
                     }}
                  >
                     <span
                        className={cn(
                           'material-symbols-outlined symbol-md text-text-secondary dark:text-dark-text-secondary',
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
