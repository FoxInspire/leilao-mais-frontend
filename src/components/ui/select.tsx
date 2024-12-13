'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import * as React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useElementSize } from '@/hooks/useElementSize'
import { cn } from '@/lib/utils'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Value>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> & {
      variant?: 'default' | 'input'
   }
>(({ className, variant = 'default', ...props }, ref) => (
   <SelectPrimitive.Value
      ref={ref}
      className={cn(
         variant === 'input' && 'text-sm text-neutral-950 dark:text-neutral-50',
         className
      )}
      {...props}
   />
))
SelectValue.displayName = SelectPrimitive.Value.displayName

const SelectTrigger = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
      hideIcon?: boolean
   }
>(({ className, children, hideIcon, ...props }, ref) => (
   <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
         'flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 dark:bg-transparent',
         className
      )}
      {...props}
   >
      {children}
      {!hideIcon && (
         <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
         </SelectPrimitive.Icon>
      )}
   </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
         'flex cursor-default items-center justify-center py-1',
         className
      )}
      {...props}
   >
      <ChevronUp className="h-4 w-4" />
   </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
         'flex cursor-default items-center justify-center py-1',
         className
      )}
      {...props}
   >
      <ChevronDown className="h-4 w-4" />
   </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
   SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
   <SelectPrimitive.Portal>
      <SelectPrimitive.Content
         ref={ref}
         className={cn(
            'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:text-neutral-50 dark:bg-dark-background-default dark:shadow-2xl dark:border-dark-secondary-contrast/5',
            position === 'popper' &&
               'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            className
         )}
         position={position}
         {...props}
      >
         <SelectScrollUpButton />
         <SelectPrimitive.Viewport
            className={cn(
               'p-1',
               position === 'popper' &&
                  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
            )}
         >
            {children}
         </SelectPrimitive.Viewport>
         <SelectScrollDownButton />
      </SelectPrimitive.Content>
   </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Label>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.Label
      ref={ref}
      className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
      {...props}
   />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
   <SelectPrimitive.Item
      ref={ref}
      className={cn(
         'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-white/5 dark:focus:text-neutral-50',
         className
      )}
      {...props}
   >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <SelectPrimitive.ItemIndicator>
            <Check className="h-4 w-4" />
         </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
   </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Separator>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.Separator
      ref={ref}
      className={cn(
         '-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800',
         className
      )}
      {...props}
   />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export type SelectInputValue = {
   id: string
   label: string
   value: string
}

export type SelectInputGroup = {
   label: string
   options: SelectInputValue[]
}

const SelectInput = React.forwardRef<
   React.ElementRef<typeof Input>,
   React.ComponentPropsWithoutRef<typeof Input> & {
      menu_label?: string
      options: SelectInputValue[]
      item?: 'default' | 'checkbox'
      onValueChange?: (value: SelectInputValue | SelectInputValue[]) => void
   }
>(
   (
      {
         className,
         menu_label,
         options,
         item = 'default',
         onValueChange,
         ...props
      },
      ref
   ) => {
      const { ref: elementRef, width } = useElementSize<HTMLInputElement>()

      const [selectedValues, setSelectedValues] = React.useState<
         SelectInputValue[]
      >([])

      const handleCheckboxChange = (
         option: SelectInputValue,
         checked: boolean
      ) => {
         const newValues = checked
            ? [...selectedValues, option]
            : selectedValues.filter((v) => v.id !== option.id)

         setSelectedValues(newValues)
         onValueChange?.(newValues)
      }

      const handleSelectChange = (selectedValue: string) => {
         const option = options.find((opt) => opt.value === selectedValue)
         if (option) {
            setSelectedValues([option])
            onValueChange?.(option)
         }
      }

      const displayValue = selectedValues?.map((v) => v?.label)?.join(', ')

      if (item === 'checkbox') {
         return (
            <div className="relative w-full">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <div ref={elementRef} className="w-full">
                        <Input
                           readOnly
                           ref={ref}
                           labelStatus="on"
                           className={cn(className)}
                           value={displayValue}
                           placeholder={props.placeholder}
                           {...props}
                        />
                     </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                     align="end"
                     className="px-1.5 py-2"
                     style={{ width: `${width}px` }}
                  >
                     {menu_label && (
                        <React.Fragment>
                           <DropdownMenuLabel className="text-sm">
                              {menu_label}
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator />
                        </React.Fragment>
                     )}
                     {options.map((option) => (
                        <DropdownMenuItem
                           key={option.id}
                           onSelect={(e) => e.preventDefault()}
                        >
                           <Checkbox
                              size="md"
                              label={option.label}
                              checked={selectedValues.some(
                                 (v) => v.id === option.id
                              )}
                              onCheckedChange={(checked) =>
                                 handleCheckboxChange(
                                    option,
                                    checked as boolean
                                 )
                              }
                           />
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
               <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-action-active dark:text-white">
                  arrow_drop_down
               </span>
            </div>
         )
      }

      return (
         <div className="relative w-full">
            <Select onValueChange={handleSelectChange}>
               <SelectTrigger
                  hideIcon
                  className="border-none w-full px-0 py-0 m-0"
               >
                  <div ref={elementRef} className="w-full">
                     <Input
                        readOnly
                        ref={ref}
                        labelStatus="on"
                        className={cn(className)}
                        value={selectedValues[0]?.label}
                        placeholder={props.placeholder}
                        {...props}
                     />
                  </div>
               </SelectTrigger>
               <SelectContent style={{ width: `${width}px` }} sideOffset={4}>
                  {menu_label && <SelectLabel>{menu_label}</SelectLabel>}
                  {options.length === 0 ? (
                     <div className="py-2 px-2 text-sm text-neutral-500 text-center">
                        Não há opções disponíveis
                     </div>
                  ) : (
                     options.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                           {option.label}
                        </SelectItem>
                     ))
                  )}
               </SelectContent>
            </Select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-action-active dark:text-white">
               arrow_drop_down
            </span>
         </div>
      )
   }
)
SelectInput.displayName = 'SelectInput'

export {
   Select,
   SelectContent,
   SelectGroup,
   SelectInput,
   SelectItem,
   SelectLabel,
   SelectScrollDownButton,
   SelectScrollUpButton,
   SelectSeparator,
   SelectTrigger,
   SelectValue
}
