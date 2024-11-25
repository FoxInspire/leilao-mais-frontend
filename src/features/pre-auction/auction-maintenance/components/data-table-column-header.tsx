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
   className?: {
      container?: string
      title?: string
   }
}

export function DataTableColumnHeader<TData, TValue>({
   column,
   title,
   ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
   if (!column.getCanSort()) {
      return <div className="uppercase">{title}</div>
   }

   return (
      <div className={cn('flex items-center space-x-2', props.className?.container)}>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <div className="flex items-center space-x-2">
                  <span className={cn('text-black', props.className?.title)}>
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
                  <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Ascendente
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                  <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Descendente
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                  <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Ocultar
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
