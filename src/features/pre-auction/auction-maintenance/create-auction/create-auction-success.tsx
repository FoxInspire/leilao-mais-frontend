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

interface CreateAuctionSuccessProps {
   id: string
}

export const CreateAuctionSuccess: React.FC<CreateAuctionSuccessProps> = ({
   id
}: CreateAuctionSuccessProps) => {
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
                        <BreadcrumbPage>Novo leilão</BreadcrumbPage>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap justify-between items-center gap-2">
                        <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
                           Cadastrar novo leilão
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
               <div className="grid w-full h-[calc(100vh-12.4125rem)] place-items-center">
                  <div className="grid place-items-center gap-4">
                     <span className="material-symbols-outlined text-[#19B26B] symbol-xl">
                        check_circle
                     </span>
                     <h3 className="text-center text-2xl font-semibold font-montserrat">
                        Cadastro leilão{' '}
                        <span className="font-bold text-primary-default dark:text-dark-primary-default">
                           {id}
                        </span>{' '}
                        realizado com sucesso
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
                        <Button
                           className="h-10"
                           onClick={() =>
                              router.push(pre_auction_routes.insert_lots(id))
                           }
                        >
                           Ingressar lotes
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            <CollapsibleSidebar
               open={isSidebarOpen}
               onOpenChange={setIsSidebarOpen}
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
                        A página de Cadastrar Novo Leilão permite registrar um
                        leilão inserindo seus Dados Gerais, como nome,
                        localização e datas. Também é possível preencher Dados
                        Complementares, como leiloeiro, comitente e empresa,
                        além de definir um e-mail para envio de notificações
                        relacionadas ao leilão.
                     </p>
                     <div className="bg-[#E6F1F7] px-4 py-4 space-y-2 rounded-md">
                        <p className="text-black font-normal text-start">
                           Info
                        </p>
                        <p className="text-text-secondary text-start">
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
