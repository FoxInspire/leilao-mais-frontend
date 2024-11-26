'use client'

import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { format } from 'date-fns'

const inputDatePickerVariants = cva(
   [
      'peer block w-full',
      'text-black dark:text-white',
      'bg-transparent',
      'outline-2 outline-transparent',
      'border border-[#1212127f] dark:border-neutral-500 rounded-[4px]',
      'transition-colors duration-200 ease-linear',

      'focus-visible:border-2',
      'focus-visible:border-primary-default',
      'focus-visible:ring-0',
      'focus-visible:outline-2',
      'focus-visible:outline-offset-0',
      'focus-visible:outline-primary-default',

      'dark:focus-visible:border-dark-primary-default',
      'dark:focus-visible:outline-dark-primary-default',
      'dark:focus-visible:outline-2',
      'dark:focus-visible:border-2',
      'dark:focus-visible:outline-offset-0',

      'placeholder:opacity-0',
      'placeholder:transition-opacity placeholder:duration-200',
      'focus:placeholder:opacity-100',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'disabled:bg-slate-50 disabled:border-slate-200 disabled:shadow-none',
      'read-only:bg-slate-50 read-only:border-slate-200',
      'invalid:border-red-500 invalid:text-red-600',
      'focus:invalid:border-red-500 focus:invalid:ring-red-500',
      'read-only:cursor-default read-only:bg-transparent read-only:border read-only:border-[#1212127f]'
   ],
   {
      variants: {
         error: {
            true: 'border-red-500 dark:border-red-500 text-red-600 dark:text-red-600'
         },
         size: {
            xs: 'min-h-[32px] px-[8px] py-[4px] text-sm leading-5',
            sm: 'min-h-[40px] px-[10px] py-[6px] text-sm leading-5',
            md: 'min-h-[48px] px-[12px] py-[8px] text-sm leading-6',
            lg: 'min-h-[56px] px-[14px] py-[10px] text-base leading-6',
            default: 'min-h-[56px] px-[14px] py-[16.5px] text-base leading-6'
         }
      },
      defaultVariants: {
         size: 'default'
      }
   }
)

const labelDatePickerVariants = cva(
   [
      'absolute left-[11px] top-[50%]',
      'pointer-events-none',
      '-translate-y-[50%]',
      'mb-0 max-w-[90%]',
      'origin-[0_0]',

      'truncate leading-6',
      'text-neutral-500',
      'dark:text-neutral-400',

      'bg-white dark:bg-dark-background-paper px-1',
      'peer-disabled:bg-transparent peer-disabled:text-neutral-500',

      'peer-focus:text-primary-default',
      'peer-focus:top-1',
      'peer-focus:scale-75',
      'peer-focus:dark:text-dark-primary-default',

      'peer-[&:not(:placeholder-shown)]:top-1',
      'peer-[&:not(:placeholder-shown)]:scale-75',

      'peer-data-[twe-input-state-active]:top-1',
      'peer-data-[twe-input-state-active]:scale-75',

      'placeholder-opacity-0',

      'transition-all duration-200 ease-out',

      'peer-[&[data-autofilled="true"]]:top-1',
      'peer-[&[data-autofilled="true"]]:scale-75'
   ],
   {
      variants: {
         error: {
            true: 'text-red-500'
         }
      }
   }
)

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
   ({ className, label, error, size = 'md', onSelected, ...props }, ref) => {
      const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()
      return (
         <React.Fragment>
            <Popover>
               <PopoverTrigger asChild>
                  <div
                     className="relative flex flex-col self-stretch p-0 isolate items-center justify-center"
                     data-twe-input-wrapper-init
                  >
                     <input
                        readOnly
                        type="text"
                        data-value={props.value}
                        data-date={selectedDate}
                        data-type="date"
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoSave="off"
                        value={
                           selectedDate && !isNaN(selectedDate.getTime())
                              ? format(selectedDate, 'dd/MM/yyyy')
                              : ''
                        }
                        className={cn(
                           inputDatePickerVariants({ error: !!error, size }),
                           className
                        )}
                        aria-invalid={error ? 'true' : undefined}
                        ref={ref}
                        placeholder={label}
                        onAnimationStart={(e) => {
                           if (e.animationName === 'onAutoFillStart') {
                              ;(e.target as HTMLInputElement).setAttribute(
                                 'data-autofilled',
                                 'true'
                              )
                           }
                        }}
                        {...props}
                     />
                     <span className="material-symbols-outlined absolute right-2.5 z-10 text-action-active">
                        event
                     </span>
                     {label && (
                        <label
                           htmlFor={props.id}
                           className={cn(
                              labelDatePickerVariants({ error: !!error })
                           )}
                        >
                           {label}
                        </label>
                     )}
                  </div>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0">
                  <Calendar
                     initialFocus
                     mode="single"
                     selected={selectedDate || undefined}
                     onSelect={(e) => {
                        if (e !== undefined) {
                           onSelected && onSelected(e as unknown as Date)
                           setSelectedDate(e)
                        }
                     }}
                  />
               </PopoverContent>
            </Popover>
            {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
         </React.Fragment>
      )
   }
)

export interface DatePickerProps
   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
   label?: string
   error?: string
   size?: 'default' | 'xs' | 'sm' | 'md' | 'lg'
   onSelected?: (date: Date) => void
}

DatePicker.displayName = 'DatePicker'

export { DatePicker }
