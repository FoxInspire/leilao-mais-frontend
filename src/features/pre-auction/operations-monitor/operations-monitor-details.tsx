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
import { TableOperationMonitorDetails } from '@/features/pre-auction/operations-monitor/components/data-table'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { DisabledFeature } from '@/src/components/ui/disabled-feature'
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
import { TableAuctionLotsHandle } from '@/src/features/pre-auction/auction-maintenance/auction-lots/components/data-table'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AuctionEntity, AuctionLot } from '@/types/entities/auction.entity'
import { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'

interface OperationsMonitorDetailsProps {
   id: string
   columns: ColumnDef<AuctionLot>[]
   data: AuctionEntity[]
}

export const OperationsMonitorDetails: React.FC<
   OperationsMonitorDetailsProps
> = ({ id, columns, data }: OperationsMonitorDetailsProps) => {
   const tableRef = React.useRef<TableAuctionLotsHandle>(null)

   const [selectedRows, setSelectedRows] = React.useState<AuctionLot[]>([])
   const [dialog, setDialog] = React.useState(false)
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [globalFilter, setGlobalFilter] = React.useState('')

   const transformed_data = React.useMemo(() => {
      return data.flatMap(({ auctionCode, AuctionLot = [], ...auctionRest }) =>
         AuctionLot.map(({ Vehicle, lotNumber, ...lotRest }) => ({
            ...auctionRest,
            ...lotRest,
            lotNumber,
            process: auctionCode,
            plate: Vehicle?.plate,
            chassis: Vehicle?.chassis,
            brand: Vehicle?.brand?.name,
            model: Vehicle?.model?.name,
            type: Vehicle?.type?.name,
            AuctionLot: [{ Vehicle, lotNumber, ...lotRest }]
         }))
      )
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
                              href={pre_auction_routes.operations_monitor}
                           >
                              Monitor de operações
                           </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                           <BreadcrumbPage>Leilão</BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
                           Operações - {id?.toUpperCase()}
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
                     <div className="flex w-full flex-col gap-4 sm:items-center sm:justify-between md:flex-row">
                        <div className="grid w-full items-start gap-4 sm:items-center md:max-w-[70%] md:grid-cols-4">
                           <Input
                              label="Busca geral"
                              value={globalFilter}
                              placeholder="Processo, placa, chassi"
                              onChange={(e) => setGlobalFilter(e.target.value)}
                           />
                           <SelectInput
                              options={[]}
                              placeholder="Selecione o status"
                              label="Status"
                           />
                           <SelectInput
                              options={[]}
                              placeholder="Selecione a transação"
                              label="Transação"
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
                              Consultas
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
                     <TableOperationMonitorDetails
                        ref={tableRef}
                        columns={columns}
                        data={transformed_data || []}
                        globalFilter={globalFilter}
                        onSelectionChange={setSelectedRows}
                     />
                  </div>
               </div>
            </div>
            <CollapsibleSidebar
               open={isSidebarOpen}
               onOpenChange={setIsSidebarOpen}
               className="h-[calc(100vh-1.5rem-56px)]"
            >
               <div className="h-full space-y-2 overflow-y-auto md:ml-4">
                  <div className="mt-9 flex items-center justify-between gap-2">
                     <h1 className="font-montserrat text-2xl font-semibold">
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
                        A página de Monitor de Operações permite acompanhar em
                        tempo real as transações dos lotes em um leilão ativo
                        junto ao DETRAN. O usuário pode alterar o status do lote
                        conforme o retorno do órgão, consultar informações do
                        veículo, agendar, cancelar ou reiniciar transações e
                        monitorar mensagens e notificações relevantes para cada
                        lote.
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
                           Transação
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Operações e processos necessários ao lote junto ao
                           DETRAN. A cor verde indica sucesso
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Agendado
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Exibe o ícone quando a transação do lote for
                           agendada.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Consultas
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           É possível consultar mais informações sobre o veículo
                           na base de dados.
                        </p>
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
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                     <SelectInput
                        label="Transação"
                        placeholder="Selecione a transação"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                     <SelectInput
                        label="Agendado"
                        placeholder="Selecione agendamento"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value) => {}}
                     />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                     <Input label="Processo" placeholder="Número do processo" />
                     <Input label="Placa" placeholder="000-0000" />
                     <Input label="Chassi" placeholder="00000000000000000" />
                  </div>
                  <Input
                     className="col-span-3"
                     label="Marca/Modelo"
                     placeholder="Ex: Fiat, VW"
                  />
               </div>
               <div className="mb-6 mt-2 grid gap-2 md:grid-cols-2">
                  <div className="order-2 md:order-1">
                     <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                           setDialog(false)
                        }}
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
