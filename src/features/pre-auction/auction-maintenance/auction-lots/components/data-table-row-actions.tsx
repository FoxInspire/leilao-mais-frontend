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
import { Row } from '@tanstack/react-table'

interface DataTableRowActionsProps<TData> {
   row?: Row<TData>
   onSelect: (value: string) => void
}

export function DataTableRowActions<TData>({
   onSelect
}: DataTableRowActionsProps<TData>) {
   const menuItems = [
      {
         icon: 'edit',
         label: 'Editar lote',
         value: 'edit-lot',
         filled: false,
         disabled: true
      },
      {
         icon: 'check_circle',
         label: 'Lançar perícia',
         value: 'launch-expertise',
         filled: false,
         disabled: true
      },
      {
         icon: 'calendar_today',
         label: 'Histórico',
         value: 'history',
         filled: false,
         disabled: true
      },
      {
         icon: 'content_cut',
         label: 'Zerar numeração',
         value: 'reset-numbering',
         filled: false,
         disabled: true
      },
      {
         icon: 'content_paste',
         label: 'Criar numeração lote',
         value: 'create-lot-numbering',
         filled: false,
         disabled: true
      },
      {
         icon: 'delete',
         label: 'Deletar lote',
         value: 'delete-lot',
         filled: false,
         disabled: true
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
                     disabled={item.disabled}
                     onClick={() => {
                        onSelect?.(item.value)
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
