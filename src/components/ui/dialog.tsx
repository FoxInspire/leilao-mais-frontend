'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Overlay>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
         'pointer-events-none fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
         className
      )}
      {...props}
   />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
   <DialogPortal>
      <DialogOverlay />
      <DialogDescription />
      <DialogPrimitive.Content
         ref={ref}
         onPointerDownOutside={(e) => e.preventDefault()}
         className={cn(
            'fixed bottom-0 left-auto right-0 top-auto z-50 grid max-h-[85vh] w-full translate-x-0 translate-y-0 gap-4 overflow-y-auto rounded-t-2xl rounded-bl-none rounded-br-none bg-white shadow-lg duration-200',
            'pb-12 md:bottom-auto md:left-[50%] md:right-auto md:top-[50%] md:max-w-4xl md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-xl md:pb-0',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=closed]:slide-out-to-top-[48%] md:data-[state=open]:slide-in-from-left-1/2 md:data-[state=open]:slide-in-from-top-[48%]',
            'dark:border-neutral-800 dark:bg-dark-background-paper',
            className
         )}
         {...props}
      >
         <div className="px-6">{children}</div>
      </DialogPrimitive.Content>
   </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn(
         'flex flex-col space-y-1.5 text-center sm:text-left',
         className
      )}
      {...props}
   />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn(
         'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
         className
      )}
      {...props}
   />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Title>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
      onClose?: () => void
   }
>(({ className, onClose, ...props }, ref) => (
   <div className="-mx-6 flex items-center justify-between bg-dark-background-paper px-6 py-4 text-white dark:bg-dark-primary-default">
      <DialogPrimitive.Title
         ref={ref}
         className={cn(
            'font-montserrat text-xl font-semibold leading-none tracking-tight',
            className
         )}
         {...props}
      />
      <DialogPrimitive.Close
         className="flex items-center justify-center rounded-sm opacity-70 ring-0 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400"
         onClick={() => onClose?.()}
      >
         <span className="material-symbols-outlined">close</span>
         <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
   </div>
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Description>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Description
      ref={ref}
      className={cn(
         'text-sm text-neutral-500 dark:text-neutral-400',
         className
      )}
      {...props}
   />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogOverlay,
   DialogPortal,
   DialogTitle,
   DialogTrigger
}
