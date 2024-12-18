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

interface UpdateAuctionSuccessProps {
   id: string
}

export const UpdateAuctionSuccess: React.FC<UpdateAuctionSuccessProps> = ({
   id
}: UpdateAuctionSuccessProps) => {
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
                        <BreadcrumbPage>Editar leilão</BreadcrumbPage>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
                           Editar leilão {id}
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
                        Edição leilão {id} realizada com sucesso
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
                           Ver leilões
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
                        A página de Cadastrar Novo Leilão permite registrar um
                        leilão inserindo seus Dados Gerais, como nome,
                        localização e datas. Também é possível preencher Dados
                        Complementares, como leiloeiro, comitente e empresa,
                        além de definir um e-mail para envio de notificações
                        relacionadas ao leilão.
                     </p>
                     <div className="space-y-2 rounded-md bg-[#E6F1F7] px-4 py-4">
                        <p className="text-start font-normal text-black">
                           Info
                        </p>
                        <p className="text-start text-text-secondary">
                           Os dados deste formulário são para o Edital do
                           leilão, sendo enviadas ao DETRAN na criação do leilão
                           e no resultado do leilão.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
      </React.Fragment>
   )
}
