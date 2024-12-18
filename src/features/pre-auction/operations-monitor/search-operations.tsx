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
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage
} from '@/components/ui/form'
import { OperationsMonitorIllustation } from '@/src/components/svgs/operations-monitor'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { SelectInput, SelectInputValue } from '@/src/components/ui/select'
import { Separator } from '@/src/components/ui/separator'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface SearchOperationsProps {
   auctions: AuctionEntity[]
}

const searchOperationsSchema = z.object({
   auctionCode: z
      .string()
      .min(1, { message: 'Selecione um leilão para continuar' })
})

export const SearchOperations: React.FC<SearchOperationsProps> = ({
   auctions
}: SearchOperationsProps) => {
   const router = useRouter()
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   const form = useForm<z.infer<typeof searchOperationsSchema>>({
      resolver: zodResolver(searchOperationsSchema),
      defaultValues: {
         auctionCode: ''
      }
   })

   async function onSubmit(data: z.infer<typeof searchOperationsSchema>) {
      router.push(pre_auction_routes.operations.details(data.auctionCode))
   }

   return (
      <React.Fragment>
         <div className="grid h-[calc(100vh-6.5rem)] grid-cols-[1fr_auto] overflow-hidden">
            <div className="max-h-svh">
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
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
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
               <div className="grid h-[calc(100vh-12.4125rem)] w-full place-items-center">
                  <div className="max-w-xl space-y-6">
                     <OperationsMonitorIllustation className="mx-auto h-52" />
                     <h3 className="text-center font-montserrat text-2xl font-semibold">
                        Selecione um leilão para carregar lista de lotes
                     </h3>
                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className="space-y-6"
                        >
                           <FormField
                              control={form.control}
                              name="auctionCode"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormControl>
                                       <SelectInput
                                          label="Leilão"
                                          placeholder="Selecione o leilão"
                                          onValueChange={(value) => {
                                             form.setValue(
                                                'auctionCode',
                                                (value as SelectInputValue)
                                                   .value
                                             )
                                          }}
                                          options={
                                             auctions?.map((auction) => ({
                                                id: auction.id,
                                                label: auction.auctionCode,
                                                value: auction.auctionCode
                                             })) || []
                                          }
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <Button type="submit" className="w-full">
                              Continuar
                           </Button>
                        </form>
                     </Form>
                  </div>
               </div>
            </div>
            <CollapsibleSidebar
               open={isSidebarOpen}
               onOpenChange={setIsSidebarOpen}
               className="h-[calc(100vh-1.5rem-56px)]"
            >
               <div className="h-full space-y-2 overflow-y-auto md:ml-4">
                  <div className="mt-9 flex items-center justify-between gap-2">
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
                  <div className="max-h-[calc(100vh-12rem)] space-y-4 overflow-y-auto py-6 md:px-4">
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Descrição
                     </p>
                     <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                        A página de Monitor de Operações permite acompanhar em
                        tempo real as transações dos lotes em um leilão ativo
                        junto ao DETRAN. O usuário pode alterar o status do lote
                        conforme o retorno do órgão, consultar informações do
                        veículo, agendar, cancelar ou reiniciar transações e
                        monitorar mensagens e notificações relevantes para cada
                        lote.
                     </p>
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Status do lote
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           É possível alterar o status conforme o avanço dos
                           processos junto ao DETRAN.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Transação
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Operações e processos necessários ao lote junto ao
                           DETRAN. A cor verde indica sucesso
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Agendado
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Exibe o ícone quando a transação do lote for
                           agendada.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Consultas
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
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
