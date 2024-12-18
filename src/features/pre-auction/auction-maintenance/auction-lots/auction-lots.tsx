'use client'

import * as React from 'react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { SelectInput } from '@/components/ui/select'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { DisabledFeature } from '@/src/components/ui/disabled-feature'
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
import {
    TableAuctionLots,
    TableAuctionLotsHandle
} from '@/src/features/pre-auction/auction-maintenance/auction-lots/components/data-table'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AuctionLot } from '@/types/entities/auction.entity'
import { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'

interface AuctionMaintenanceLotsProps {
   id: string
   data: any[] // is a AuctionLot[]
   columns: ColumnDef<AuctionLot>[]
}

const AuctionLots: React.FC<AuctionMaintenanceLotsProps> = ({
   id,
   columns,
   data
}: AuctionMaintenanceLotsProps) => {
   const tableRef = React.useRef<TableAuctionLotsHandle>(null)

   const [selectedRows, setSelectedRows] = React.useState<AuctionLot[]>([])
   const [dialog, setDialog] = React.useState(false)
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [globalFilter, setGlobalFilter] = React.useState('')

   const transformedData = React.useMemo(() => {
      return data.flatMap((auction) => {
         if (!auction.AuctionLot?.length) return []

         return auction.AuctionLot.map((lot: AuctionLot) => ({
            ...auction,
            AuctionLot: [lot],
            lotNumber: lot.lotNumber,
            process: auction.auctionCode,
            plate: lot.Vehicle?.plate,
            chassis: lot.Vehicle?.chassis,
            brand: lot.Vehicle?.brand?.name,
            model: lot.Vehicle?.model?.name,
            type: lot.Vehicle?.type?.name
         }))
      })
   }, [data])

   return (
      <React.Fragment>
         <div className="grid grid-cols-[1fr_auto]">
            <div className="flex h-full flex-col space-y-6">
               <div className="space-y-4">
                  <Breadcrumb>
                     <BreadcrumbList>
                        <BreadcrumbItem>
                           <BreadcrumbLink>Pré-leilão</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                           <BreadcrumbLink
                              href={pre_auction_routes.auction_maintenance}
                           >
                              Manutenção de leilões
                           </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                           <BreadcrumbPage>Lista de lotes</BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
                           Lista de lotes - {id?.toUpperCase()}
                        </h1>
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                           <span className="material-symbols-outlined text-action-active dark:text-dark-action-active/70">
                              info
                           </span>
                        </Button>
                     </div>
                     <Separator orientation="horizontal" />
                  </div>
                  {selectedRows.length === 0 && (
                     <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center">
                           <Input
                              label="Busca geral"
                              value={globalFilter}
                              placeholder="Processo, placa, chassi"
                              onChange={(e) => setGlobalFilter(e.target.value)}
                              className="min-w-[300px]"
                           />
                           <Button
                              variant="ghost"
                              className="w-full whitespace-nowrap sm:w-auto sm:min-w-[150px] md:w-fit"
                              onClick={() => setDialog(true)}
                           >
                              Busca avançada
                           </Button>
                        </div>
                        <DisabledFeature>
                           <Button
                              disabled
                              variant="default"
                              className="w-full whitespace-nowrap px-12 sm:w-auto sm:min-w-[150px]"
                           >
                              Importar numeração lotes
                           </Button>
                        </DisabledFeature>
                     </div>
                  )}
                  {selectedRows.length > 0 && (
                     <div className="flex min-h-12 w-full items-center gap-4">
                        <Button
                           variant="ghost"
                           size="icon"
                           className="my-auto"
                           onClick={() => tableRef.current?.resetSelection()}
                        >
                           <span className="material-symbols-outlined text-text-secondary dark:text-dark-text-secondary">
                              close
                           </span>
                        </Button>

                        <span className="whitespace-nowrap text-sm text-text-secondary dark:text-dark-text-secondary">
                           {selectedRows?.length} selecionado
                        </span>

                        <div className="flex items-center gap-2">
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                 selectedRows.map((row) => {
                                    toast.loading(
                                       `Zerando numeração do lote ${row.id}`
                                    )

                                    tableRef.current?.resetSelection()

                                    setTimeout(() => {
                                       toast.dismiss()
                                       toast.success(
                                          `Numeração do lote ${row.id} zerada`
                                       )
                                    }, 3000)
                                 })
                              }}
                           >
                              <span className="material-symbols-outlined text-primary-default dark:text-dark-primary-default">
                                 content_cut
                              </span>
                           </Button>
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                 selectedRows.map((row) => {
                                    toast.loading(
                                       `Criando numeração do lote ${row.id}`
                                    )
                                    tableRef.current?.resetSelection()

                                    setTimeout(() => {
                                       toast.dismiss()
                                       toast.success(
                                          `Numeração do lote ${row.id} criada`
                                       )
                                    }, 3000)
                                 })
                              }}
                           >
                              <span className="material-symbols-outlined text-primary-default dark:text-dark-primary-default">
                                 content_paste
                              </span>
                           </Button>
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                 selectedRows.map((row) => {
                                    toast.loading(`Deletando lote ${row.id}`)

                                    tableRef.current?.resetSelection()

                                    setTimeout(() => {
                                       toast.dismiss()
                                       toast.success(`Lote ${row.id} deletado`)
                                    }, 3000)
                                 })
                              }}
                           >
                              <span className="material-symbols-outlined text-primary-default dark:text-dark-primary-default">
                                 delete
                              </span>
                           </Button>
                        </div>
                     </div>
                  )}
               </div>
               <div className="grid max-h-[calc(100vh-12.4125rem)] w-full overflow-scroll">
                  <div className="flex-1 overflow-auto">
                     <TableAuctionLots
                        ref={tableRef}
                        columns={columns}
                        data={transformedData}
                        globalFilter={globalFilter}
                        onSelectionChange={setSelectedRows}
                     />
                  </div>
               </div>
            </div>
            <CollapsibleSidebar
               open={isSidebarOpen}
               onOpenChange={setIsSidebarOpen}
            >
               <div className="h-full space-y-2 overflow-y-auto md:ml-4 md:mt-9">
                  <div className="flex items-center justify-between gap-2">
                     <h1 className="font-montserrat text-2xl font-semibold dark:text-dark-text-primary">
                        Sobre a página
                     </h1>
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                     >
                        <span
                           className="material-symbols-outlined text-action-active dark:text-dark-action-active/70"
                           style={{ fontSize: '1.5rem' }}
                        >
                           close
                        </span>
                     </Button>
                  </div>
                  <Separator orientation="horizontal" />
                  <div className="max-h-[calc(100vh-12rem)] space-y-4 overflow-y-auto py-6 md:px-4">
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Descrição
                     </p>
                     <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                        A página de Lista de Lotes permite visualizar todos os
                        lotes ingressados no leilão selecionado e acompanhar ou
                        alterar o status de cada um. O usuário pode criar ou
                        zerar a numeração de identificação dos lotes, acessar o
                        histórico de notificações, inserir informações de
                        perícia e monitorar os alertas relacionados a cada lote.
                     </p>
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Status do lote
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           É possível alterar o status conforme o avanço dos
                           processos junto ao DETRAN.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Importar numeração lotes
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Importa e atualiza os dados de GRV e numeração a
                           partir da planilha enviada.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Alertas
                        </p>
                        <div className="space-y-2">
                           <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                              Exibe os alertas pertinentes ao lote, sendo eles:
                           </p>
                           <ul className="list-inside list-disc text-start text-text-secondary dark:text-dark-text-secondary">
                              <li>
                                 <strong>Restrições:</strong> Exibe a lista de
                                 restrições adicionadas ao lote.
                              </li>
                              <li>
                                 <strong>Notificações:</strong> Indica que a
                                 notificação de liberados foi enviada.
                              </li>
                              <li>
                                 <strong>Leilão como sobra:</strong> Indica a
                                 quantidade de leilões que o lote já participou.
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
         <Dialog open={dialog} onOpenChange={setDialog}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Busca avançada</DialogTitle>
               </DialogHeader>
               <div className="space-y-6 py-4 pb-6">
                  <p className="font-montserrat text-lg">
                     Preencha os campos necessários para busca
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                     <SelectInput
                        label="Notificação liberado"
                        placeholder="Selecione a notificação"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                     <SelectInput
                        label="Perícia"
                        placeholder="Selecione a perícia"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                     <SelectInput
                        label="Status"
                        placeholder="Selecione o status"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
                     <SelectInput
                        label="Restrição"
                        placeholder="Selecione a restrição"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                     <SelectInput
                        label="Sub-restrição"
                        placeholder="Selecione a sub-restrição"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                     <SelectInput
                        label="Processo"
                        placeholder="0000000000"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
                     <SelectInput
                        label="Placa"
                        placeholder="000-0000"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                     <SelectInput
                        label="Chassi"
                        placeholder="00000000000000000"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                     <SelectInput
                        label="Marca/Modelo"
                        placeholder="Selecione a marca/modelo"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
                     <SelectInput
                        label="Cor"
                        placeholder="Selecione a cor"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                     <SelectInput
                        label="Tipo"
                        placeholder="Selecione o tipo"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                  </div>
               </div>
               <div className="mb-6 mt-2 grid gap-2 md:grid-cols-2">
                  <div className="order-2 md:order-1">
                     <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => setDialog(false)}
                     >
                        Cancelar
                     </Button>
                  </div>
                  <div className="order-1 md:order-2">
                     <Button
                        variant="default"
                        className="w-full"
                        onClick={() => setDialog(false)}
                     >
                        Buscar
                     </Button>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}

export default AuctionLots
