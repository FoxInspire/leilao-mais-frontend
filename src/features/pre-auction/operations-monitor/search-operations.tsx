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
import { OperationsMonitorIllustation } from '@/src/components/svgs/operations-monitor'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { SelectInput } from '@/src/components/ui/select'
import { Separator } from '@/src/components/ui/separator'
import { AuctionEntity } from '@/src/types/entities/auction.entity'

interface SearchOperationsProps {
   auctions: AuctionEntity[]
}

export const SearchOperations: React.FC<SearchOperationsProps> = ({
   auctions
}: SearchOperationsProps) => {
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   return (
      <React.Fragment>
         <div className="grid grid-cols-[1fr_auto] h-[calc(100vh-6.5rem)] overflow-hidden">
            <div className="max-h-svh space-y-10">
               <div className="space-y-4">
                  <Breadcrumb>
                     <BreadcrumbList>
                        <BreadcrumbItem>
                           <BreadcrumbLink>Pré-leilão</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                           <BreadcrumbPage>Monitor de operações</BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap justify-between items-center gap-2">
                        <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
                           Monitor de operações
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
               </div>
               <div className="space-y-6 max-w-xl mx-auto">
                  <OperationsMonitorIllustation className="h-52 mx-auto" />
                  <h3 className="text-center text-2xl font-semibold font-montserrat">
                     Selecione um leilão para carregar lista de lotes
                  </h3>
                  <SelectInput
                     label="Leilão"
                     placeholder="Selecione o leilão"
                     options={
                        auctions?.map((auction) => ({
                           label: auction.auctionCode,
                           value: auction.id
                        })) || []
                     }
                  />
                  <Button className="w-full">Continuar</Button>
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
      </React.Fragment>
   )
}
