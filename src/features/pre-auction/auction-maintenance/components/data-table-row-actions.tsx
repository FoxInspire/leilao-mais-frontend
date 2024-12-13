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
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SelectInput, SelectInputValue } from '@/src/components/ui/select'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

interface DataTableRowActionsProps<TData> {
   row?: Row<AuctionEntity>
   onSelect?: (value: string) => void
}

export function DataTableRowActions<TData>({
   row,
   onSelect
}: DataTableRowActionsProps<TData>) {
   const router = useRouter()
   const [dialog, setDialog] = React.useState({
      export_lots: false
   })

   const menuItems = [
      {
         icon: 'add',
         label: 'Ingressar lotes',
         value: 'add-lots',
         filled: false,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.insert_lots(
                  String(row?.original?.auctionCode)
               )
            )
         }
      },
      {
         icon: 'edit',
         label: 'Editar leilão',
         value: 'edit-auction',
         filled: true,
         disabled: false,
         onClick: () => {
            router.push(
               pre_auction_routes.edit_auction(
                  String(row?.original?.auctionCode)
               )
            )
         }
      },
      {
         icon: 'open_in_new',
         label: 'Exportar lotes',
         value: 'export-lots',
         filled: false,
         disabled: false,
         onClick: () => {
            setDialog({ ...dialog, export_lots: true })
         }
      },
      {
         icon: 'content_paste',
         label: 'Gerar edital de leilão',
         value: 'generate-notice',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'mail',
         label: 'Notificar proprietários',
         value: 'notify-owners',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'download',
         label: 'Importar proprietários',
         value: 'import-owners',
         filled: false,
         disabled: true,
         onClick: () => {}
      },
      {
         icon: 'monitor',
         label: 'Monitor de operações',
         value: 'operations-monitor',
         filled: false,
         disabled: true,
         onClick: () => {}
      }
   ]

   return (
      <React.Fragment>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="icon"
                  size="icon"
                  className="flex data-[state=open]:bg-muted"
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
                     {index === menuItems.length - 1 && (
                        <DropdownMenuSeparator />
                     )}
                     <DropdownMenuItem
                        className="font-medium"
                        disabled={item.disabled}
                        onClick={() => {
                           onSelect?.(item.value)
                           item.onClick?.()
                        }}
                     >
                        <span
                           className={cn(
                              'material-symbols-outlined text-text-secondary symbol-md dark:text-dark-text-secondary',
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
         <Dialog open={dialog.export_lots}>
            <DialogContent
               className={cn({
                  'md:max-w-xl': dialog.export_lots
               })}
            >
               {dialog.export_lots && (
                  <ExportLotsAction
                     onClose={() =>
                        setDialog({
                           ...dialog,
                           export_lots: false
                        })
                     }
                     onExport={() => {}}
                  />
               )}
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}

interface ExportLotsActionProps {
   row?: Row<AuctionEntity>
   onExport: () => void
   onClose: () => void
   onSelected?: (value: SelectInputValue | SelectInputValue[]) => void
}

const ExportLotsAction: React.FC<ExportLotsActionProps> = ({
   row,
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
            <p className="text-lg font-montserrat">
               Leilão{' '}
               <span className="font-semibold">
                  {row?.original?.auctionCode}
               </span>
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
         <div className="grid md:grid-cols-2 gap-2 mb-6 mt-2">
            <div className="md:order-1 order-2">
               <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => onClose?.()}
               >
                  Cancelar
               </Button>
            </div>
            <div className="md:order-2 order-1">
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
