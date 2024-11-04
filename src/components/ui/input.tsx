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
                  'peer block w-full min-h-[56px]',

                  'px-[14px] py-[16.5px]',

                  'text-base leading-6 tracking-[0.15px]',
                  'text-black',
                  'dark:text-white',

                  'bg-transparent',

                  'border border-[#1212127f] rounded-[4px]',
                  'outline-2 outline-transparent',

                  'focus:border-primary-default focus:outline-primary-default',
                  'dark:focus:border-primary-default dark:focus:outline-primary-default',
                  'focus:text-primary',

                  'placeholder:opacity-0',
                  'placeholder:transition-opacity placeholder:duration-200',
                  'focus:placeholder:opacity-100',
                  'dark:placeholder:text-neutral-300',

                  'disabled:cursor-not-allowed disabled:opacity-50',

                  'transition-colors duration-200 ease-linear',

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
                     'absolute left-[11px] top-[50%]',
                     'pointer-events-none',
                     '-translate-y-[50%]',
                     'mb-0 max-w-[90%]',
                     'origin-[0_0]',

                     'truncate leading-6',
                     'text-neutral-500',
                     'dark:text-neutral-400',

                     'bg-white px-1',

                     'peer-focus:top-1',
                     'peer-focus:scale-75',
                     'peer-focus:text-primary-default',
                     'dark:peer-focus:text-primary-default',

                     'peer-[&:not(:placeholder-shown)]:top-1',
                     'peer-[&:not(:placeholder-shown)]:scale-75',

                     'peer-data-[twe-input-state-active]:top-1',
                     'peer-data-[twe-input-state-active]:scale-75',

                     'placeholder-opacity-0',

                     'transition-all duration-200 ease-out'
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
