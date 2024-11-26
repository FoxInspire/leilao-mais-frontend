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
         'fixed inset-0 z-50 backdrop-blur-[2px] bg-black/50  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-none',
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
      <DialogPrimitive.Content
         ref={ref}
         onPointerDownOutside={(e) => e.preventDefault()}
         className={cn(
            'fixed top-auto left-auto right-0 bottom-0 translate-x-0 translate-y-0 z-50 grid w-full gap-4 bg-white shadow-lg duration-200 rounded-t-2xl rounded-bl-none rounded-br-none max-h-[85vh] overflow-y-auto',
            'md:left-[50%] md:top-[50%] md:bottom-auto md:right-auto md:translate-x-[-50%] md:translate-y-[-50%] md:max-w-4xl md:rounded-2xl pb-12 md:pb-0',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=closed]:slide-out-to-top-[48%] md:data-[state=open]:slide-in-from-left-1/2 md:data-[state=open]:slide-in-from-top-[48%]',
            'dark:border-neutral-800 dark:bg-neutral-950',
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
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
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
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
   <div className="flex justify-between items-center bg-dark-background-paper text-white py-4 px-6 -mx-6">
      <DialogPrimitive.Title
         ref={ref}
         className={cn(
            'text-xl font-semibold leading-none tracking-tight',
            className
         )}
         {...props}
      />
      <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400 flex items-center justify-center">
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
      className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
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
