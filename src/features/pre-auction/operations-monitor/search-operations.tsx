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
   const [globalFilter, setGlobalFilter] = React.useState('')

   return (
      <React.Fragment>
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
      </React.Fragment>
   )
}
