'use client'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react'

interface DataTableColumnHeaderProps<TData, TValue>
   extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
   column: Column<TData, TValue>
   title: string
   hideSort?: boolean
   className?: {
      container?: string
      title?: string
   }
}

export function DataTableColumnHeader<TData, TValue>({
   column,
   title,
   hideSort = false,
   ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
   if (!column.getCanSort()) {
      return (
         <span
            className={cn(
               'text-black dark:text-neutral-200',
               props.className?.title
            )}
         >
            {title}
         </span>
      )
   }

   if (hideSort) {
      return (
         <span
            className={cn(
               'text-black dark:text-neutral-200',
               props.className?.title
            )}
         >
            {title}
         </span>
      )
   }

   return (
      <div
         className={cn(
            'flex items-center space-x-2',
            props.className?.container
         )}
      >
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <div className="flex items-center space-x-2">
                  <span
                     className={cn(
                        'text-black dark:text-neutral-200',
                        props.className?.title
                     )}
                  >
                     {title}
                  </span>
                  {column.getIsSorted() === 'desc' ? (
                     <ArrowDown className="h-4 w-4" />
                  ) : column.getIsSorted() === 'asc' ? (
                     <ArrowUp className="h-4 w-4" />
                  ) : (
                     <ChevronsUpDown className="h-4 w-4" />
                  )}
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
               <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                  <ArrowUp className="text-muted-foreground/70 h-3.5 w-3.5" />
                  Ascendente
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                  <ArrowDown className="text-muted-foreground/70 h-3.5 w-3.5" />
                  Descendente
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                  <EyeOff className="text-muted-foreground/70 h-3.5 w-3.5" />
                  Ocultar
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
