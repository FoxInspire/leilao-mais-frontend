'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/src/lib/utils'
import { Row } from '@tanstack/react-table'

interface OperationsMonitorDataTableRowActionsProps<TData> {
   row?: Row<TData>
   onSelect: (value: string) => void
}

export function OperationsMonitorDataTableRowActions<TData>({
   onSelect
}: OperationsMonitorDataTableRowActionsProps<TData>) {
   const [dialog, setDialog] = React.useState({
      schedule_transaction: false,
      cancel_schedule: false,
      restart_transactions: false
   })
   const menuItems = [
      {
         icon: 'schedule',
         label: 'Agendar transação',
         value: 'schedule-transaction',
         filled: false,
         onClick: () => {
            setDialog({
               ...dialog,
               schedule_transaction: true
            })
         }
      },
      {
         icon: 'cancel',
         label: 'Cancelar agendamento',
         value: 'cancel-schedule',
         filled: false,
         onClick: () => {
            setDialog({
               ...dialog,
               cancel_schedule: true
            })
         }
      },
      {
         icon: 'sync',
         label: 'Reiniciar transações',
         value: 'restart-transactions',
         filled: false,
         onClick: () => {
            setDialog({
               ...dialog,
               restart_transactions: true
            })
         }
      }
   ]
   return (
      <React.Fragment>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="icon"
                  size="icon"
                  className="data-[state=open]:bg-muted flex"
               >
                  <span className="material-symbols-outlined text-text-secondary dark:text-dark-text-secondary">
                     more_vert
                  </span>
                  <span className="sr-only">Open menu</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               {menuItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                     <DropdownMenuItem
                        className="font-medium"
                        onClick={() => {
                           onSelect(item.value)
                           item?.onClick()
                        }}
                     >
                        <span
                           className={cn(
                              'material-symbols-outlined symbol-md text-text-secondary dark:text-dark-text-secondary',
                              item.filled && 'filled'
                           )}
                        >
                           {item.icon}
                        </span>
                        {item.label}
                     </DropdownMenuItem>
                  </React.Fragment>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
         <Dialog
            open={
               dialog.schedule_transaction ||
               dialog.cancel_schedule ||
               dialog.restart_transactions
            }
         >
            <DialogContent className={cn('md:max-w-md')}>
               {dialog.schedule_transaction && (
                  <ScheduleTransactionAction
                     onClose={() => {
                        setDialog({
                           ...dialog,
                           schedule_transaction: false
                        })
                     }}
                     onSchedule={() => {}}
                  />
               )}
               {dialog.cancel_schedule && (
                  <CancelScheduleTransactionAction
                     onClose={() => {
                        setDialog({
                           ...dialog,
                           cancel_schedule: false
                        })
                     }}
                     onCancel={() => {}}
                  />
               )}
               {dialog.restart_transactions && (
                  <RestartTransactionsAction
                     onClose={() => {
                        setDialog({
                           ...dialog,
                           restart_transactions: false
                        })
                     }}
                     onRestart={() => {}}
                  />
               )}
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}

interface ScheduleTransactionActionProps {
   onClose: () => void
   onSchedule: () => void
}

const ScheduleTransactionAction: React.FC<ScheduleTransactionActionProps> = ({
   onClose,
   onSchedule
}: ScheduleTransactionActionProps) => {
   return (
      <React.Fragment>
         <DialogHeader>
            <DialogTitle onClose={onClose}>Agendar transação</DialogTitle>
         </DialogHeader>
         <div className="space-y-4 py-4 pb-6">
            <div className="flex flex-1 items-center justify-center">
               <span className="material-symbols-outlined symbol-xl text-error-default">
                  warning
               </span>
            </div>
            <div className="space-y-2">
               <p className="text-center font-montserrat text-lg font-medium">
                  Agendar transação para o(s) lote(s) selecionado(s)?
               </p>
            </div>
         </div>
         <div className="mb-6 mt-2 grid gap-2 md:grid-cols-2">
            <div className="order-2 md:order-1">
               <Button
                  variant="destructive"
                  className="w-full"
                  onClick={onClose}
               >
                  Cancelar
               </Button>
            </div>
            <div className="order-1 md:order-2">
               <Button
                  variant="default"
                  className="w-full"
                  onClick={onSchedule}
               >
                  Agendar
               </Button>
            </div>
         </div>
      </React.Fragment>
   )
}

interface CancelScheduleTransactionActionProps {
   onClose: () => void
   onCancel: () => void
}

const CancelScheduleTransactionAction: React.FC<
   CancelScheduleTransactionActionProps
> = ({ onClose, onCancel }: CancelScheduleTransactionActionProps) => {
   return (
      <React.Fragment>
         <DialogHeader>
            <DialogTitle onClose={onClose}>Cancelar agendamento</DialogTitle>
         </DialogHeader>
         <div className="space-y-4 py-4 pb-6">
            <div className="flex flex-1 items-center justify-center">
               <span className="material-symbols-outlined symbol-xl text-error-default">
                  warning
               </span>
            </div>
            <div className="space-y-2">
               <p className="text-center font-montserrat text-lg font-medium">
                  Interromper a execução da transação atual?
               </p>
            </div>
         </div>
         <div className="mb-6 mt-2 grid gap-2 md:grid-cols-2">
            <div className="order-2 md:order-1">
               <Button
                  variant="destructive"
                  className="w-full"
                  onClick={onClose}
               >
                  Cancelar
               </Button>
            </div>
            <div className="order-1 md:order-2">
               <Button variant="default" className="w-full" onClick={onCancel}>
                  Interromper
               </Button>
            </div>
         </div>
      </React.Fragment>
   )
}

interface RestartTransactionsActionProps {
   onClose: () => void
   onRestart: () => void
}

const RestartTransactionsAction: React.FC<RestartTransactionsActionProps> = ({
   onClose,
   onRestart
}: RestartTransactionsActionProps) => {
   return (
      <React.Fragment>
         <DialogHeader>
            <DialogTitle onClose={onClose}>Reiniciar</DialogTitle>
         </DialogHeader>
         <div className="space-y-4 py-4 pb-6">
            <div className="flex flex-1 items-center justify-center">
               <span className="material-symbols-outlined symbol-xl text-error-default">
                  warning
               </span>
            </div>
            <div className="space-y-2">
               <p className="text-center font-montserrat text-lg font-medium">
                  Reiniciar a execução das transações?
               </p>
            </div>
         </div>
         <div className="mb-6 mt-2 grid gap-2 md:grid-cols-2">
            <div className="order-2 md:order-1">
               <Button
                  variant="destructive"
                  className="w-full"
                  onClick={onClose}
               >
                  Cancelar
               </Button>
            </div>
            <div className="order-1 md:order-2">
               <Button variant="default" className="w-full" onClick={onRestart}>
                  Reiniciar
               </Button>
            </div>
         </div>
      </React.Fragment>
   )
}
