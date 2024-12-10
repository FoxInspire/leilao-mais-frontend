'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const RadioGroup = React.forwardRef<
   React.ElementRef<typeof RadioGroupPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
   return (
      <RadioGroupPrimitive.Root
         className={cn('grid gap-2', className)}
         {...props}
         ref={ref}
      />
   )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
   React.ElementRef<typeof RadioGroupPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
   return (
      <RadioGroupPrimitive.Item
         ref={ref}
         className={cn(
            'aspect-square h-5 w-5 rounded-full border-[2px] border-primary-default text-primary-default ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-default focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-primary-default dark:text-dark-primary-default dark:ring-dark-primary-default dark:focus-visible:ring-dark-primary-default data-[state=unchecked]:border-text-secondary',
            className
         )}
         {...props}
      >
         <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Circle className="h-3 w-3 fill-current text-current" />
         </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
   )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
