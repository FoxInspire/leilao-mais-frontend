'use client'

import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import {
   Input,
   inputVariants as inputDatePickerVariants,
   InputProps,
   labelVariants as labelDatePickerVariants
} from '@/components/ui/input'
import {
   Popover,
   PopoverContent,
   PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format, setHours, setMinutes } from 'date-fns'

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
   (
      {
         className,
         label,
         error,
         size = 'md',
         onSelected,
         showTime = false,
         labelStatus = 'on',
         ...props
      },
      ref
   ) => {
      const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()
      const [timeValue, setTimeValue] = React.useState('12:00')

      const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (!showTime) return

         const time = e.target.value
         setTimeValue(time)

         if (!selectedDate) {
            props.onChange?.({
               target: { value: time }
            } as React.ChangeEvent<HTMLInputElement>)
            return
         }

         const [hours, minutes] = time
            .split(':')
            .map((str) => parseInt(str, 10))
         const newSelectedDate = setHours(
            setMinutes(selectedDate, minutes),
            hours
         )
         setSelectedDate(newSelectedDate)

         if (onSelected) {
            onSelected(newSelectedDate)
         }

         props.onChange?.({
            target: { value: format(newSelectedDate, 'dd/MM/yyyy HH:mm') }
         } as React.ChangeEvent<HTMLInputElement>)
      }

      const handleDaySelect = (date: Date | undefined) => {
         if (!date) {
            setSelectedDate(undefined)
            return
         }

         let newDate = date
         if (showTime) {
            const [hours, minutes] = timeValue
               .split(':')
               .map((str) => parseInt(str, 10))
            newDate = new Date(
               date.getFullYear(),
               date.getMonth(),
               date.getDate(),
               hours,
               minutes
            )
         } else {
            newDate = new Date(
               date.getFullYear(),
               date.getMonth(),
               date.getDate(),
               0,
               0
            )
         }

         setSelectedDate(newDate)
         if (onSelected) {
            onSelected(newDate)
         }

         props.onChange?.({
            target: {
               value: format(
                  newDate,
                  showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'
               )
            }
         } as React.ChangeEvent<HTMLInputElement>)
      }

      const hasSelectedDate =
         selectedDate && !isNaN(selectedDate.getTime())
            ? format(selectedDate, showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy')
            : ''

      return (
         <React.Fragment>
            <Popover>
               <PopoverTrigger asChild>
                  <div className="relative flex flex-col self-stretch p-0 isolate items-center justify-center">
                     <Input
                        readOnly
                        type="text"
                        data-value={props.value}
                        data-date={selectedDate}
                        data-type="date"
                        autoComplete="new-password"
                        autoCorrect="off"
                        autoSave="off"
                        labelStatus={labelStatus}
                        value={hasSelectedDate}
                        className={cn(
                           inputDatePickerVariants({
                              error: !!error,
                              size,
                              labelStatus
                           }),
                           className
                        )}
                        aria-invalid={error ? 'true' : undefined}
                        ref={ref}
                        placeholder={label}
                        {...props}
                     />
                     <span className="material-symbols-outlined absolute right-2.5 z-10 text-action-active dark:text-dark-text-secondary">
                        event
                     </span>
                     {label && (
                        <label
                           htmlFor={props.id}
                           className={cn(
                              labelDatePickerVariants({ labelStatus })
                           )}
                        >
                           {label}
                        </label>
                     )}
                  </div>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0">
                  {showTime && (
                     <div className="p-3 border-b">
                        <input
                           type="time"
                           value={timeValue}
                           onChange={handleTimeChange}
                           className="w-full px-2 py-1 border rounded"
                        />
                     </div>
                  )}
                  <Calendar
                     initialFocus
                     mode="single"
                     selected={selectedDate}
                     onSelect={handleDaySelect}
                  />
               </PopoverContent>
            </Popover>
            {error && (
               <span className="mt-1 text-sm text-red-500">{error}</span>
            )}
         </React.Fragment>
      )
   }
)

export interface DatePickerProps extends InputProps {
   label?: string
   error?: string
   size?: 'default' | 'xs' | 'sm' | 'md' | 'lg'
   onSelected?: (date: Date) => void
   showTime?: boolean
}

DatePicker.displayName = 'DatePicker'

export { DatePicker }
