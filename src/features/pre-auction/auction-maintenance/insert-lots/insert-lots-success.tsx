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
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { Separator } from '@/src/components/ui/separator'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { useRouter } from 'next/navigation'

interface InsertLotsSuccessProps {
   id: string
}

export const InsertLotsSuccess: React.FC<InsertLotsSuccessProps> = ({
   id
}: InsertLotsSuccessProps) => {
   const router = useRouter()

   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   return (
      <React.Fragment>
         <div className="grid grid-cols-[1fr_auto]">
            <div>
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
                        <BreadcrumbPage>Novo leilão</BreadcrumbPage>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
                           Ingressar lotes
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
               <div className="grid h-[calc(100vh-12.4125rem)] w-full place-items-center">
                  <div className="grid place-items-center gap-4">
                     <span className="material-symbols-outlined symbol-xl text-[#19B26B]">
                        check_circle
                     </span>
                     <h3 className="text-center font-montserrat text-2xl font-semibold">
                        Lotes do leilão{' '}
                        <span className="font-bold text-primary-default dark:text-dark-primary-default">
                           {id}
                        </span>{' '}
                        adicionados e agendados com sucesso!
                     </h3>
                     <div className="flex items-center gap-4">
                        <Button
                           variant="outline"
                           className="h-10"
                           onClick={() =>
                              router.push(
                                 pre_auction_routes.auction_maintenance
                              )
                           }
                        >
                           Voltar
                        </Button>
                        <Button
                           className="h-10"
                           onClick={() =>
                              router.push(
                                 pre_auction_routes.operations.details(id)
                              )
                           }
                        >
                           Ver lotes do leilão
                        </Button>
                     </div>
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
                        A página de Ingressar Lotes permite adicionar veículos
                        ao leilão selecionando um Pátio para a busca, filtrando
                        pelo número de dias desde o recolhimento e definindo o
                        número de dias até o leilão. É possível incluir lotes
                        novos ou reaproveitáveis, buscando itens pelo GRV (Guia
                        de Recolhimento de Veículos).
                     </p>
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Lotes novos
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           São lotes que nunca passaram por um leilão.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Lotes reaproveitáveis
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           São lotes que já participaram de um leilão e estão
                           novamente disponíveis.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
      </React.Fragment>
   )
}
