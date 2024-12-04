'use client'

import * as React from 'react'
import * as z from 'zod'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const createAuctionSchema = z.object({})

export const CreateAuction: React.FC = () => {
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   const form = useForm<z.infer<typeof createAuctionSchema>>({
      resolver: zodResolver(createAuctionSchema),
      defaultValues: {}
   })

   async function onSubmit(data: z.infer<typeof createAuctionSchema>) {
      console.log('data', data)
   }

   return (
      <React.Fragment>
         <div className="grid grid-cols-[1fr_auto]">
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
                        Cadastrar Novo leilão
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
      </React.Fragment>
   )
}
