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
import {
   TableAuctionLots,
   TableAuctionLotsHandle
} from '@/features/pre-auction/auction-lots/components/data-table'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AuctionLot } from '@/types/entities/auction.entity'
import { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'

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
                     <div className="flex flex-wrap justify-between items-center gap-2">
                        <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
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
                     <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                           <Input
                              label="Busca geral"
                              value={globalFilter}
                              placeholder="Processo, placa, chassi"
                              onChange={(e) => setGlobalFilter(e.target.value)}
                              className="min-w-[300px]"
                           />
                           <Button
                              variant="ghost"
                              className="md:w-fit sm:w-auto sm:min-w-[150px] whitespace-nowrap w-full"
                              onClick={() => setDialog(true)}
                           >
                              Busca avançada
                           </Button>
                        </div>
                        <Button
                           variant="default"
                           className="w-full sm:w-auto px-12 sm:min-w-[150px] whitespace-nowrap"
                        >
                           Importar numeração lotes
                        </Button>
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
               className={cn({
                  'overflow-y-auto': isSidebarOpen,
                  'overflow-y-hidden h-0': !isSidebarOpen
               })}
            >
               <div className="space-y-2 h-full overflow-y-auto md:ml-4 md:mt-9">
                  <div className="flex justify-between items-center gap-2">
                     <h1 className="text-2xl font-semibold font-montserrat dark:text-dark-text-primary">
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
                        A página de Lista de Lotes permite visualizar todos os
                        lotes ingressados no leilão selecionado e acompanhar ou
                        alterar o status de cada um. O usuário pode criar ou
                        zerar a numeração de identificação dos lotes, acessar o
                        histórico de notificações, inserir informações de
                        perícia e monitorar os alertas relacionados a cada lote.
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
                           Importar numeração lotes
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Importa e atualiza os dados de GRV e numeração a
                           partir da planilha enviada.
                        </p>
                     </div>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Alertas
                        </p>
                        <div className="space-y-2">
                           <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                              Exibe os alertas pertinentes ao lote, sendo eles:
                           </p>
                           <ul className="list-disc list-inside text-text-secondary dark:text-dark-text-secondary text-start">
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
                  <p className="text-lg font-montserrat">
                     Preencha os campos necessários para busca
                  </p>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                     <SelectInput
                        label="Notificação liberado"
                        placeholder="Selecione a notificação"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value: SelectInputValue) =>
                           console.log('value', value)
                        }
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
                        onValueChange={(value: SelectInputValue) =>
                           console.log('value', value)
                        }
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
                        onValueChange={(value: SelectInputValue) =>
                           console.log('value', value)
                        }
                     />
                  </div>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-center">
                     <SelectInput
                        label="Restrição"
                        placeholder="Selecione a restrição"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value: SelectInputValue) =>
                           console.log('value', value)
                        }
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
                        onValueChange={(value: SelectInputValue) =>
                           console.log('value', value)
                        }
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
                        onValueChange={(value: SelectInputValue) =>
                           console.log('value', value)
                        }
                     />
                  </div>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-center">
                     <SelectInput
                        label="Placa"
                        placeholder="000-0000"
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
                        label="Chassi"
                        placeholder="00000000000000000"
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
                        label="Marca/Modelo"
                        placeholder="Selecione a marca/modelo"
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
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-center">
                     <SelectInput
                        label="Cor"
                        placeholder="Selecione a cor"
                        options={[
                           { id: '1', label: 'Opção 1', value: 'option1' },
                           { id: '2', label: 'Opção 2', value: 'option2' },
                           { id: '3', label: 'Opção 3', value: 'option3' },
                           { id: '4', label: 'Opção 4', value: 'option4' }
                        ]}
                        onValueChange={(value: SelectInputValue) =>
                           console.log('value', value)
                        }
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
                        onValueChange={(value: SelectInputValue) =>
                           console.log('value', value)
                        }
                     />
                  </div>
               </div>
               <div className="grid md:grid-cols-2 gap-2 mb-6 mt-2">
                  <div className="md:order-1 order-2">
                     <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => setDialog(false)}
                     >
                        Cancelar
                     </Button>
                  </div>
                  <div className="md:order-2 order-1">
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

type AuctionMaintenanceLotsProps = {
   id: string
   data: any[]
   columns: ColumnDef<AuctionLot>[]
}

export default AuctionLots
