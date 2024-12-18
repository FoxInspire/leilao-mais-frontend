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
import { DatePicker } from '@/src/components/ui/date-picker'
import { Input } from '@/src/components/ui/input'
import { SelectInput, SelectInputValue } from '@/src/components/ui/select'
import { Separator } from '@/src/components/ui/separator'
import { useZipCode } from '@/src/hooks/useZipCode'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { ZIP_CODE_MASK, isValidEmail, isValidZipCode } from '@/src/utils/masks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface UpdateAuctionProps {
   id: string
   countries: SelectInputValue[]
   defaultValues: z.infer<typeof updateAuctionSchema>
}

export const UpdateAuction: React.FC<UpdateAuctionProps> = ({
   id,
   countries,
   defaultValues
}: UpdateAuctionProps) => {
   const router = useRouter()

   const { handleZipCode } = useZipCode()

   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [emailTemp, setEmailTemp] = React.useState('')

   const form = useForm<z.infer<typeof updateAuctionSchema>>({
      resolver: zodResolver(updateAuctionSchema),
      defaultValues: defaultValues
   })

   const onSubmit: SubmitHandler<z.infer<typeof updateAuctionSchema>> = async (
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

         router.push(pre_auction_routes.auction.edit_success(id))
      } catch (error) {
         console.error('Erro ao enviar formulário:', error)
         toast.error('Erro ao enviar formulário. Tente novamente.')
      }
   }

   const addEmails = () => {
      try {
         if (emailTemp && emailTemp.trim() !== '') {
            const emails = emailTemp.split(',').map((email) => email.trim())

            const validEmails = []
            const invalidEmails = []
            const duplicatedEmails = []

            for (const email of emails) {
               if (email !== '') {
                  if (isValidEmail(email)) {
                     if (
                        !form.getValues('notificationEmails')?.includes(email)
                     ) {
                        validEmails.push(email)
                     } else {
                        duplicatedEmails.push(email)
                     }
                  } else {
                     invalidEmails.push(email)
                  }
               }
            }

            if (invalidEmails.length > 0) {
               toast.error(`E-mails inválidos: ${invalidEmails.join(', ')}`, {
                  duration: 4000,
                  position: 'top-right'
               })
            }

            if (duplicatedEmails.length > 0) {
               toast.error(
                  `E-mails duplicados: ${duplicatedEmails.join(', ')}`,
                  {
                     duration: 4000,
                     position: 'top-right'
                  }
               )
            }

            if (validEmails.length > 0) {
               form.setValue('notificationEmails', [
                  ...(form.getValues('notificationEmails') || []),
                  ...validEmails
               ])

               toast.success(
                  `E-mail${validEmails.length > 1 ? 's' : ''} adicionado${
                     validEmails.length > 1 ? 's' : ''
                  } com sucesso: ${validEmails.join(', ')}`,
                  {
                     duration: 4000,
                     position: 'top-right'
                  }
               )
            }

            setEmailTemp('')
         }
      } catch (error) {
         console.error('Erro ao adicionar emails:', error)
         toast.error('Erro ao adicionar e-mails. Tente novamente.')
      }
   }

   const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         addEmails()
      }
   }

   const removeEmail = (indexToRemove: number) => {
      const currentEmails = form.getValues('notificationEmails')
      form.setValue(
         'notificationEmails',
         currentEmails?.filter((_, index) => index !== indexToRemove) || []
      )
      toast.success(
         `E-mail removido com sucesso: ${currentEmails?.[indexToRemove]}`
      )
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
                     <BreadcrumbPage>Editar leilão</BreadcrumbPage>
                  </BreadcrumbList>
               </Breadcrumb>
               <div className="space-y-2">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                     <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
                        Editar leilão {id}
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
                     className="grid w-full overflow-x-visible overflow-y-scroll max-h-[calc(100vh-16.8125rem)] hide-scrollbar"
                  >
                     <div className="flex-1 space-y-6 overflow-x-visible overflow-y-scroll">
                        {/* Dados do leilão */}
                        <div className="space-y-4">
                           <p className="text-black dark:text-dark-text-primary font-semibold text-start text-sm">
                              Dados do leilão
                           </p>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
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
                                          <DatePicker
                                             showTime
                                             label="Data e hora do leilão *"
                                             placeholder="DD/MM/YYYY hh:mm aa"
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
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
                                 <FormField
                                    control={form.control}
                                    name="cep"
                                    render={({ field }) => (
                                       <FormItem className="flex-1">
                                          <FormControl>
                                             <Input
                                                label="CEP *"
                                                placeholder="00000-000"
                                                className="w-full md:min-w-[172px]"
                                                mask={ZIP_CODE_MASK}
                                                onInput={(e) => {
                                                   if (
                                                      isValidZipCode(
                                                         e.currentTarget.value
                                                      )
                                                   ) {
                                                      handleZipCode(
                                                         e.currentTarget.value,
                                                         ({
                                                            address,
                                                            city,
                                                            neighborhood,
                                                            state,
                                                            zipCode
                                                         }) => {
                                                            form.setValue(
                                                               'address',
                                                               address
                                                            )
                                                            form.setValue(
                                                               'addressCity',
                                                               city
                                                            )
                                                            form.setValue(
                                                               'neighborhood',
                                                               neighborhood
                                                            )
                                                            form.setValue(
                                                               'addressState',
                                                               state
                                                            )
                                                            form.setValue(
                                                               'cep',
                                                               zipCode
                                                            )
                                                         }
                                                      )
                                                   }
                                                }}
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
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
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center">
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
                                                options={countries}
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
                              <div className="grid grid-cols-1 md:grid-cols-[0.6fr_0.2fr_0.2fr] gap-6 md:gap-4">
                                 <FormField
                                    control={form.control}
                                    name="scheduleDate"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <DatePicker
                                                label="Agendamento *"
                                                placeholder="DD/MM/YYYY"
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
                                             <DatePicker
                                                label="Início da Retirada *"
                                                placeholder="DD/MM/YYYY"
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
                                             <DatePicker
                                                label="Fim da Retirada *"
                                                placeholder="DD/MM/YYYY"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center">
                                 <FormField
                                    control={form.control}
                                    name="noticeDate"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <DatePicker
                                                label="Edital do Leilão *"
                                                placeholder="DD/MM/YYYY"
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
                                             <DatePicker
                                                label="Notificação *"
                                                placeholder="DD/MM/YYYY"
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
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
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
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center">
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
                                             <div className="grid grid-cols-[1fr_auto] items-center gap-2 w-full">
                                                <Input
                                                   label="E-mail *"
                                                   placeholder="Digite o e-mail"
                                                   className="w-full"
                                                   onChange={(e) =>
                                                      setEmailTemp(
                                                         e.currentTarget.value
                                                      )
                                                   }
                                                   value={emailTemp}
                                                   onKeyDown={
                                                      handleEmailKeyDown
                                                   }
                                                />
                                                <Button
                                                   type="button"
                                                   variant="outline"
                                                   size="icon"
                                                   className="w-12 h-12"
                                                   onClick={addEmails}
                                                >
                                                   <span className="material-symbols-outlined">
                                                      add
                                                   </span>
                                                </Button>
                                             </div>
                                          </FormControl>
                                          <FormDescription className="hidden md:block">
                                             Para adicionar mais de um e-mail,
                                             separe por vírgula e pressione{' '}
                                             <kbd className="px-1 py-0.5 rounded-sm bg-gray-100 dark:bg-gray-600 text-xs dark:text-dark-text-primary">
                                                Enter
                                             </kbd>
                                             .
                                          </FormDescription>
                                          <FormDescription className="block md:hidden">
                                             Para adicionar mais de um e-mail,
                                             separe por vírgula e pressione o
                                             botão de adicionar.
                                          </FormDescription>
                                          <div
                                             className={cn(
                                                'flex flex-wrap gap-2',
                                                {
                                                   'mt-2':
                                                      (field.value?.length ||
                                                         0) > 0
                                                }
                                             )}
                                          >
                                             {field.value?.map(
                                                (email, index) => (
                                                   <div
                                                      key={index}
                                                      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded"
                                                   >
                                                      <span className="text-sm">
                                                         {email}
                                                      </span>

                                                      <span
                                                         className="material-symbols-outlined symbol-xs w-4 h-4 hover:text-error-default hover:scale-110 transition-all duration-300 cursor-pointer my-auto mt-0.5"
                                                         onClick={() =>
                                                            removeEmail(index)
                                                         }
                                                      >
                                                         close
                                                      </span>
                                                   </div>
                                                )
                                             )}
                                          </div>
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
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center">
                                 <FormField
                                    control={form.control}
                                    name="officialPublicationDate"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <DatePicker
                                                label="Data da Publicação D.O. *"
                                                placeholder="DD/MM/YYYY"
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
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center">
                                 <FormField
                                    control={form.control}
                                    name="internalMatrixOrder"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Input
                                                label="Ordem Interna Matriz"
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
                                    name="internalAuctionOrder"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Input
                                                label="Ordem Interna Leilão "
                                                placeholder="0000000000"
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
                     </div>
                  </form>
                  <div className="flex flex-1 justify-between items-center">
                     <Button
                        variant="ghost"
                        onClick={() =>
                           router.push(pre_auction_routes.auction_maintenance)
                        }
                        className={
                           'w-fit bg-transparent text-error-default hover:bg-error-default/10 dark:border-dark-error-default dark:text-dark-error-default dark:hover:bg-dark-error-default/10 text-xs md:text-base'
                        }
                     >
                        Cancelar edição
                     </Button>
                     <Button
                        type="submit"
                        className="w-fit text-xs md:text-base"
                        onClick={form.handleSubmit(onSubmit)}
                     >
                        Atualizar leilão
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
                        A página de Cadastrar Novo Leilão permite registrar um
                        leilão inserindo seus Dados Gerais, como nome,
                        localização e datas. Também é possível preencher Dados
                        Complementares, como leiloeiro, comitente e empresa,
                        além de definir um e-mail para envio de notificações
                        relacionadas ao leilão.
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

const updateAuctionSchema = z.object({
   description: z
      .string()
      .min(1, { message: 'Descrição é obrigatória' })
      .optional(),

   auctionDate: z
      .string()
      .min(1, { message: 'Data do leilão é obrigatória' })
      .optional(),

   cep: z.string().min(1, { message: 'CEP é obrigatório' }).optional(),

   address: z.string().min(1, { message: 'Endereço é obrigatório' }).optional(),

   addressNumber: z
      .string()
      .min(1, { message: 'Número é obrigatório' })
      .optional(),

   addressComplement: z.string().optional(),

   neighborhood: z
      .string()
      .min(1, { message: 'Bairro é obrigatório' })
      .optional(),

   addressState: z
      .string()
      .min(1, { message: 'Estado é obrigatório' })
      .optional(),

   addressCity: z
      .string()
      .min(1, { message: 'Cidade é obrigatória' })
      .optional(),

   scheduleDate: z
      .string()
      .min(1, { message: 'Data de agendamento é obrigatória' })
      .optional(),

   startRemovalDate: z
      .string()
      .min(1, { message: 'Data de início da retirada é obrigatória' })
      .optional(),

   endRemovalDate: z
      .string()
      .min(1, { message: 'Data final da retirada é obrigatória' })
      .optional(),

   notificationDate: z
      .string()
      .min(1, { message: 'Data de notificação é obrigatória' })
      .optional(),

   noticeDate: z
      .string()
      .min(1, { message: 'Data do edital é obrigatória' })
      .optional(),

   notificationEmails: z
      .array(
         z
            .string()
            .min(1, { message: 'E-mail é obrigatório' })
            .email({ message: 'E-mail inválido' })
      )
      .optional(),

   auctioneerId: z
      .string()
      .min(1, { message: 'Leiloeiro é obrigatório' })
      .optional(),

   auctionCompanyId: z
      .string()
      .min(1, { message: 'Empresa é obrigatória' })
      .optional(),

   committeeId: z
      .string()
      .min(1, { message: 'Comitente é obrigatório' })
      .optional(),

   exhibitorId: z
      .string()
      .min(1, { message: 'Expositor é obrigatório' })
      .optional(),

   accountRule: z
      .string()
      .min(1, { message: 'Regra de prestação de contas é obrigatória' })
      .optional(),

   officialPublicationDate: z
      .string()
      .min(1, { message: 'Data de publicação oficial é obrigatória' })
      .optional(),

   officialPublicationNumber: z
      .string()
      .min(1, { message: 'Número de publicação oficial é obrigatório' })
      .optional(),

   internalMatrixOrder: z
      .string()
      .min(1, { message: 'Ordem interna matriz é obrigatória' })
      .optional(),

   internalAuctionOrder: z
      .string()
      .min(1, { message: 'Ordem interna leilão é obrigatória' })
      .optional(),

   vehicleObservations: z.string().optional()
})
