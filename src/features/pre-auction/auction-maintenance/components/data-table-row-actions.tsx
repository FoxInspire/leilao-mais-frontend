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

import React from 'react'

interface DataTableRowActionsProps<TData> {
   row?: Row<TData>
   onSelect: (value: string) => void
}

export function DataTableRowActions<TData>({
   onSelect
}: DataTableRowActionsProps<TData>) {
   const menuItems = [
      {
         icon: 'add',
         label: 'Ingressar lotes',
         value: 'add-lots',
         filled: false
      },
      {
         icon: 'edit',
         label: 'Editar leilão',
         value: 'edit-auction',
         filled: true
      },
      {
         icon: 'open_in_new',
         label: 'Exportar lotes',
         value: 'export-lots',
         filled: false
      },
      {
         icon: 'content_paste',
         label: 'Gerar edital de leilão',
         value: 'generate-notice',
         filled: false
      },
      {
         icon: 'mail',
         label: 'Notificar proprietários',
         value: 'notify-owners',
         filled: false
      },
      {
         icon: 'download',
         label: 'Importar proprietários',
         value: 'import-owners',
         filled: false
      },
      {
         icon: 'monitor',
         label: 'Monitor de operações',
         value: 'operations-monitor',
         filled: false
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
               <span className="material-symbols-outlined text-text-secondary">
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
                     onClick={() => onSelect(item.value)}
                  >
                     <span
                        className={cn(
                           'material-symbols-outlined text-text-secondary symbol-md',
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
