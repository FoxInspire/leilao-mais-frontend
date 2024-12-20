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
import { DataTable } from '@/src/components/ui/data-table'
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { ColumnDef } from '@tanstack/react-table'

import Link from 'next/link'

interface PostAuctionProps {
   data: AuctionEntity[]
   columns: ColumnDef<AuctionEntity>[]
}

const PostAuction: React.FC<PostAuctionProps> = ({
   columns,
   data
}: PostAuctionProps) => {
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [globalFilter, setGlobalFilter] = React.useState('')

   return (
      <React.Fragment>
         <div className="grid grid-cols-[1fr_auto]">
            <div className="flex h-full flex-col space-y-6">
               <div className="space-y-4">
                  <Breadcrumb>
                     <BreadcrumbList>
                        <BreadcrumbItem>
                           <BreadcrumbLink>Pós-leilão</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                           <BreadcrumbPage>Leilões</BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
                           Pós-leilão
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
                  <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                     <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center">
                        <Input
                           label="Busca geral"
                           value={globalFilter}
                           placeholder="Descrição, Local, ID"
                           onChange={(e) => setGlobalFilter(e.target.value)}
                           className="min-w-[300px]"
                        />
                     </div>
                     <Link
                        href={pre_auction_routes.auction.create}
                        prefetch={false}
                     >
                        <Button
                           variant="default"
                           className="w-full whitespace-nowrap sm:w-auto sm:min-w-[150px]"
                        >
                           Novo leilão
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="grid max-h-[calc(100vh-12.4125rem)] w-full overflow-scroll">
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
               <div className="ml-4 mt-[28px] h-full space-y-2 overflow-y-auto">
                  <div className="flex items-center justify-between gap-2">
                     <h1 className="font-montserrat text-2xl font-semibold">
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
                  <div className="max-h-[calc(100vh-12rem)] space-y-4 overflow-y-auto px-4 py-6">
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Descrição
                     </p>
                     <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                        A página de Manutenção de Leilões permite visualizar a
                        lista de leilões cadastrados, alterar o status conforme
                        o andamento dos processos junto ao DETRAN e buscar
                        informações específicas. Além disso, é possível
                        ingressar lotes nos leilões e acessar um menu de opções
                        avançadas para uma gestão mais detalhada.
                     </p>
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Status do leilão
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           É possível alterar o status conforme o avanço dos
                           processos junto ao DETRAN.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Lotes
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Exibe a quantidade de lotes ingressados no leilão.
                        </p>
                     </div>
                     <div className="space-y-2 rounded-md bg-[#E6F1F7] px-4 py-4">
                        <p className="text-start font-normal text-black">
                           Info
                        </p>
                        <p className="text-start text-text-secondary">
                           Clique no card para acessar o leilão.
                        </p>
                        <p className="text-start text-text-secondary">
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

export default PostAuction