import * as React from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/src/hooks/useMobile'

type CollapsibleSidebarProps = {
   side?: 'left' | 'right'
   className?: string
   children: React.ReactNode
   open?: boolean
   onOpenChange?: (open: boolean) => void
   hasHeaderMenu?: boolean
}

export function CollapsibleSidebar({
   side = 'right',
   className,
   children,
   open: openProp,
   onOpenChange,
   hasHeaderMenu = false
}: CollapsibleSidebarProps) {
   const isMobile = useIsMobile()
   const [_open, _setOpen] = React.useState(false)

   const open = openProp ?? _open

   const handleOpenChange = (newOpen: boolean) => {
      if (isMobile) {
         _setOpen(newOpen)
      }
      onOpenChange?.(newOpen)
   }

   if (isMobile) {
      return (
         <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
               data-sidebar="sidebar"
               data-mobile="true"
               side={side}
               className="w-full"
               hasCloseButton={false}
            >
               <SheetHeader>
                  <SheetTitle className="opacity-0">Menu</SheetTitle>
                  <div className="flex h-full w-full flex-col">{children}</div>
               </SheetHeader>
            </SheetContent>
         </Sheet>
      )
   }

   return (
      <div
         className={cn(
            'relative transition-[width] duration-300 ease-in-out',
            open ? 'w-96' : 'w-0',
            hasHeaderMenu ? 'mt-14' : '',
            className
         )}
      >
         <div
            className={cn(
               'h-full bg-background',
               'overflow-hidden',
               open ? 'opacity-100' : 'opacity-0',
               'transition-opacity duration-300'
            )}
         >
            {children}
         </div>
      </div>
   )
}
