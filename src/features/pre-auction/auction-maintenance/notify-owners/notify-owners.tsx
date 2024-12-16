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
import { SelectInput } from '@/components/ui/select'
import { DataTable } from '@/features/pre-auction/auction-maintenance/components/data-table'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { Separator } from '@/src/components/ui/separator'
import { ColumnDef } from '@tanstack/react-table'

import { pre_auction_routes } from '@/src/routes/pre-auction'
import { NotifyOwnersEntity } from '@/src/types/entities/notify-owners.entity'

interface NotifyOwnersProps {
   id: string
   data: NotifyOwnersEntity[]
   columns: ColumnDef<NotifyOwnersEntity>[]
}

const NotifyOwners: React.FC<NotifyOwnersProps> = ({
   id,
   columns,
   data
}: NotifyOwnersProps) => {
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
                              Notificar proprietários
                           </BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap justify-between items-center gap-2">
                        <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
                           Notificar proprietários - {id}
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
                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                        <div className="min-w-[300px]">
                           <SelectInput
                              options={[]}
                              label="Endereço notificável"
                              placeholder="Selecione o endereço notificável"
                           />
                        </div>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                           324 registros encontrados
                        </p>
                     </div>
                     <div className="flex grow items-center gap-2">
                        <Button variant="ghost" className="whitespace-nowrap">
                           extrair excel
                        </Button>
                        <Button
                           variant="default"
                           className="sm:min-w-[150px] whitespace-nowrap"
                        >
                           Gerar arquivo
                        </Button>
                     </div>
                  </div>
               </div>
               <div className="grid w-full overflow-scroll max-h-[calc(100vh-12.4125rem)]">
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
                        A página de Notificar Proprietários permite visualizar a
                        lista de proprietários dos veículos incluídos em um
                        leilão. É possível extrair uma planilha com os dados da
                        listagem e gerar um arquivo de texto para utilização em
                        outras plataformas, como o sistema dos Correios.
                     </p>
                     <p className="text-black dark:text-dark-text-primary font-semibold text-start">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Extrair excel
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Faz o download da planilha Excel contendo todos os
                           dados referente aos proprietários dos veículos.
                        </p>
                     </div>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Gerar arquivo
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Faz o download de um arquivo de texto (.txt) para ser
                           utilizado em outras plataformas, contendo todos os
                           dados referente aos proprietários dos veículos.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
      </React.Fragment>
   )
}

export default NotifyOwners
