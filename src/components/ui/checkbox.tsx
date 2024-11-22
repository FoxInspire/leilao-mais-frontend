'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
   React.ElementRef<typeof CheckboxPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
      label?: string
      size?: 'sm' | 'md' | 'lg'
   }
>(({ className, label, id, size = 'md', ...props }, ref) => {
   const sizeStyles = {
      sm: {
         checkbox: 'h-4 w-4',
         indicator: 'w-3 h-3 !text-[12px]',
         label: 'text-xs'
      },
      md: {
         checkbox: 'h-5 w-5',
         indicator: 'w-4 h-4 !text-[16px]',
         label: 'text-sm'
      },
      lg: {
         checkbox: 'h-6 w-6',
         indicator: 'w-5 h-5 !text-[20px]',
         label: 'text-base'
      }
   }

   return label ? (
      <div className="flex items-center gap-2">
         <CheckboxPrimitive.Root
            ref={ref}
            id={id}
            className={cn(
               'peer shrink-0 gap-0 flex rounded-sm border-2 border-text-secondary ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-default data-[state=checked]:bg-primary-default data-[state=checked]:text-common-white dark:border-dark-text-secondary dark:ring-offset-dark-background-default dark:focus-visible:ring-neutral-300 dark:data-[state=checked]:border-dark-primary-default dark:data-[state=checked]:bg-dark-primary-default dark:data-[state=checked]:text-dark-text-primary',
               sizeStyles[size].checkbox,
               className
            )}
            {...props}
         >
            <CheckboxPrimitive.Indicator
               className={cn(
                  'flex items-center gap-0 flex-grow justify-center p-0 m-0',
                  sizeStyles[size].indicator
               )}
            >
               <span className="material-symbols-outlined text-white !text-[16px]">
                  check
               </span>
            </CheckboxPrimitive.Indicator>
         </CheckboxPrimitive.Root>
         <label
            htmlFor={id}
            className={cn(
               'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-dark-text-primary',
               sizeStyles[size].label
            )}
         >
            {label}
         </label>
      </div>
   ) : (
      <CheckboxPrimitive.Root
         ref={ref}
         className={cn(
            'peer h-4 w-4 shrink-0 gap-0 flex flex-grow rounded-sm border border-text-secondary ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-default data-[state=checked]:bg-primary-default data-[state=checked]:text-common-white dark:border-dark-text-secondary dark:ring-offset-dark-background-default dark:focus-visible:ring-neutral-300 dark:data-[state=checked]:border-dark-primary-default dark:data-[state=checked]:bg-dark-primary-default dark:data-[state=checked]:text-dark-text-primary',
            className
         )}
         {...props}
      >
         <CheckboxPrimitive.Indicator
            className={cn(
               'flex items-center gap-0 flex-grow justify-center w-3 h-4 p-0 m-0'
            )}
         >
            <span className="material-symbols-outlined text-white !text-[16px]">
               check
            </span>
         </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
   )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
