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
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger
} from '@/components/ui/select'
import { DataTable } from '@/features/pre-auction/auction-maintenance/components/data-table'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { DatePicker } from '@/src/components/ui/date-picker'
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { ColumnDef } from '@tanstack/react-table'

const AuctionMaintenanceLots: React.FC<AuctionMaintenanceLotsProps> = ({
   id,
   columns,
   data
}: AuctionMaintenanceLotsProps) => {
   console.log('id', id)
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [globalFilter, setGlobalFilter] = React.useState('')

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
                  <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center sm:justify-between">
                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                        <Input
                           label="Busca geral"
                           value={globalFilter}
                           placeholder="Processo, placa, chassi"
                           onChange={(e) => setGlobalFilter(e.target.value)}
                           className="min-w-[300px]"
                        />
                        <Dialog>
                           <DialogTrigger
                              className="md:w-fit sm:w-auto sm:min-w-[150px] whitespace-nowrap w-full"
                              asChild
                           >
                              <div>
                                 <Button
                                    variant="ghost"
                                    className="md:w-fit sm:w-auto sm:min-w-[150px] whitespace-nowrap w-full"
                                 >
                                    Busca avançada
                                 </Button>
                              </div>
                           </DialogTrigger>
                           <DialogContent>
                              <DialogHeader>
                                 <DialogTitle>Busca avançada</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4 pb-6">
                                 <p className="text-lg font-montserrat">
                                    Preencha os campos necessários para busca
                                 </p>
                                 <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                                    <Input
                                       label="Placa"
                                       placeholder="000-0000"
                                    />
                                    <Input
                                       label="Descrição"
                                       placeholder="Descrição do leilão"
                                    />
                                    <Input
                                       label="Processo"
                                       placeholder="Número do processo"
                                    />
                                 </div>
                                 <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                                    <DatePicker
                                       label="Data"
                                       placeholder="DD/MM/YYYY"
                                    />
                                    <Input
                                       label="ID"
                                       placeholder="ID do leilão"
                                    />
                                    <Input
                                       label="Descrição"
                                       placeholder="Descrição do leilão"
                                    />
                                 </div>
                                 <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                                    <Select>
                                       <SelectTrigger unstyled hideIcon>
                                          <Input
                                             label="Status"
                                             placeholder="Selecione o status"
                                          />
                                       </SelectTrigger>
                                       <SelectContent>
                                          <SelectItem value="light">
                                             Light
                                          </SelectItem>
                                          <SelectItem value="dark">
                                             Dark
                                          </SelectItem>
                                          <SelectItem value="system">
                                             System
                                          </SelectItem>
                                       </SelectContent>
                                    </Select>
                                    <Input
                                       label="Local"
                                       placeholder="Local do leilão"
                                    />
                                    <Input
                                       label="Comitente"
                                       placeholder="Comitente do leilão"
                                    />
                                 </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-2 mb-6 mt-2">
                                 <div className="md:order-1 order-2">
                                    <Button
                                       variant="destructive"
                                       className="w-full"
                                    >
                                       Cancelar
                                    </Button>
                                 </div>
                                 <div className="md:order-2 order-1">
                                    <Button
                                       variant="default"
                                       className="w-full"
                                    >
                                       Buscar
                                    </Button>
                                 </div>
                              </div>
                           </DialogContent>
                        </Dialog>
                     </div>
                     <Button
                        variant="default"
                        className="w-full sm:w-auto px-12 sm:min-w-[150px] whitespace-nowrap"
                     >
                        Importar numeração lotes
                     </Button>
                  </div>
               </div>
               <div className="grid w-full overflow-scroll max-h-[calc(100vh-17.4125rem)]">
                  <div className="flex-1 overflow-auto">
                     <DataTable
                        data={data}
                        columns={columns}
                        globalFilter={globalFilter}
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
               <div className="space-y-2 h-full overflow-y-auto ml-4 mt-[28px]">
                  <div className="flex justify-between items-center gap-2">
                     <h1 className="text-2xl font-semibold font-montserrat">
                        Sobre a página
                     </h1>
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                     >
                        <span
                           className="material-symbols-outlined text-action-active"
                           style={{ fontSize: '1.5rem' }}
                        >
                           close
                        </span>
                     </Button>
                  </div>
                  <Separator orientation="horizontal" />
                  <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                     <p className="text-black font-semibold text-start">
                        Descrição
                     </p>
                     <p className="text-text-secondary text-start">
                        A página de Manutenção de Leilões permite visualizar a
                        lista de leilões cadastrados, alterar o status conforme
                        o andamento dos processos junto ao DETRAN e buscar
                        informações específicas. Além disso, é possível
                        ingressar lotes nos leilões e acessar um menu de opções
                        avançadas para uma gestão mais detalhada.
                     </p>
                     <p className="text-black font-semibold text-start">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-black font-normal text-start">
                           Status do leilão
                        </p>
                        <p className="text-text-secondary text-start">
                           É possível alterar o status conforme o avanço dos
                           processos junto ao DETRAN.
                        </p>
                     </div>
                     <div>
                        <p className="text-black font-normal text-start">
                           Lotes
                        </p>
                        <p className="text-text-secondary text-start">
                           Exibe a quantidade de lotes ingressados no leilão.
                        </p>
                     </div>
                     <div className="bg-[#E6F1F7] px-4 py-4 space-y-2">
                        <p className="text-black font-normal text-start">
                           Info
                        </p>
                        <p className="text-text-secondary text-start">
                           Clique no card para acessar o leilão.
                        </p>
                        <p className="text-text-secondary text-start">
                           Clique no nome do leilão para acessar a lista de
                           lotes do leilão selecionado.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
      </React.Fragment>
   )
}

type AuctionMaintenanceLotsProps = {
   id: string
   data: any[]
   columns: ColumnDef<any>[]
}

export default AuctionMaintenanceLots
