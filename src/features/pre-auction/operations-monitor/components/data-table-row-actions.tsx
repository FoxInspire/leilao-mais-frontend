'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/src/lib/utils'
import { Row } from '@tanstack/react-table'

interface OperationsMonitorDataTableRowActionsProps<TData> {
   row?: Row<TData>
   onSelect: (value: string) => void
}

export function OperationsMonitorDataTableRowActions<TData>({
   onSelect
}: OperationsMonitorDataTableRowActionsProps<TData>) {
   const menuItems = [
      {
         icon: 'schedule',
         label: 'Agendar transação',
         value: 'schedule-transaction',
         filled: false
      },
      {
         icon: 'cancel',
         label: 'Cancelar agendamento',
         value: 'cancel-schedule',
         filled: false
      },
      {
         icon: 'sync',
         label: 'Reiniciar transações',
         value: 'restart-transactions',
         filled: false
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
                  <DropdownMenuItem
                     className="font-medium"
                     onClick={() => onSelect(item.value)}
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
