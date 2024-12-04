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

export const CreateAuction: React.FC = () => {
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   const form = useForm<z.infer<typeof createAuctionSchema>>({
      resolver: zodResolver(createAuctionSchema),
      defaultValues: {
         description: '',
         auctionDate: '',
         cep: '',
         address: '',
         addressNumber: '',
         addressComplement: '',
         neighborhood: '',
         addressState: '',
         addressCity: '',
         scheduleDate: '',
         startRemovalDate: '',
         endRemovalDate: '',
         notificationDate: '',
         noticeDate: '',
         notificationEmails: [],
         auctioneerId: '',
         auctionCompanyId: '',
         committeeId: '',
         exhibitorId: '',
         accountRule: '',
         officialPublicationDate: '',
         officialPublicationNumber: '',
         internalMatrixOrder: '',
         internalAuctionOrder: '',
         vehicleObservations: '',
         tenantId: ''
      }
   })

   console.log('form', form.watch())

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
                                 name="address"
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
                                 name="addressNumber"
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
                                 name="addressComplement"
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
                                 name="neighborhood"
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
                                 name="addressState"
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
                                 name="scheduleDate"
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
                                 name="startRemovalDate"
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
                                 name="endRemovalDate"
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
                                 name="noticeDate"
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
                                 name="notificationDate"
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
                                 name="auctioneerId"
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
                                 name="auctionCompanyId"
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
                                 name="committeeId"
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
                           <div className="grid grid-cols-2 gap-4 items-center">
                              <FormField
                                 control={form.control}
                                 name="exhibitorId"
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
                                 name="accountRule"
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
                           <div className="grid grid-cols-1 gap-4">
                              <FormField
                                 control={form.control}
                                 name="notificationEmails"
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
                                          separe por vírgula e pressione{' '}
                                          <strong>Enter</strong>.
                                       </FormDescription>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                     </div>

                     {/* Diário oficial */}
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
                                 name="officialPublicationNumber"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Número D.O. *"
                                             placeholder="0000000000"
                                             type="number"
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

                     {/* Ordem Interna */}
                     <div className="space-y-4">
                        <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                           Ordem Interna
                        </p>
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 items-center gap-4">
                              <FormField
                                 control={form.control}
                                 name="internalMatrixOrder"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Ordem Interna Matriz"
                                             placeholder="0000000000"
                                             type="number"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="internalAuctionOrder"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <Input
                                             label="Ordem Interna Leilão "
                                             placeholder="0000000000"
                                             type="number"
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

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/

const createAuctionSchema = z.object({
   description: z.string().min(1, { message: 'Descrição é obrigatória' }),
   auctionDate: z
      .string()
      .min(1, { message: 'Data do leilão é obrigatória' })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Data do leilão deve estar em formato ISO 8601'
      }),

   cep: z
      .string()
      .min(1, { message: 'CEP é obrigatório' })
      .regex(/^\d{5}-?\d{3}$/, {
         message: 'CEP deve estar no formato 00000-000'
      }),
   address: z.string().min(1, { message: 'Endereço é obrigatório' }),
   addressNumber: z
      .string()
      .min(1, { message: 'Número é obrigatório' })
      .regex(/^\d+$/, { message: 'Número deve conter apenas dígitos' }),
   addressComplement: z.string().optional(),
   neighborhood: z.string().min(1, { message: 'Bairro é obrigatório' }),
   addressState: z.string().min(1, { message: 'Estado é obrigatório' }),
   addressCity: z.string().min(1, { message: 'Cidade é obrigatória' }),

   scheduleDate: z
      .string()
      .min(1, { message: 'Data de agendamento é obrigatória' })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Data deve estar em formato ISO 8601'
      }),
   startRemovalDate: z
      .string()
      .min(1, { message: 'Data de início da retirada é obrigatória' })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Data deve estar em formato ISO 8601'
      }),
   endRemovalDate: z
      .string()
      .min(1, { message: 'Data final da retirada é obrigatória' })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Data deve estar em formato ISO 8601'
      }),
   notificationDate: z
      .string()
      .min(1, { message: 'Data de notificação é obrigatória' })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Data deve estar em formato ISO 8601'
      }),
   noticeDate: z
      .string()
      .min(1, { message: 'Data do edital é obrigatória' })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Data deve estar em formato ISO 8601'
      }),

   auctioneerId: z.string().min(1, { message: 'Leiloeiro é obrigatório' }),
   auctionCompanyId: z.string().min(1, { message: 'Empresa é obrigatória' }),
   committeeId: z.string().min(1, { message: 'Comitente é obrigatório' }),
   exhibitorId: z.string().min(1, { message: 'Expositor é obrigatório' }),
   accountRule: z
      .string()
      .min(1, { message: 'Regra de prestação de contas é obrigatória' }),

   notificationEmails: z
      .array(z.string().email({ message: 'E-mail inválido' }))
      .min(1, { message: 'Pelo menos um e-mail é obrigatório' }),

   officialPublicationDate: z
      .string()
      .min(1, { message: 'Data de publicação oficial é obrigatória' })
      .refine((value) => isoDateRegex.test(value), {
         message: 'Data deve estar em formato ISO 8601'
      }),
   officialPublicationNumber: z
      .string()
      .min(1, { message: 'Número de publicação oficial é obrigatório' })
      .regex(/^\d+$/, { message: 'Número deve conter apenas dígitos' }),

   internalMatrixOrder: z
      .string()
      .regex(/^\d+$/, {
         message: 'Ordem interna matriz deve conter apenas dígitos'
      })
      .optional(),
   internalAuctionOrder: z
      .string()
      .regex(/^\d+$/, {
         message: 'Ordem interna leilão deve conter apenas dígitos'
      })
      .optional(),
   vehicleObservations: z.string().optional(),

   tenantId: z.string().min(1, { message: 'ID do tenant é obrigatório' })
})
