'use client'

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select'
import { Button } from '@/src/components/ui/button'
import { AuctionEntity } from '@/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'

import React from 'react'

interface StatusCellProps {
   row: Row<AuctionEntity>
}

export const StatusCell: React.FC<StatusCellProps> = ({
   row
}: StatusCellProps) => {
   const [dialog, setDialog] = React.useState(false)
   const [tempStatus, setTempStatus] = React.useState<string | null>(null)
   const [currentStatus, setCurrentStatus] = React.useState(
      row.original.AuctionLot?.[0]?.status || 'PENDING'
   )

   const handleValueChange = (value: string) => {
      setTempStatus(value)
      setDialog(true)
   }

   const handleConfirm = () => {
      if (tempStatus) {
         setCurrentStatus(tempStatus)
         console.log('Novo status:', tempStatus)
      }
      setTempStatus(null)
      setDialog(false)
   }

   const handleCancel = () => {
      setTempStatus(null)
      setDialog(false)
   }

   const statusOptions = [
      { value: 'assembly', label: 'Montagem' },
      { value: 'organs_evaluation', label: 'Avaliação órgão' },
      { value: 'payment_confirmation', label: 'Confirmação de pagamento' }
   ]

   return (
      <React.Fragment>
         <div>
            <Select onValueChange={handleValueChange} value={currentStatus}>
               <SelectTrigger className="flex items-center gap-2 font-bold font-nunito text-primary-default dark:text-dark-primary-default text-sm uppercase border-none bg-transparent">
                  <SelectValue
                     placeholder={
                        statusOptions.find(
                           (option) => option.value === currentStatus
                        )?.label || ''
                     }
                  />
               </SelectTrigger>
               <SelectContent>
                  {statusOptions.map((option) => (
                     <SelectItem key={option.value} value={option.value}>
                        {option.label}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
            <Dialog open={dialog} onOpenChange={setDialog}>
               <DialogContent className="md:max-w-lg">
                  <DialogHeader>
                     <DialogTitle>Alterar status</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4 pb-6">
                     <div className="flex flex-1 justify-center items-center">
                        <span className="material-symbols-outlined text-error-default symbol-xl">
                           warning
                        </span>
                     </div>
                     <div className="space-y-2">
                        <p className="text-lg text-center font-montserrat font-medium">
                           Alterar o status do leilão
                        </p>
                        <p className="text-center text-sm font-montserrat">
                           Esta ação irá notificar o Pátio/DETRAN. Deseja
                           continuar?
                        </p>
                     </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 mb-6 mt-2">
                     <div className="md:order-1 order-2">
                        <Button
                           variant="destructive"
                           className="w-full"
                           onClick={handleCancel}
                        >
                           Cancelar
                        </Button>
                     </div>
                     <div className="md:order-2 order-1">
                        <Button
                           variant="default"
                           className="w-full"
                           onClick={handleConfirm}
                        >
                           Confirmar
                        </Button>
                     </div>
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      </React.Fragment>
   )
}
