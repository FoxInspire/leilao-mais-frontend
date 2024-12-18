'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SelectInput, SelectInputValue } from '@/src/components/ui/select'

/**
 * To see export format:
 * https://drive.google.com/drive/folders/1rDD2QlM4TTzDNRGyWk7M436592rGOKLj?usp=sharing
 */

interface ExportLotsActionProps {
   id: string
   onExport: () => void
   onClose: () => void
   onSelected?: (value: SelectInputValue | SelectInputValue[]) => void
}

export const ExportLotsAction: React.FC<ExportLotsActionProps> = ({
   id,
   onExport,
   onClose,
   onSelected
}: ExportLotsActionProps) => {
   return (
      <React.Fragment>
         <DialogHeader>
            <DialogTitle onClose={() => onClose()}>Exportar lotes</DialogTitle>
         </DialogHeader>
         <div className="space-y-6 py-4 pb-6">
            <p className="font-montserrat text-lg">
               Leilão <span className="font-semibold">{id}</span>
            </p>
            <div>
               <SelectInput
                  label="Tipo de lote"
                  item="checkbox"
                  placeholder="Selecione o tipo de lote"
                  options={[
                     {
                        id: '1',
                        label: 'Todos os lotes',
                        value: 'all'
                     },
                     {
                        id: '2',
                        label: 'Lotes válidos',
                        value: 'valid'
                     },
                     {
                        id: '3',
                        label: 'Lotes com restrição judicial',
                        value: 'judicial'
                     },
                     {
                        id: '4',
                        label: 'Lotes com restrição de roubo/furto',
                        value: 'robbery'
                     },
                     {
                        id: '5',
                        label: 'Lotes com restrição administrativa',
                        value: 'administrative'
                     }
                  ]}
                  onValueChange={(value) => onSelected?.(value)}
               />
            </div>
         </div>
         <div className="mb-6 mt-2 grid gap-2 md:grid-cols-2">
            <div className="order-2 md:order-1">
               <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => onClose?.()}
               >
                  Cancelar
               </Button>
            </div>
            <div className="order-1 md:order-2">
               <Button
                  variant="default"
                  className="w-full"
                  onClick={() => onExport?.()}
               >
                  Exportar
               </Button>
            </div>
         </div>
      </React.Fragment>
   )
}
