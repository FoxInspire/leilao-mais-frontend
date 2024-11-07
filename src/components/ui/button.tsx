import * as React from 'react'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
   'flex flex-col justify-center items-center self-stretch px-[22px] py-2 rounded-[4px] uppercase text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 font-medium',
   {
      variants: {
         variant: {
            default:
               'bg-primary-default text-primary-contrast hover:bg-primary-light shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12),0px_0px_2px_0px_rgba(0,0,0,0.14),0px_0px_1px_-2px_rgba(0,0,0,0.20)] dark:bg-primary-contrast dark:text-primary-default dark:hover:bg-primary-contrast/90',
            destructive:
               'bg-error-default text-error-contrast hover:bg-error-light dark:bg-error-contrast dark:text-error-default dark:hover:bg-error-contrast/90',
            outline:
               'border border-primary-default bg-transparent text-primary-default dark:border-primary-default dark:bg-transparent hover:bg-primary-default/10 dark:hover:bg-primary-default/10',
            secondary:
               'bg-secondary-default text-white hover:bg-secondary-light dark:bg-secondary-contrast dark:text-secondary-default dark:hover:bg-secondary-contrast/90',
            ghost: 'bg-transparent text-primary-default hover:bg-primary-default/10 dark:hover:bg-primary-default/10',
            link: 'text-primary-default underline-offset-4 hover:underline dark:text-primary-default'
         },
         size: {
            default: 'h-12 px-4 py-2',
            sm: 'h-10 rounded-md px-3',
            lg: 'h-14 rounded-md px-8',
            icon: 'h-10 w-10'
         }
      },
      defaultVariants: {
         variant: 'default',
         size: 'default'
      }
   }
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   (
      { className, variant, size, asChild = false, loading = false, ...props },
      ref
   ) => {
      const Comp = asChild ? Slot : 'button'

      return (
         <Comp
            className={cn(
               buttonVariants({ variant, size, className }),
               loading && 'cursor-wait'
            )}
            disabled={loading || props.disabled}
            ref={ref}
            {...props}
         >
            <div className="relative">
               <span className={cn(loading && 'invisible')}>{props.children}</span>
               {loading && (
                  <span className="loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animation-spin" />
               )}
            </div>
         </Comp>
      )
   }
)

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean
   loading?: boolean
}

Button.displayName = 'Button'

export { Button, buttonVariants }
