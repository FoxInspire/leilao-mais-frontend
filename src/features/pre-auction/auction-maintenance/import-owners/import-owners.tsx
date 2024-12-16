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

interface ImportOwnersProps {
   id: string
}

const ImportOwners: React.FC<ImportOwnersProps> = ({
   id
}: ImportOwnersProps) => {
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
                           <BreadcrumbPage>
                              Importar proprietários
                           </BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap justify-between items-center gap-2">
                        <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
                           Importar proprietários - {id}
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
                     <div className="flex items-center gap-2 grow w-full">
                        <Button variant="outline" className="whitespace-nowrap">
                           <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined filled symbol-sm">
                                 download_2
                              </span>
                              <span className="text-sm">Baixar modelo</span>
                           </div>
                        </Button>
                     </div>
                     <div className="flex grow items-center gap-2">
                        <Button variant="ghost" className="whitespace-nowrap">
                           Selecionar arquivo
                        </Button>
                        <Button
                           variant="default"
                           className="sm:min-w-[150px] whitespace-nowrap"
                        >
                           Enviar arquivo
                        </Button>
                     </div>
                  </div>
               </div>
               <div className="grid w-full overflow-scroll max-h-[calc(100vh-12.4125rem)]">
                  <div className="flex-1 overflow-auto">
                     {/* <DataTable
                        data={data}
                        columns={columns}
                        globalFilter={globalFilter}
                     /> */}
                  </div>
               </div>
            </div>
            <CollapsibleSidebar
               open={isSidebarOpen}
               onOpenChange={setIsSidebarOpen}
            >
               <div className="space-y-2 h-full overflow-y-auto ml-4 mt-[36px]">
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
                           className="material-symbols-outlined text-action-active dark:text-dark-action-active/70"
                           style={{ fontSize: '1.5rem' }}
                        >
                           close
                        </span>
                     </Button>
                  </div>
                  <Separator orientation="horizontal" />
                  <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                     <p className="text-black dark:text-dark-text-primary font-semibold text-start">
                        Descrição
                     </p>
                     <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                        A página de Importar Proprietários permite atualizar
                        informações dos lotes quando o retorno do Detran não é
                        automático. O usuário pode enviar um arquivo no sistema
                        seguindo um modelo específico e visualizar a lista de
                        arquivos importados para acompanhar as atualizações
                        realizadas.
                     </p>
                     <p className="text-black dark:text-dark-text-primary font-semibold text-start">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Baixar modelo
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Faz o download do modelo da planilha para
                           preenchimento dos dados necessários.
                        </p>
                     </div>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Enviar arquivo
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Atualiza as informações dos proprietários com o
                           conteúdo da planilha enviada.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
      </React.Fragment>
   )
}

export default ImportOwners
