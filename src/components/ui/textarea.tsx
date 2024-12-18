import * as React from 'react'

import { cn } from '@/lib/utils'
import { labelVariants, inputVariants as textareaVariants } from './input'

interface TextareaProps
   extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
   label?: string
   error?: string
   labelStatus?: 'on' | 'off' | 'inherit'
   size?: 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'textarea'
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
   (
      {
         className,
         label,
         error,
         size = 'textarea',
         labelStatus = 'on',
         ...props
      },
      ref
   ) => {
      return (
         <React.Fragment>
            <div
               className="relative isolate flex flex-col items-center justify-center self-stretch p-0"
               data-twe-input-wrapper-init
            >
               <textarea
                  className={cn(
                     'min-h-[200px]',
                     textareaVariants({ size, labelStatus }),
                     className
                  )}
                  ref={ref}
                  placeholder={label}
                  {...props}
               />
               {label && (
                  <label
                     htmlFor={props.id}
                     className={cn(labelVariants({ labelStatus }))}
                  >
                     {label}
                  </label>
               )}
            </div>
            {error && (
               <span className="mt-1 text-sm text-red-500">{error}</span>
            )}
         </React.Fragment>
      )
   }
)

Textarea.displayName = 'Textarea'

export { Textarea }
