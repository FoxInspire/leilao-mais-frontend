'use client'

import * as React from 'react'

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
import { auctionLotStatusOptions } from '@/src/utils/auction-lot-status'
import { AuctionEntity } from '@/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'

interface OperationLotStatusProps {
   row: Row<AuctionEntity>
}

export const OperationLotStatus: React.FC<OperationLotStatusProps> = ({
   row
}: OperationLotStatusProps) => {
   const [dialog, setDialog] = React.useState(false)
   const [tempStatus, setTempStatus] = React.useState<string | null>(null)
   const [currentStatus, setCurrentStatus] = React.useState(
      row.original.AuctionLot?.[0]?.Vehicle?.status || 'PENDING'
   )

   const handleValueChange = (value: string) => {
      setTempStatus(value)
      setDialog(true)
   }

   const handleConfirm = () => {
      if (tempStatus) {
         setCurrentStatus(tempStatus)
      }
      setTempStatus(null)
      setDialog(false)
   }

   const handleCancel = () => {
      setTempStatus(null)
      setDialog(false)
   }

   return (
      <React.Fragment>
         <div>
            <Select onValueChange={handleValueChange} value={currentStatus}>
               <SelectTrigger className="flex w-fit items-center gap-2 border-none bg-transparent font-nunito text-sm font-bold uppercase text-primary-default dark:text-dark-primary-default">
                  <SelectValue
                     placeholder={
                        auctionLotStatusOptions.find(
                           (option) => option.value === currentStatus
                        )?.label || ''
                     }
                  />
               </SelectTrigger>
               <SelectContent>
                  {auctionLotStatusOptions.map((option) => (
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
                     <div className="flex flex-1 items-center justify-center">
                        <span className="material-symbols-outlined symbol-xl text-error-default">
                           warning
                        </span>
                     </div>
                     <div className="space-y-2">
                        <p className="text-center font-montserrat text-lg font-medium">
                           Alterar o status do leilão
                        </p>
                        <p className="text-center font-montserrat text-sm">
                           Esta ação irá notificar o Pátio/DETRAN. Deseja
                           continuar?
                        </p>
                     </div>
                  </div>
                  <div className="mb-6 mt-2 grid gap-2 md:grid-cols-2">
                     <div className="order-2 md:order-1">
                        <Button
                           variant="destructive"
                           className="w-full"
                           onClick={handleCancel}
                        >
                           Cancelar
                        </Button>
                     </div>
                     <div className="order-1 md:order-2">
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
