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
import { AuctionEntity } from '@/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'

interface LotStatusProps {
   row: Row<AuctionEntity>
}

export const LotStatus: React.FC<LotStatusProps> = ({
   row
}: LotStatusProps) => {
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

   const statusOptions = [
      { value: 'unpaid_auction', label: 'Arrematação não paga' },
      { value: 'preserved', label: 'Conservado' },
      { value: 'fix_report', label: 'Corrigir laudo' },
      { value: 'police_station', label: 'Delegacia' },
      { value: 'disassociated_payment', label: 'Desassociado boleto' },
      { value: 'under_analysis', label: 'Em análise' },
      { value: 'canceled_grv', label: 'GRV cancelada' },
      { value: 'inspection_identification', label: 'Ident na vistoria' },
      { value: 'unanalyzed_report', label: 'Laudo não analisado' },
      { value: 'auctioned_preserved', label: 'Leiloado - conservado' },
      {
         value: 'auctioned_usable_scrap',
         label: 'Leiloado - sucata aproveitavel'
      },
      {
         value: 'auctioned_usable_scrap_unusable_engine',
         label: 'Leiloado - sucata aproveitavel com motor inservível'
      },
      {
         value: 'auctioned_unusable_scrap_identified',
         label: 'Leiloado - sucata inservível identificada'
      },
      {
         value: 'auctioned_unusable_scrap_unidentified',
         label: 'Leiloado - sucata inservível não identificada'
      },
      {
         value: 'lot_auctioned_other_auction',
         label: 'Lote arrematado em outro leilão'
      },
      { value: 'expertise_not_performed', label: 'Pericia não realizada' },
      {
         value: 'expertise_without_publication',
         label: 'Periciado sem publicação'
      },
      { value: 'removed_from_auction', label: 'Removido de leilão' },
      {
         value: 'administrative_restriction',
         label: 'Restrição administrativa'
      },
      { value: 'judicial_restriction', label: 'Restrição judicial' },
      { value: 'theft_restriction', label: 'Restrição roubo/furto' },
      { value: 'no_notification_return', label: 'Sem retorno de notificação' },
      { value: 'clone_suspicion', label: 'Suspeita de clone' },
      { value: 'vehicle_written_off', label: 'Veículo baixado' },
      { value: 'vehicle_released', label: 'Veículo liberado' },
      { value: 'vehicle_not_found', label: 'Veículo não localizado' }
   ]

   return (
      <React.Fragment>
         <div>
            <Select onValueChange={handleValueChange} value={currentStatus}>
               <SelectTrigger className="flex items-center gap-2 font-bold font-nunito text-primary-default dark:text-dark-primary-default text-sm uppercase border-none bg-transparent w-fit">
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
