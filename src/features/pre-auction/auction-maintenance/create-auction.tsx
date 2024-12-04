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
   FormDescription,
   FormField,
   FormItem,
   FormMessage
} from '@/components/ui/form'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { Input } from '@/src/components/ui/input'
import { SelectInput } from '@/src/components/ui/select'
import { Separator } from '@/src/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/

const createAuctionSchema = z.object({
   description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
   }),
   auctionDate: z
      .string({
         required_error: 'Auction date is required',
         invalid_type_error: 'Auction date must be a string'
      })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Auction date must be in ISO 8601 format'
      }),
   cep: z.string({
      required_error: 'CEP is required',
      invalid_type_error: 'CEP must be a string'
   }),
   address: z.string({
      required_error: 'Address is required',
      invalid_type_error: 'Address must be a string'
   }),
   addressNumber: z.string({
      required_error: 'Address number is required',
      invalid_type_error: 'Address number must be a string'
   }),
   addressComplement: z
      .string({
         invalid_type_error: 'Address complement must be a string'
      })
      .optional(),
   neighborhood: z.string({
      required_error: 'Neighborhood is required',
      invalid_type_error: 'Neighborhood must be a string'
   }),
   addressState: z.string({
      required_error: 'Address state is required',
      invalid_type_error: 'Address state must be a string'
   }),
   addressCity: z.string({
      required_error: 'Address city is required',
      invalid_type_error: 'Address city must be a string'
   }),
   scheduleDate: z
      .string({
         required_error: 'Schedule date is required',
         invalid_type_error: 'Schedule date must be a string'
      })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Schedule date must be in ISO 8601 format'
      }),
   startRemovalDate: z
      .string({
         required_error: 'Start removal date is required',
         invalid_type_error: 'Start removal date must be a string'
      })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Start removal date must be in ISO 8601 format'
      }),
   endRemovalDate: z
      .string({
         required_error: 'End removal date is required',
         invalid_type_error: 'End removal date must be a string'
      })
      .refine((value) => isoDateRegex.test(value), {
         message: 'End removal date must be in ISO 8601 format'
      }),
   notificationDate: z
      .string({
         required_error: 'Notification date is required',
         invalid_type_error: 'Notification date must be a string'
      })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Notification date must be in ISO 8601 format'
      }),
   noticeDate: z
      .string({
         required_error: 'Notice date is required',
         invalid_type_error: 'Notice date must be a string'
      })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Notice date must be in ISO 8601 format'
      }),
   notificationEmails: z.array(
      z.string({
         required_error: 'Notification email is required',
         invalid_type_error: 'Notification email must be a string'
      })
   ),
   auctioneerId: z.string({
      required_error: 'Auctioneer ID is required',
      invalid_type_error: 'Auctioneer ID must be a string'
   }),
   auctionCompanyId: z.string({
      required_error: 'Auction company ID is required',
      invalid_type_error: 'Auction company ID must be a string'
   }),
   committeeId: z.string({
      required_error: 'Committee ID is required',
      invalid_type_error: 'Committee ID must be a string'
   }),
   exhibitorId: z.string({
      required_error: 'Exhibitor ID is required',
      invalid_type_error: 'Exhibitor ID must be a string'
   }),
   accountRule: z.string({
      required_error: 'Account rule is required',
      invalid_type_error: 'Account rule must be a string'
   }),
   officialPublicationDate: z
      .string({
         required_error: 'Official publication date is required',
         invalid_type_error: 'Official publication date must be a string'
      })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Official publication date must be in ISO 8601 format'
      }),
   officialPublicationNumber: z.string({
      required_error: 'Official publication number is required',
      invalid_type_error: 'Official publication number must be a string'
   }),
   internalMatrixOrder: z
      .string({
         invalid_type_error: 'Internal matrix order must be a string'
      })
      .optional(),
   internalAuctionOrder: z
      .string({
         invalid_type_error: 'Internal auction order must be a string'
      })
      .optional(),
   vehicleObservations: z
      .string({
         invalid_type_error: 'Vehicle observations must be a string'
      })
      .optional(),
   tenantId: z.string({
      required_error: 'Tenant ID is required',
      invalid_type_error: 'Tenant ID must be a string'
   })
})

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
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-6"
                  >
                     {/* Dados do leilão */}
                     <div className="space-y-4">
                        <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                           Dados do leilão
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                           <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormControl>
                                       <Input
                                          label="Descrição *"
                                          placeholder="Digite a descrição"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="auctionDate"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormControl>
                                       <Input
                                          label="Data e hora do leilão *"
                                          placeholder="DD/MM/YYYY hh:mm aa"
                                          type="datetime-local"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>

                     {/* Localização */}
                     <div className="space-y-4">
                        <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                           Localização
                        </p>
                        <div className="space-y-6">
                           <div className="flex gap-2">
                              <FormField
                                 control={form.control}
                                 name="cep"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="CEP *"
                                             placeholder="00000-000"
                                             type="number"
                                             className="min-w-[172px]"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <Button variant="ghost" type="button">
                                 Buscar
                              </Button>
                           </div>
                           <div className="grid grid-cols-[0.6fr_0.2fr_0.2fr] gap-4">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Endereço *"
                                             placeholder="Digite o endereço"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Número *"
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
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Complemento"
                                             placeholder="Digite o complemento"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="grid grid-cols-3 gap-4 items-center">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Bairro *"
                                             placeholder="Digite o bairro"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="UF *"
                                             options={[]}
                                             placeholder="Selecione o estado"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="addressCity"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Município *"
                                             placeholder="Digite o município"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                     </div>

                     {/* Datas gerais */}
                     <div className="space-y-4">
                        <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                           Datas gerais
                        </p>
                        <div className="space-y-6">
                           <div className="grid grid-cols-[0.6fr_0.2fr_0.2fr] gap-4">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Agendamento *"
                                             placeholder="DD/MM/YYYY"
                                             type="date"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Início da Retirada *"
                                             placeholder="DD/MM/YYYY"
                                             type="date"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Fim da Retirada *"
                                             placeholder="DD/MM/YYYY"
                                             type="date"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="grid grid-cols-2 gap-4 items-center">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Edital do Leilão *"
                                             placeholder="DD/MM/YYYY"
                                             type="date"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Notificação *"
                                             placeholder="DD/MM/YYYY"
                                             type="date"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                     </div>

                     {/* Dados complementares */}
                     <div className="space-y-4">
                        <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                           Dados complementares
                        </p>
                        <div className="space-y-6">
                           <div className="grid grid-cols-3 gap-4">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Leiloeiro *"
                                             placeholder="Selecione o leiloeiro"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Empresa *"
                                             placeholder="Selecione a empresa"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Comitente *"
                                             placeholder="Selecione o comitente"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="grid grid-cols-3 gap-4 items-center">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Expositor *"
                                             placeholder="Selecione o expositor"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="ID de Leilão *"
                                             placeholder="Digite o ID de leilão"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Regra Prestação de Contas *"
                                             placeholder="Selecione a regra"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                     </div>

                     {/* E-mail para Notificação */}
                     <div className="space-y-4">
                        <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                           E-mail para Notificação
                        </p>
                        <div className="space-y-6">
                           <div className="grid grid-cols-3 gap-4">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="E-mail *"
                                             placeholder="Digite o e-mail"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormDescription>
                                          Para adicionar mais de um e-mail,
                                          separe por vírgula.
                                       </FormDescription>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Empresa *"
                                             placeholder="Selecione a empresa"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Comitente *"
                                             placeholder="Selecione o comitente"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="grid grid-cols-3 gap-4 items-center">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Expositor *"
                                             placeholder="Selecione o expositor"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="ID de Leilão *"
                                             placeholder="Digite o ID de leilão"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Regra Prestação de Contas *"
                                             placeholder="Selecione a regra"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                           Diário oficial
                        </p>
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 items-center gap-4">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Data da Publicação D.O. *"
                                             placeholder="DD/MM/YYYY"
                                             type="date"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Empresa *"
                                             placeholder="Selecione a empresa"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="grid grid-cols-3 gap-4 items-center">
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Expositor *"
                                             placeholder="Selecione o expositor"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="ID de Leilão *"
                                             placeholder="Digite o ID de leilão"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="auctionDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <SelectInput
                                             label="Regra Prestação de Contas *"
                                             placeholder="Selecione a regra"
                                             options={[]}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                     </div>

                     <Button type="submit" className="w-full">
                        Continuar
                     </Button>
                  </form>
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
