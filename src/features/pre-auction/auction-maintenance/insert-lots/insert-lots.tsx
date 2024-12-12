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
   FormLabel,
   FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { Input } from '@/src/components/ui/input'
import { SelectInput, SelectInputValue } from '@/src/components/ui/select'
import { Separator } from '@/src/components/ui/separator'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { AvaliableLotEntity } from '@/src/types/entities/avaliable-lot.entity'
import { isoDateRegex } from '@/src/utils/date-iso-regex'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { parseAsString, useQueryStates } from 'nuqs'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { TableInsertLots } from './components/data-table'

interface InsertLotsProps {
   id: string
   data: any[]
   columns: ColumnDef<AvaliableLotEntity>[]
}

export enum Step {
   STEP1 = 'step1',
   STEP2 = 'step2',
   STEP3 = 'step3'
}

export enum LotType {
   NEW = 'new',
   REUSABLE = 'reusable'
}

export const InsertLots: React.FC<InsertLotsProps> = ({
   id,
   columns,
   data
}: InsertLotsProps) => {
   const router = useRouter()

   const [selectedRows, setSelectedRows] = React.useState<AvaliableLotEntity[]>(
      []
   )
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [globalFilter, setGlobalFilter] = React.useState('')
   const [query, setQuery] = useQueryStates(
      {
         step: parseAsString.withDefault(Step.STEP1),
         lotType: parseAsString.withDefault(LotType.NEW)
      },
      { history: 'push', clearOnDefault: false, scroll: false }
   )

   const filterForm = useForm<z.infer<typeof avaliableLotsFilters>>({
      resolver: zodResolver(avaliableLotsFilters),
      defaultValues: {
         auctionId: '',
         userId: '',
         pageNumber: undefined,
         pagesLimit: undefined,
         createdAt: '',
         patioId: '',
         daysForAuction: undefined,
         daysInPatio: undefined,
         grvCode: '',
         type: 'new'
      }
   })

   const onSubmitFilters: SubmitHandler<
      z.infer<typeof avaliableLotsFilters>
   > = async (data) => {
      try {
         const filterConditions = {
            patioId: (lot: AvaliableLotEntity) =>
               !data.patioId || lot.id === data.patioId,
            grvCode: (lot: AvaliableLotEntity) =>
               !data.grvCode ||
               lot.grvCode.toLowerCase().includes(data.grvCode.toLowerCase()),
            type: (lot: AvaliableLotEntity) =>
               !data.type ||
               (data.type === 'reusable'
                  ? lot.previousAuction !== undefined
                  : lot.previousAuction === undefined)
         }

         const tableFilter = JSON.stringify({
            filterConditions,
            rawFilters: data
         })

         setGlobalFilter(tableFilter)
      } catch (error) {
         console.error('Erro ao aplicar filtros:', error)
         toast.error('Erro ao aplicar filtros. Tente novamente.')
      }
   }

   const [isLoading, setIsLoading] = React.useState(false)

   const form = useForm<z.infer<typeof insertLotsSchema>>({
      resolver: zodResolver(insertLotsSchema),
      defaultValues: {
         auctionId: id,
         lotId: []
      }
   })

   React.useEffect(() => {
      if (selectedRows.length) {
         form.setValue(
            'lotId',
            selectedRows.map((row) => String(row.id))
         )
      }
   }, [selectedRows])

   const onSubmitInsertLots: SubmitHandler<
      z.infer<typeof insertLotsSchema>
   > = async (data) => {
      try {
         setIsLoading(true)
         // Mock implementation
         for (const lotId of data.lotId) {
            // Show loading toast for each lot
            const loadingToast = toast.loading(`Processando lote ${lotId}...`)

            // Random delay between 1-3 seconds
            await new Promise((resolve) =>
               setTimeout(resolve, Math.random() * 2000 + 1000)
            )

            // Success toast for each lot
            toast.dismiss(loadingToast)
            toast.success(`Lote ${lotId} processado com sucesso!`)
         }

         router.push(pre_auction_routes.insert_lots_success(id))

         /* Original implementation for API integration
         for (const lotId of data.lotId) {
            await fetch('/lot', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                  auctionId: data.auctionId,
                  lotId: lotId
               })
            })
         }
         router.push(pre_auction_routes.insert_lots_success(id))
         */
      } catch (error) {
         console.error('Erro ao enviar formulário:', error)
         toast.error('Erro ao enviar formulário. Tente novamente.')
      } finally {
         setIsLoading(false)
      }
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
                  <div className="flex flex-wrap justify-between items-center gap-2">
                     <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
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
               <Form {...filterForm}>
                  <div className="space-y-6">
                     <form onSubmit={filterForm.handleSubmit(onSubmitFilters)}>
                        <div className="grid w-full min-h-[calc(100vh-16.8125rem)] grid-rows-[auto_1fr] gap-6">
                           <div id="filters" className="space-y-6">
                              <Card className="h-fit flex items-center justify-between space-y-0">
                                 <p className="text-black dark:text-dark-text-primary font-semibold text-start text-base font-nunito ">
                                    Informação do leilão
                                 </p>
                                 <h3 className="lg:text-lg text-base font-nunito font-semibold">
                                    {id} -{' '}
                                    {format(new Date(), 'dd MMM yyyy', {
                                       locale: ptBR
                                    })}
                                 </h3>
                              </Card>
                              <div>
                                 <div className="flex items-center gap-2">
                                    <span
                                       className={cn(
                                          'font-semibold h-6 w-6 rounded-xl bg-action-disabled/35 dark:bg-dark-action-disabled/35 text-white flex items-center justify-center',
                                          'bg-primary-default dark:bg-dark-primary-default'
                                       )}
                                    >
                                       <span className="text-sm font-roboto font-normal">
                                          1
                                       </span>
                                    </span>
                                    <span
                                       className={cn(
                                          'whitespace-nowrap transition-all duration-300 text-xl text-black font-semibold font-montserrat'
                                       )}
                                    >
                                       Ingressar lotes
                                    </span>
                                 </div>
                              </div>
                              <div className="space-y-6">
                                 <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                    <FormField
                                       control={filterForm.control}
                                       name="auctionId"
                                       render={({ field }) => (
                                          <FormItem>
                                             <FormControl>
                                                <SelectInput
                                                   label="Leilão"
                                                   placeholder="Selecione o leilão"
                                                   onValueChange={(
                                                      value: SelectInputValue
                                                   ) => {
                                                      filterForm.setValue(
                                                         'auctionId',
                                                         value.value
                                                      )
                                                   }}
                                                   options={[
                                                      {
                                                         id: '1',
                                                         label: 'Pátio 1',
                                                         value: '1'
                                                      },
                                                      {
                                                         id: '2',
                                                         label: 'Pátio 2',
                                                         value: '2'
                                                      },
                                                      {
                                                         id: '3',
                                                         label: 'Pátio 3',
                                                         value: '3'
                                                      }
                                                   ]}
                                                   {...field}
                                                />
                                             </FormControl>
                                             <FormMessage />
                                          </FormItem>
                                       )}
                                    />
                                    <FormField
                                       control={filterForm.control}
                                       name="daysForAuction"
                                       render={({ field }) => (
                                          <FormItem>
                                             <FormControl>
                                                <Input
                                                   label="Nº dias para Leilão"
                                                   placeholder="0000000000"
                                                   {...field}
                                                />
                                             </FormControl>
                                             <FormMessage />
                                          </FormItem>
                                       )}
                                    />
                                    <FormField
                                       control={filterForm.control}
                                       name="daysInPatio"
                                       render={({ field }) => (
                                          <FormItem>
                                             <FormControl>
                                                <Input
                                                   label="Nº dias no Pátio"
                                                   placeholder="0000000000"
                                                   {...field}
                                                />
                                             </FormControl>
                                             <FormMessage />
                                          </FormItem>
                                       )}
                                    />
                                 </div>
                                 <div className="space-y-4">
                                    <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                                       Lista de lotes
                                    </p>
                                    <div className="space-y-6">
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
                                          <FormField
                                             control={filterForm.control}
                                             name="type"
                                             render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                   <FormControl>
                                                      <RadioGroup
                                                         onValueChange={(
                                                            value
                                                         ) => {
                                                            field.onChange(
                                                               value
                                                            )
                                                            setQuery({
                                                               lotType: value
                                                            })
                                                         }}
                                                         defaultValue={
                                                            query.lotType ||
                                                            field.value
                                                         }
                                                         className="flex gap-6 items-center"
                                                      >
                                                         <FormItem className="flex items-center space-x-2 space-y-0">
                                                            <FormControl>
                                                               <RadioGroupItem
                                                                  value={
                                                                     LotType.NEW
                                                                  }
                                                               />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                               Lotes novos
                                                            </FormLabel>
                                                         </FormItem>
                                                         <FormItem className="flex items-center space-x-2 space-y-0">
                                                            <FormControl>
                                                               <RadioGroupItem
                                                                  value={
                                                                     LotType.REUSABLE
                                                                  }
                                                               />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                               Lotes
                                                               reaproveitáveis
                                                            </FormLabel>
                                                         </FormItem>
                                                      </RadioGroup>
                                                   </FormControl>
                                                   <FormMessage />
                                                </FormItem>
                                             )}
                                          />
                                       </div>
                                       {query.lotType === LotType.NEW && (
                                          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] items-center gap-4">
                                             <FormField
                                                control={filterForm.control}
                                                name="pagesLimit"
                                                render={({ field }) => (
                                                   <FormItem>
                                                      <FormControl>
                                                         <Input
                                                            label="Qtd. Lotes"
                                                            placeholder="0000000000"
                                                            {...field}
                                                         />
                                                      </FormControl>
                                                      <FormMessage />
                                                   </FormItem>
                                                )}
                                             />
                                             <FormField
                                                control={filterForm.control}
                                                name="grvCode"
                                                render={({ field }) => (
                                                   <FormItem>
                                                      <FormControl>
                                                         <Input
                                                            label="GRV"
                                                            placeholder="0000000000"
                                                            {...field}
                                                         />
                                                      </FormControl>
                                                      <FormMessage />
                                                   </FormItem>
                                                )}
                                             />
                                             <Button
                                                variant="ghost"
                                                onClick={filterForm.handleSubmit(
                                                   onSubmitFilters
                                                )}
                                             >
                                                Buscar
                                             </Button>
                                          </div>
                                       )}
                                       {query.lotType === LotType.REUSABLE && (
                                          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-center gap-4">
                                             <FormField
                                                control={filterForm.control}
                                                name="pagesLimit"
                                                render={({ field }) => (
                                                   <FormItem>
                                                      <FormControl>
                                                         <Input
                                                            label="Qtd. Leilões"
                                                            placeholder="0000000000"
                                                            {...field}
                                                         />
                                                      </FormControl>
                                                      <FormMessage />
                                                   </FormItem>
                                                )}
                                             />
                                             <FormField
                                                control={filterForm.control}
                                                name="lotStatus"
                                                render={({ field }) => (
                                                   <FormItem>
                                                      <FormControl>
                                                         <Input
                                                            label="Status do Lote"
                                                            placeholder="Selecione o status"
                                                            {...field}
                                                         />
                                                      </FormControl>
                                                      <FormMessage />
                                                   </FormItem>
                                                )}
                                             />
                                             <FormField
                                                control={filterForm.control}
                                                name="grvCode"
                                                render={({ field }) => (
                                                   <FormItem>
                                                      <FormControl>
                                                         <Input
                                                            label="GRV"
                                                            placeholder="0000000000"
                                                            {...field}
                                                         />
                                                      </FormControl>
                                                      <FormMessage />
                                                   </FormItem>
                                                )}
                                             />
                                             <Button variant="ghost">
                                                Buscar
                                             </Button>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div id="table" className="min-h-0 overflow-hidden">
                              <TableInsertLots
                                 columns={columns}
                                 data={data}
                                 globalFilter={globalFilter}
                                 onSelectionChange={setSelectedRows}
                              />
                           </div>
                        </div>
                     </form>
                     <div className="flex flex-1 justify-end items-center">
                        <Button
                           type="submit"
                           className="w-fit"
                           loading={isLoading}
                           disabled={selectedRows.length === 0 || isLoading}
                           onClick={() =>
                              form.handleSubmit(onSubmitInsertLots)()
                           }
                        >
                           Concluir
                        </Button>
                     </div>
                  </div>
               </Form>
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
                        A página de Ingressar Lotes permite adicionar veículos
                        ao leilão selecionando um Pátio para a busca, filtrando
                        pelo número de dias desde o recolhimento e definindo o
                        número de dias até o leilão. É possível incluir lotes
                        novos ou reaproveitáveis, buscando itens pelo GRV (Guia
                        de Recolhimento de Veículos).
                     </p>
                     <p className="text-black dark:text-dark-text-primary font-semibold text-start">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Lotes novos
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           São lotes que nunca passaram por um leilão.
                        </p>
                     </div>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Lotes reaproveitáveis
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
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

const insertLotsSchema = z.object({
   auctionId: z.string({
      required_error: 'ID do leilão é obrigatório',
      invalid_type_error: 'ID do leilão deve ser uma string'
   }),
   lotId: z.array(
      z.string({
         required_error: 'ID do lote é obrigatório',
         invalid_type_error: 'ID do lote deve ser uma string'
      })
   )
})

const avaliableLotsFilters = z
   .object({
      pageNumber: z.coerce
         .number({
            invalid_type_error: 'Page number must be a number'
         })
         .optional(),
      pagesLimit: z.coerce
         .number({
            invalid_type_error: 'Pages limit must be a number'
         })
         .optional(),
      createdAt: z
         .string({
            invalid_type_error: 'Created at must be a string'
         })
         .refine((value) => isoDateRegex.test(value), {
            message: 'Created at must be in ISO 8601 format'
         })
         .optional(),
      lotStatus: z
         .string({
            invalid_type_error: 'Lot status must be a string'
         })
         .optional(),
      patioId: z
         .string({
            invalid_type_error: 'Patio id must be a string'
         })
         .optional(),
      daysForAuction: z.coerce
         .number({
            invalid_type_error: 'Days for auction must be a number'
         })
         .optional(),
      daysInPatio: z.coerce
         .number({
            invalid_type_error: 'Days in patio must be a number'
         })
         .optional(),
      grvCode: z
         .string({
            invalid_type_error: 'GRV code must be a string'
         })
         .optional(),
      type: z
         .string({
            invalid_type_error: 'Is in auction must be a string'
         })
         .optional(),
      userId: z.string({
         invalid_type_error: 'User id must be a string',
         required_error: 'User id is required'
      }),
      auctionId: z.string({
         invalid_type_error: 'Auction id must be a string',
         required_error: 'Auction id is required'
      })
   })
   .strict()
