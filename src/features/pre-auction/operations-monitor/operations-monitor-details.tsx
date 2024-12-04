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
import { SelectInput, SelectInputValue } from '@/components/ui/select'
import { TableAuctionLotsHandle } from '@/features/pre-auction/auction-lots/components/data-table'
import { TableOperationMonitorDetails } from '@/features/pre-auction/operations-monitor/components/data-table'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { DisabledFeature } from '@/src/components/ui/disabled-feature'
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
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
            <div className="space-y-6 h-full flex flex-col">
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
                     <div className="flex flex-wrap justify-between items-center gap-2">
                        <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
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
                     <div className="flex flex-col gap-4 w-full md:flex-row sm:items-center sm:justify-between">
                        <div className="grid md:grid-cols-4 items-start sm:items-center gap-4 md:max-w-[70%] w-full">
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
                              className="md:w-fit sm:w-auto sm:min-w-[150px] whitespace-nowrap w-full"
                              onClick={() => setDialog(true)}
                           >
                              Busca avançada
                           </Button>
                        </div>
                        <DisabledFeature>
                           <Button
                              disabled
                              variant="default"
                              className="w-full sm:w-auto px-12 sm:min-w-[150px] whitespace-nowrap"
                           >
                              Consultas
                           </Button>
                        </DisabledFeature>
                     </div>
                  )}
                  {selectedRows.length > 0 && (
                     <div className="flex items-center gap-4 w-full min-h-12">
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

                        <span className="text-sm text-text-secondary whitespace-nowrap dark:text-dark-text-secondary">
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
               <div className="grid w-full overflow-scroll max-h-[calc(100vh-17.4125rem)]">
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
               <div className="space-y-2 h-full overflow-y-auto md:ml-4">
                  <div className="flex justify-between items-center gap-2 mt-9">
                     <h1 className="text-2xl font-semibold font-montserrat">
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
                  <div className="md:px-4 py-6 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                     <p className="text-black dark:text-dark-text-primary font-semibold text-start">
                        Descrição
                     </p>
                     <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                        A página de Monitor de Operações permite acompanhar em
                        tempo real as transações dos lotes em um leilão ativo
                        junto ao DETRAN. O usuário pode alterar o status do lote
                        conforme o retorno do órgão, consultar informações do
                        veículo, agendar, cancelar ou reiniciar transações e
                        monitorar mensagens e notificações relevantes para cada
                        lote.
                     </p>
                     <p className="text-black dark:text-dark-text-primary font-semibold text-start">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Status do lote
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           É possível alterar o status conforme o avanço dos
                           processos junto ao DETRAN.
                        </p>
                     </div>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Transação
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Operações e processos necessários ao lote junto ao
                           DETRAN. A cor verde indica sucesso
                        </p>
                     </div>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Agendado
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Exibe o ícone quando a transação do lote for
                           agendada.
                        </p>
                     </div>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Consultas
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
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
                  <p className="text-lg font-montserrat">
                     Preencha os campos necessários para busca
                  </p>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                     <SelectInput
                        label="Status"
                        placeholder="Selecione o status"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value: SelectInputValue) => {
                           console.log('value', value)
                        }}
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
                        onValueChange={(value: SelectInputValue) => {
                           console.log('value', value)
                        }}
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
                        onValueChange={(value: SelectInputValue) => {
                           console.log('value', value)
                        }}
                     />
                  </div>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
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
               <div className="grid md:grid-cols-2 gap-2 mb-6 mt-2">
                  <div className="md:order-1 order-2">
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
                  <div className="md:order-2 order-1">
                     <Button
                        variant="default"
                        className="w-full"
                        onClick={() => {
                           console.log('buscar')
                           setDialog(false)
                        }}
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
