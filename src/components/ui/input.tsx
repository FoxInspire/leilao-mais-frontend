import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type, label, ...props }, ref) => {
      return (
         <div
            className="relative flex flex-col items-start self-stretch p-0"
            data-twe-input-wrapper-init
         >
            <input
               type={type}
               className={cn(
                  'peer block min-h-[56px] w-full bg-transparent px-[14px] py-[16.5px] leading-6 text-neutral-500 transition-colors duration-200 ease-linear placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-100 focus:text-primary disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary',
                  'text-base leading-6 tracking-[0.15px]',
                  'border rounded-[4px]',
                  'border-[#1212127f]',
                  'focus:border-primary-default dark:focus:border-primary-default',
                  className
               )}
               ref={ref}
               placeholder={label}
               {...props}
            />
            {label && (
               <label
                  htmlFor={props.id}
                  className={cn(
                     'pointer-events-none absolute left-[11px] top-[50%] -translate-y-[50%] mb-0 max-w-[90%] origin-[0_0] truncate leading-6 text-neutral-500 transition-all duration-200 ease-out',

                     'peer-focus:top-1 peer-focus:scale-75 peer-focus:text-primary-default',

                     'peer-data-[twe-input-state-active]:top-1 peer-data-[twe-input-state-active]:scale-75 peer-focus:text-primary-default',

                     'dark:text-neutral-400 dark:peer-focus:text-primary-default',
                     'placeholder-opacity-0',

                     'bg-white px-1'
                  )}
               >
                  {label}
               </label>
            )}
         </div>
      )
   }
)
Input.displayName = 'Input'

export { Input }
