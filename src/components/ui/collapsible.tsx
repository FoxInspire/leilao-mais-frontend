'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
   React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
   React.ComponentPropsWithoutRef<
      typeof CollapsiblePrimitive.CollapsibleTrigger
   >
>(({ className, ...props }, ref) => (
   <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={cn(
         'peer/menu-button flex h-10 w-full items-center justify-between gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-1 dark:hover:dark:hover:bg-[#fafafa0a] [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
         className
      )}
      {...props}
   />
))

CollapsibleTrigger.displayName =
   CollapsiblePrimitive.CollapsibleTrigger.displayName

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
