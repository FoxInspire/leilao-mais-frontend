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
import { AuctionLot } from '@/src/types/entities/auction.entity'
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
   countries: SelectInputValue[]
   data: any[]
   columns: ColumnDef<AuctionLot>[]
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
   countries,
   columns,
   data
}: InsertLotsProps) => {
   const router = useRouter()

   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   const form = useForm<z.infer<typeof searchLotsSchema>>({
      resolver: zodResolver(searchLotsSchema),
      defaultValues: {
         yardId: '',
         daysUntilAuction: 0,
         daysInYard: 0,
         lotType: 'NEW',
         lotsQuantity: 0,
         grv: ''
      }
   })

   const onSubmit: SubmitHandler<z.infer<typeof searchLotsSchema>> = async (
      data
   ) => {
      try {
         const isValid = await form.trigger()

         if (!isValid) {
            toast.error(
               'Por favor, preencha todos os campos obrigatórios corretamente.'
            )
            return
         }

         console.log('data', data)

         //  router.push(pre_auction_routes.create_auction_success('BRU01.23')) // replace with auctionCode from API response
      } catch (error) {
         console.error('Erro ao enviar formulário:', error)
         toast.error('Erro ao enviar formulário. Tente novamente.')
      }
   }

   const [query, setQuery] = useQueryStates(
      {
         step: parseAsString.withDefault(Step.STEP1),
         lotType: parseAsString.withDefault(LotType.NEW)
      },
      { history: 'push', clearOnDefault: false, scroll: false }
   )

   const [globalFilter, setGlobalFilter] = React.useState('')

   const transformed_data = React.useMemo(() => {
      return data.flatMap((auction) => {
         if (!auction.AuctionLot?.length) return []

         return auction.AuctionLot.map((lot: AuctionLot) => ({
            ...auction,
            AuctionLot: [lot],
            lotNumber: lot.lotNumber,
            process: auction.auctionCode,
            plate: lot.Vehicle?.plate,
            chassis: lot.Vehicle?.chassis,
            brand: lot.Vehicle?.brand?.name,
            model: lot.Vehicle?.model?.name,
            type: lot.Vehicle?.type?.name
         }))
      })
   }, [data])

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
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="grid w-full max-h-[calc(100vh-12.5125rem)]"
                  >
                     <div className="grid w-full h-[calc(100vh-16.8125rem)] grid-rows-[auto_1fr] gap-6">
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
                                    control={form.control}
                                    name="yardId"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Pátios *"
                                                options={countries}
                                                placeholder="Selecione os pátios"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="daysUntilAuction"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Input
                                                label="Nº dias para Leilão *"
                                                placeholder="0000000000"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="daysInYard"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Input
                                                label="Nº dias no Pátio *"
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
                                          control={form.control}
                                          name="lotType"
                                          render={({ field }) => (
                                             <FormItem className="space-y-3">
                                                <FormControl>
                                                   <RadioGroup
                                                      onValueChange={(
                                                         value
                                                      ) => {
                                                         field.onChange(value)
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
                                             control={form.control}
                                             name="yardId"
                                             render={({ field }) => (
                                                <FormItem>
                                                   <FormControl>
                                                      <SelectInput
                                                         label="Qtd. Lotes *"
                                                         options={countries}
                                                         placeholder="0000000000"
                                                         {...field}
                                                      />
                                                   </FormControl>
                                                   <FormMessage />
                                                </FormItem>
                                             )}
                                          />
                                          <FormField
                                             control={form.control}
                                             name="daysUntilAuction"
                                             render={({ field }) => (
                                                <FormItem>
                                                   <FormControl>
                                                      <Input
                                                         label="GRV *"
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
                                    {query.lotType === LotType.REUSABLE && (
                                       <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-center gap-4">
                                          <FormField
                                             control={form.control}
                                             name="yardId"
                                             render={({ field }) => (
                                                <FormItem>
                                                   <FormControl>
                                                      <SelectInput
                                                         label="Qtd. Leilões *"
                                                         options={countries}
                                                         placeholder="Selecione os leilões"
                                                         {...field}
                                                      />
                                                   </FormControl>
                                                   <FormMessage />
                                                </FormItem>
                                             )}
                                          />
                                          <FormField
                                             control={form.control}
                                             name="daysUntilAuction"
                                             render={({ field }) => (
                                                <FormItem>
                                                   <FormControl>
                                                      <Input
                                                         label="Status do Lote *"
                                                         placeholder="Selecione o status"
                                                         {...field}
                                                      />
                                                   </FormControl>
                                                   <FormMessage />
                                                </FormItem>
                                             )}
                                          />
                                          <FormField
                                             control={form.control}
                                             name="daysUntilAuction"
                                             render={({ field }) => (
                                                <FormItem>
                                                   <FormControl>
                                                      <Input
                                                         label="GRV *"
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
                              data={transformed_data}
                              columns={columns}
                              globalFilter={globalFilter}
                           />
                        </div>
                     </div>
                  </form>
                  <div className="flex flex-1 justify-end items-center">
                     <Button
                        type="submit"
                        className="w-fit"
                        onClick={form.handleSubmit(onSubmit)}
                     >
                        Concluir
                     </Button>
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

const insertLotsSchema = z.object({
   auctionId: z.string({
      required_error: 'ID do leilão é obrigatório',
      invalid_type_error: 'ID do leilão deve ser uma string'
   }),
   lotId: z.string({
      required_error: 'ID do lote é obrigatório',
      invalid_type_error: 'ID do lote deve ser uma string'
   })
})

const searchLotsSchema = z.object({
   yardId: z.string({
      required_error: 'Pátio é obrigatório',
      invalid_type_error: 'Pátio deve ser uma string'
   }),
   daysUntilAuction: z.coerce
      .number({
         required_error: 'Número de dias para leilão é obrigatório',
         invalid_type_error: 'Número de dias para leilão deve ser um número'
      })
      .min(0, { message: 'Número de dias para leilão deve ser maior que 0' }),
   daysInYard: z.coerce
      .number({
         required_error: 'Número de dias no pátio é obrigatório',
         invalid_type_error: 'Número de dias no pátio deve ser um número'
      })
      .min(0, { message: 'Número de dias no pátio deve ser maior que 0' }),
   lotType: z.enum(['NEW', 'REUSABLE'], {
      required_error: 'Tipo de lote é obrigatório',
      invalid_type_error: 'Tipo de lote inválido'
   }),
   lotsQuantity: z.coerce
      .number({
         required_error: 'Quantidade de lotes é obrigatória',
         invalid_type_error: 'Quantidade de lotes deve ser um número'
      })
      .min(1, { message: 'Quantidade de lotes deve ser maior que 0' }),
   grv: z
      .string({
         required_error: 'GRV é obrigatório',
         invalid_type_error: 'GRV deve ser uma string'
      })
      .regex(/^\d+$/, { message: 'GRV deve conter apenas números' })
      .optional()
})
