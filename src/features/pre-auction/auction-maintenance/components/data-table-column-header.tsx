import { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
   extends React.HTMLAttributes<HTMLDivElement> {
   column: Column<TData, TValue>
   title: string
}

export function DataTableColumnHeader<TData, TValue>({
   column,
   title,
   className
}: DataTableColumnHeaderProps<TData, TValue>) {
   if (!column.getCanSort()) {
      return <div className={cn(className)}>{title}</div>
   }

   return (
      <div className={cn('flex items-center space-x-2', className)}>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <div className="flex items-center space-x-2">
                  <span className="text-black">{title}</span>
                  {column.getIsSorted() === 'desc' ? (
                     <ArrowDown className="h-4 w-4" />
                  ) : column.getIsSorted() === 'asc' ? (
                     <ArrowUp className="h-4 w-4" />
                  ) : (
                     <ChevronsUpDown className="h-4 w-4" />
                  )}
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
               <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                  <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Asc
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                  <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Desc
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                  <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Hide
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
