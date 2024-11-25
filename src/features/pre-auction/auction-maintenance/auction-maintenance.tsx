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
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
import { cn } from '@/src/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './components/data-table'

const AuctionMaintenance: React.FC<AuctionMaintenanceProps> = ({
   columns,
   data
}: AuctionMaintenanceProps) => {
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
                           <BreadcrumbPage>Manutenção de leilões</BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap justify-between items-center gap-2">
                        <h1 className="text-3xl font-semibold font-montserrat">
                           Manutenção de leilões
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
                           size="md"
                           label="Busca geral"
                           placeholder="Descrição, Local, ID"
                           value={globalFilter}
                           onChange={(e) => setGlobalFilter(e.target.value)}
                           className="min-w-[300px]"
                        />
                        <Button
                           variant="ghost"
                           className="w-fit sm:w-auto sm:min-w-[150px] whitespace-nowrap"
                        >
                           Busca avançada
                        </Button>
                     </div>
                     <Button
                        variant="default"
                        className="w-full sm:w-auto sm:min-w-[150px] whitespace-nowrap"
                     >
                        Novo leilão
                     </Button>
                  </div>
               </div>
               <div className="grid w-full overflow-scroll max-h-[calc(100vh-17.4125rem)]">
                  <div className="flex-1">
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
               className={cn('h-svh', {
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
                     <p className="text-black font-semibold text-start">Descrição</p>
                     <p className="text-text-secondary text-start">
                        A página de Dashboard oferece uma visão geral dos leilões,
                        exibindo cards com o status das transações. O usuário pode
                        navegar em abas organizadas por: Em progresso, Inaptos e
                        Concluídos. Também é possível aplicar filtros por tipo de
                        erro e transação, facilitando o acompanhamento e a gestão
                        eficiente dos leilões.
                     </p>
                     <p className="text-black font-semibold text-start">Detalhes</p>
                     <div>
                        <p className="text-black font-normal text-start">
                           Aba Em progresso
                        </p>
                        <p className="text-text-secondary text-start">
                           Reúne os leilões que iniciaram as transações com o DETRAN
                           e não apresentam erros.
                        </p>
                     </div>
                     <div>
                        <p className="text-black font-normal text-start">
                           Aba Inaptos
                        </p>
                        <p className="text-text-secondary text-start">
                           Reúne os leilões que não aderem a nenhum filtro de erro.
                        </p>
                     </div>
                     <div>
                        <p className="text-black font-normal text-start">
                           Aba Concluídos
                        </p>
                        <p className="text-text-secondary text-start">
                           Reúne os leilões finalizados.
                        </p>
                     </div>
                     <div>
                        <p className="text-black font-normal text-start">Status</p>
                        <p className="text-text-secondary text-start">
                           A cor cinza indica lotes com transações em progresso. A
                           cor vermelha indica lotes com transações que precisam ser
                           revisadas. A cor verde indica lotes que necessitam
                           intervenção manual para a continuidade do processo
                           automático.
                        </p>
                     </div>
                     <div className="bg-[#E6F1F7] px-4 py-4 space-y-2">
                        <p className="text-black font-normal text-start">Info</p>
                        <p className="text-text-secondary text-start">
                           Clique no card para acessar o leilão.
                        </p>
                        <p className="text-text-secondary text-start">
                           Passe o ponteiro do mouse na cor do status para visualizar
                           a quantidade de lotes por transação.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
      </React.Fragment>
   )
}

type AuctionMaintenanceProps = {
   data: any[]
   columns: ColumnDef<any>[]
}

export default AuctionMaintenance
