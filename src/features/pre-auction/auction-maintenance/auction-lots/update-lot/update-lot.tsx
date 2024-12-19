'use client'

import * as React from 'react'
import * as z from 'zod'

import {
   Breadcrumb,
   BreadcrumbEllipsis,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage
} from '@/components/ui/form'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Checkbox } from '@/src/components/ui/checkbox'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { DataTable } from '@/src/components/ui/data-table'
import { Input } from '@/src/components/ui/input'
import { SelectInput, SelectInputValue } from '@/src/components/ui/select'
import { Separator } from '@/src/components/ui/separator'
import { Textarea } from '@/src/components/ui/textarea'
import { useZipCode } from '@/src/hooks/useZipCode'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { isValidZipCode, ZIP_CODE_MASK } from '@/src/utils/masks'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckedState } from '@radix-ui/react-checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { DataTableColumnHeader } from '../../components/data-table-column-header'

interface UpdateLotProps {
   id: string
   countries: SelectInputValue[]
   defaultValues: z.infer<typeof updateLotSchema>
}

export const UpdateLot: React.FC<UpdateLotProps> = ({
   id,
   countries,
   defaultValues
}: UpdateLotProps) => {
   const router = useRouter()

   const { handleZipCode } = useZipCode()

   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   const form = useForm<z.infer<typeof updateLotSchema>>({
      resolver: zodResolver(updateLotSchema),
      defaultValues: defaultValues
   })

   const onSubmit: SubmitHandler<z.infer<typeof updateLotSchema>> = async (
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

         router.push(pre_auction_routes.auction.update_lot_success(id))
      } catch (error) {
         console.error('Erro ao enviar formulário:', error)
         toast.error('Erro ao enviar formulário. Tente novamente.')
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
                        <DropdownMenu>
                           <DropdownMenuTrigger className="flex items-center gap-1">
                              <BreadcrumbEllipsis className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="start">
                              <DropdownMenuItem>
                                 Manutenção de leilões
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                 Lista de lotes
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </BreadcrumbItem>
                     <BreadcrumbSeparator>/</BreadcrumbSeparator>
                     <BreadcrumbPage>Editar leilão</BreadcrumbPage>
                  </BreadcrumbList>
               </Breadcrumb>
               <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                     <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
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
               <Card className="flex h-fit items-center justify-between space-y-0">
                  <p className="text-start font-nunito text-base font-semibold text-black dark:text-dark-text-primary">
                     Informação do leilão
                  </p>
                  <h3 className="font-nunito text-base font-semibold lg:text-lg">
                     {id} -{' '}
                     {format(new Date(), 'dd MMM yyyy', {
                        locale: ptBR
                     })}
                  </h3>
               </Card>
               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="hide-scrollbar grid max-h-[calc(100vh-16.8125rem-62px-16px)] w-full overflow-x-visible overflow-y-scroll"
                  >
                     <div className="flex-1 space-y-6 overflow-x-visible overflow-y-scroll">
                        {/* Dados do lote (Alguns campos são editáveis) */}
                        <div className="space-y-4">
                           <p className="text-start text-sm font-semibold text-black dark:text-dark-text-primary">
                              Dados do lote
                           </p>
                           <div className="grid gap-6 md:gap-4">
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                 <FormField
                                    control={form.control}
                                    name="lotNumber"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Input
                                                label="Nº lote"
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
                                    name="itemNumber"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Input
                                                label="Nº item lote"
                                                placeholder="0000000000"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <Input
                                    disabled
                                    label="Processo"
                                    value={'1092837393030'} // replace with api value
                                    placeholder="0000000000"
                                 />
                              </div>
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                                 <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Input
                                                label="Localização"
                                                placeholder="Digite a localização"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <Input
                                    label="R. remoção"
                                    placeholder="0000000000"
                                 />
                              </div>
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                                 <Input
                                    label="Avaliação"
                                    placeholder="0000000000"
                                 />
                                 <Input
                                    label="Lance mínimo"
                                    placeholder="0000000000"
                                 />
                              </div>
                              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[0.8fr_auto_auto] md:gap-4">
                                 <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Status"
                                                options={[]}
                                                placeholder="Selecione o status do lote"
                                                onValueChange={(value) => {}}
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <Input
                                    label="Obs. transação"
                                    placeholder="Digite a observação"
                                 />
                                 <Input
                                    label="Roubo/Furto"
                                    placeholder="Digite se o lote é roubo/furto"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Dados do veículo (Read Only) */}
                        <div className="space-y-4">
                           <p className="text-start text-sm font-semibold text-black dark:text-dark-text-primary">
                              Dados do veículo
                           </p>
                           <div className="space-y-6">
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
                                 <div className="flex gap-4">
                                    <div className="flex-1">
                                       <Input
                                          label="Placa"
                                          placeholder="00000000"
                                       />
                                    </div>
                                    <Button variant="ghost" type="button">
                                       Buscar
                                    </Button>
                                 </div>
                                 <div className="flex gap-4">
                                    <div className="flex-1">
                                       <Input
                                          label="Chassi"
                                          placeholder="00000000"
                                       />
                                    </div>
                                    <Button variant="ghost" type="button">
                                       Buscar
                                    </Button>
                                 </div>
                              </div>
                              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-4">
                                 <Input
                                    label="RENAVAM"
                                    placeholder="0000000000"
                                 />
                                 <Input
                                    label="Ano Fab."
                                    placeholder="0000000000"
                                 />
                                 <Input
                                    label="Ano Mod."
                                    placeholder="Digite o bairro"
                                 />
                                 <Input
                                    label="Tipo"
                                    placeholder="Digite o tipo de veículo"
                                 />
                                 <Input
                                    label="Marca/modelo"
                                    placeholder="Digite a marca/modelo"
                                 />
                                 <Input
                                    label="Cor"
                                    placeholder="Digite a cor"
                                 />
                                 <SelectInput
                                    label="UF"
                                    options={countries}
                                    placeholder="Selecione o estado"
                                 />
                                 <Input
                                    label="Município"
                                    placeholder="Digite o município"
                                 />
                              </div>
                              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-4">
                                 <Input
                                    label="Nº motor"
                                    placeholder="0000000000"
                                 />
                                 <Input
                                    label="Combustível"
                                    placeholder="Digite o tipo de combustível"
                                 />
                              </div>
                              <Textarea
                                 label="Observação"
                                 placeholder="Digite a observação"
                              />
                           </div>
                        </div>

                        {/* Características (editável) */}
                        <div className="space-y-4">
                           <p className="text-start text-sm font-semibold text-black dark:text-dark-text-primary">
                              Características
                           </p>
                           <div className="space-y-6">
                              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-4">
                                 <div className="flex items-center gap-4">
                                    <Checkbox
                                       size="md"
                                       label="Periciado"
                                       onCheckedChange={(
                                          checked: CheckedState
                                       ) => {}}
                                    />
                                    <div className="flex-1">
                                       <FormField
                                          control={form.control}
                                          name="characteristics.origin"
                                          render={({ field }) => (
                                             <FormItem>
                                                <FormControl>
                                                   <SelectInput
                                                      label="Procedência"
                                                      placeholder="Selecione a procedência"
                                                      options={[]}
                                                      onValueChange={(
                                                         value
                                                      ) => {}}
                                                      {...field}
                                                   />
                                                </FormControl>
                                                <FormMessage />
                                             </FormItem>
                                          )}
                                       />
                                    </div>
                                 </div>
                                 <FormField
                                    control={form.control}
                                    name="characteristics.hasKey"
                                    render={({
                                       field: { value, ...fieldProps }
                                    }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                {...fieldProps}
                                                label="Chave"
                                                placeholder="Selecione se o lote possui chave"
                                                options={[
                                                   {
                                                      id: 'true',
                                                      label: 'Sim',
                                                      value: 'true'
                                                   },
                                                   {
                                                      id: 'false',
                                                      label: 'Não',
                                                      value: 'false'
                                                   }
                                                ]}
                                                onValueChange={(value) => {}}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="km"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Input
                                                label="KM"
                                                placeholder="0000000000"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-4">
                                 <FormField
                                    control={form.control}
                                    name="characteristics.transmission"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Transmissão"
                                                placeholder="Selecione a transmissão"
                                                options={[]}
                                                onValueChange={(value) => {}}
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="characteristics.hasAirConditioner"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Ar"
                                                placeholder="Selecione"
                                                options={[
                                                   {
                                                      id: 'true',
                                                      label: 'Sim',
                                                      value: 'true'
                                                   },
                                                   {
                                                      id: 'false',
                                                      label: 'Não',
                                                      value: 'false'
                                                   }
                                                ]}
                                                onValueChange={(value) => {}}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="characteristics.hasPowerSteering"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Direção"
                                                placeholder="Selecione a direção"
                                                options={[
                                                   {
                                                      id: 'true',
                                                      label: 'Sim',
                                                      value: 'true'
                                                   },
                                                   {
                                                      id: 'false',
                                                      label: 'Não',
                                                      value: 'false'
                                                   }
                                                ]}
                                                onValueChange={(value) => {}}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="characteristics.hasElectricWindow"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Vidro elétrico"
                                                placeholder="Selecione"
                                                options={[
                                                   {
                                                      id: 'true',
                                                      label: 'Sim',
                                                      value: 'true'
                                                   },
                                                   {
                                                      id: 'false',
                                                      label: 'Não',
                                                      value: 'false'
                                                   }
                                                ]}
                                                onValueChange={(value) => {}}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-4">
                                 <FormField
                                    control={form.control}
                                    name="characteristics.hasLock"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Trava"
                                                placeholder="Selecione"
                                                options={[
                                                   {
                                                      id: 'true',
                                                      label: 'Sim',
                                                      value: 'true'
                                                   },
                                                   {
                                                      id: 'false',
                                                      label: 'Não',
                                                      value: 'false'
                                                   }
                                                ]}
                                                onValueChange={(value) => {}}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="characteristics.hasTrailer"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Reboque"
                                                placeholder="Selecione"
                                                options={[
                                                   {
                                                      id: 'true',
                                                      label: 'Sim',
                                                      value: 'true'
                                                   },
                                                   {
                                                      id: 'false',
                                                      label: 'Não',
                                                      value: 'false'
                                                   }
                                                ]}
                                                onValueChange={(value) => {}}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="characteristics.inspected"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Situação"
                                                placeholder="Selecione"
                                                options={[
                                                   {
                                                      id: 'true',
                                                      label: 'Sim',
                                                      value: 'true'
                                                   },
                                                   {
                                                      id: 'false',
                                                      label: 'Não',
                                                      value: 'false'
                                                   }
                                                ]}
                                                onValueChange={(value) => {}}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="characteristics.hasGnvKit"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Kit GNV"
                                                placeholder="Selecione"
                                                options={[
                                                   {
                                                      id: 'true',
                                                      label: 'Sim',
                                                      value: 'true'
                                                   },
                                                   {
                                                      id: 'false',
                                                      label: 'Não',
                                                      value: 'false'
                                                   }
                                                ]}
                                                onValueChange={(value) => {}}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-4">
                                 <FormField
                                    control={form.control}
                                    name="characteristics.transmission"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Situação da placa"
                                                placeholder="Selecione a situação da placa"
                                                options={[]}
                                                onValueChange={(value) => {}}
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="characteristics.transmission"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Situação do veículo"
                                                placeholder="Selecione a situação do veículo"
                                                options={[]}
                                                onValueChange={(value) => {}}
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name="characteristics.transmission"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <SelectInput
                                                label="Situação do chassi"
                                                placeholder="Selecione a situação do chassi"
                                                options={[]}
                                                onValueChange={(value) => {}}
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

                        {/* Proprietário (Read Only) */}
                        <div className="space-y-4">
                           <p className="text-start text-sm font-semibold text-black dark:text-dark-text-primary">
                              Proprietário
                           </p>
                           <div className="space-y-6">
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                                 <Input
                                    label="Nome"
                                    placeholder="Digite o nome"
                                 />
                                 <Input
                                    label="CPF/CNPJ"
                                    placeholder="000.000.000-00"
                                 />
                              </div>
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
                                 <div className="flex gap-4">
                                    <div className="flex-1">
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
                                                   }) => {}
                                                )
                                             }
                                          }}
                                       />
                                    </div>
                                    <Button variant="ghost" type="button">
                                       Buscar
                                    </Button>
                                 </div>
                              </div>
                              <div className="space-y-6">
                                 <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
                                    <FormField
                                       control={form.control}
                                       name="financialDetails.address"
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
                                       name="financialDetails.addressNumber"
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
                                       name="financialDetails.addressComplement"
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
                                 <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-4">
                                    <FormField
                                       control={form.control}
                                       name="financialDetails.neighborhood"
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
                                       name="financialDetails.addressState"
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
                                       name="financialDetails.addressCity"
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
                                 <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-4">
                                    <SelectInput
                                       label="Notificar Correios"
                                       placeholder="Selecione"
                                       options={[
                                          {
                                             id: 'true',
                                             label: 'Sim',
                                             value: 'true'
                                          },
                                          {
                                             id: 'false',
                                             label: 'Não',
                                             value: 'false'
                                          }
                                       ]}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Financeira (Alguns campos são editáveis) */}
                        <div className="space-y-4">
                           <p className="text-start text-sm font-semibold text-black dark:text-dark-text-primary">
                              Financeira
                           </p>
                           <div className="space-y-6">
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                                 <Input
                                    label="Nome"
                                    placeholder="Digite o nome"
                                 />
                                 <Input
                                    label="CPF/CNPJ"
                                    placeholder="000.000.000-00"
                                 />
                              </div>
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
                                 <div className="flex gap-4">
                                    <div className="flex-1">
                                       <FormField
                                          control={form.control}
                                          name="financialDetails.cep"
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
                                                               e.currentTarget
                                                                  .value
                                                            )
                                                         ) {
                                                            handleZipCode(
                                                               e.currentTarget
                                                                  .value,
                                                               ({
                                                                  address,
                                                                  city,
                                                                  neighborhood,
                                                                  state,
                                                                  zipCode
                                                               }) => {}
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
                                    </div>
                                    <Button variant="ghost" type="button">
                                       Buscar
                                    </Button>
                                 </div>
                              </div>
                              <div className="space-y-6">
                                 <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
                                    <FormField
                                       control={form.control}
                                       name="financialDetails.address"
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
                                       name="financialDetails.addressNumber"
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
                                       name="financialDetails.addressComplement"
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
                                 <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-4">
                                    <FormField
                                       control={form.control}
                                       name="financialDetails.neighborhood"
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
                                       name="financialDetails.addressState"
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
                                       name="financialDetails.addressCity"
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
                                 <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-4">
                                    <SelectInput
                                       label="Notificar Correios"
                                       placeholder="Selecione"
                                       options={[
                                          {
                                             id: 'true',
                                             label: 'Sim',
                                             value: 'true'
                                          },
                                          {
                                             id: 'false',
                                             label: 'Não',
                                             value: 'false'
                                          }
                                       ]}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Comunicado de venda (Alguns campos são editáveis) */}
                        <div className="space-y-4">
                           <p className="text-start text-sm font-semibold text-black dark:text-dark-text-primary">
                              Comunicado de venda
                           </p>
                           <div className="space-y-6">
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                                 <Input
                                    label="Nome"
                                    placeholder="Digite o nome"
                                 />
                                 <Input
                                    label="CPF/CNPJ"
                                    placeholder="000.000.000-00"
                                 />
                              </div>
                              <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
                                 <div className="flex gap-4">
                                    <div className="flex-1">
                                       <FormField
                                          control={form.control}
                                          name="financialDetails.cep"
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
                                                               e.currentTarget
                                                                  .value
                                                            )
                                                         ) {
                                                            handleZipCode(
                                                               e.currentTarget
                                                                  .value,
                                                               ({
                                                                  address,
                                                                  city,
                                                                  neighborhood,
                                                                  state,
                                                                  zipCode
                                                               }) => {}
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
                                    </div>
                                    <Button variant="ghost" type="button">
                                       Buscar
                                    </Button>
                                 </div>
                              </div>
                              <div className="space-y-6">
                                 <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
                                    <FormField
                                       control={form.control}
                                       name="saleNotification.address"
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
                                       name="saleNotification.addressNumber"
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
                                       name="saleNotification.addressComplement"
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
                                 <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-4">
                                    <FormField
                                       control={form.control}
                                       name="saleNotification.neighborhood"
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
                                       name="saleNotification.addressState"
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
                                       name="saleNotification.addressCity"
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
                                 <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-4">
                                    <SelectInput
                                       label="Notificar Correios"
                                       placeholder="Selecione"
                                       options={[]}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Restrições (Read Only) */}
                        <div className="space-y-4">
                           <p className="text-start text-sm font-semibold text-black dark:text-dark-text-primary">
                              Restrições
                           </p>
                           <div className="space-y-6">
                              <DataTable
                                 data={[
                                    {
                                       code: '123456',
                                       observation: 'Restrição 1',
                                       origin: 'Restrição 1',
                                       restriction: 'Restrição 1',
                                       subRestriction: '-'
                                    }
                                 ]}
                                 columns={columns_restrictions}
                              />
                           </div>
                        </div>
                     </div>
                  </form>
                  <div className="flex flex-1 items-center justify-between">
                     <Button
                        variant="ghost"
                        onClick={() =>
                           router.push(pre_auction_routes.auction_maintenance)
                        }
                        className={
                           'w-fit bg-transparent text-xs text-error-default hover:bg-error-default/10 dark:border-dark-error-default dark:text-dark-error-default dark:hover:bg-dark-error-default/10 md:text-base'
                        }
                     >
                        Cancelar edição
                     </Button>
                     <Button
                        type="submit"
                        className="w-fit text-xs md:text-base"
                        onClick={form.handleSubmit(onSubmit)}
                     >
                        Salvar edição
                     </Button>
                  </div>
               </Form>
            </div>
            <CollapsibleSidebar
               open={isSidebarOpen}
               onOpenChange={setIsSidebarOpen}
            >
               <div className="h-full space-y-2 overflow-y-auto md:ml-4 md:mt-9">
                  <div className="flex items-center justify-between gap-2">
                     <h1 className="font-montserrat text-2xl font-semibold dark:text-dark-text-primary">
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
                        A página de Cadastrar Novo Leilão permite registrar um
                        leilão inserindo seus Dados Gerais, como nome,
                        localização e datas. Também é possível preencher Dados
                        Complementares, como leiloeiro, comitente e empresa,
                        além de definir um e-mail para envio de notificações
                        relacionadas ao leilão.
                     </p>
                     <div className="space-y-2 rounded-md bg-[#E6F1F7] px-4 py-4">
                        <p className="text-start font-normal text-black">
                           Info
                        </p>
                        <p className="text-start text-text-secondary">
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

const updateLotSchema = z.object({
   // Base lot fields
   lotNumber: z
      .string({
         invalid_type_error: 'Lot number must be a string'
      })
      .optional(),
   itemNumber: z
      .string({
         invalid_type_error: 'Item number must be a string'
      })
      .optional(),
   location: z
      .string({
         invalid_type_error: 'Location must be a string'
      })
      .optional(),
   evaluation: z
      .number({
         invalid_type_error: 'Evaluation must be a number'
      })
      .optional(),
   status: z
      .enum(['in_progress', 'finished', 'canceled'], {
         invalid_type_error:
            'Status must be one of: in_progress, finished, canceled'
      })
      .optional(),
   minumumBid: z
      .number({
         invalid_type_error: 'Minimum bid must be a number'
      })
      .optional(),
   hasKey: z
      .boolean({
         invalid_type_error: 'Has key must be a boolean'
      })
      .optional(),
   km: z
      .number({
         invalid_type_error: 'Kilometers must be a number'
      })
      .optional(),

   // Characteristics
   characteristics: z
      .object({
         inspected: z
            .boolean({
               invalid_type_error: 'Inspected must be a boolean'
            })
            .optional(),
         origin: z
            .string({
               invalid_type_error: 'Origin must be a string'
            })
            .optional(),
         hasKey: z
            .boolean({
               invalid_type_error: 'HasKey must be a boolean'
            })
            .optional(),
         mileage: z
            .number({
               invalid_type_error: 'Mileage must be a number'
            })
            .optional(),
         transmission: z
            .string({
               invalid_type_error: 'Transmission must be a string'
            })
            .optional(),
         hasAirConditioner: z
            .boolean({
               invalid_type_error: 'HasAirConditioner must be a boolean'
            })
            .optional(),
         hasPowerSteering: z
            .boolean({
               invalid_type_error: 'HasPowerSteering must be a boolean'
            })
            .optional(),
         hasElectricWindow: z
            .boolean({
               invalid_type_error: 'HasElectricWindow must be a boolean'
            })
            .optional(),
         hasLock: z
            .boolean({
               invalid_type_error: 'HasLock must be a boolean'
            })
            .optional(),
         hasTrailer: z
            .boolean({
               invalid_type_error: 'HasTrailer must be a boolean'
            })
            .optional(),
         condition: z
            .string({
               invalid_type_error: 'Condition must be a string'
            })
            .optional(),
         hasGnvKit: z
            .boolean({
               invalid_type_error: 'HasGnvKit must be a boolean'
            })
            .optional(),
         plateCondition: z
            .string({
               invalid_type_error: 'PlateCondition must be a string'
            })
            .optional(),
         vehicleCondition: z
            .string({
               invalid_type_error: 'VehicleCondition must be a string'
            })
            .optional(),
         chassisCondition: z
            .string({
               invalid_type_error: 'ChassisCondition must be a string'
            })
            .optional()
      })
      .strict()
      .optional(),

   // Financial Details
   financialDetails: z
      .object({
         name: z
            .string({
               invalid_type_error: 'Name must be a string'
            })
            .optional(),
         document: z
            .string({
               invalid_type_error: 'Document must be a string'
            })
            .optional(),
         cep: z
            .string({
               invalid_type_error: 'CEP must be a string'
            })
            .optional(),
         address: z
            .string({
               invalid_type_error: 'Address must be a string'
            })
            .optional(),
         addressNumber: z
            .string({
               invalid_type_error: 'AddressNumber must be a string'
            })
            .optional(),
         addressComplement: z
            .string({
               invalid_type_error: 'AddressComplement must be a string'
            })
            .optional(),
         neighborhood: z
            .string({
               invalid_type_error: 'Neighborhood must be a string'
            })
            .optional(),
         addressState: z
            .string({
               invalid_type_error: 'AddressState must be a string'
            })
            .optional(),
         addressCity: z
            .string({
               invalid_type_error: 'AddressCity must be a string'
            })
            .optional(),
         notifyByMail: z
            .boolean({
               invalid_type_error: 'NotifyByMail must be a boolean'
            })
            .optional()
      })
      .strict()
      .optional(),

   // Sale Notification
   saleNotification: z
      .object({
         name: z
            .string({
               invalid_type_error: 'Name must be a string'
            })
            .optional(),
         document: z
            .string({
               invalid_type_error: 'Document must be a string'
            })
            .optional(),
         cep: z
            .string({
               invalid_type_error: 'CEP must be a string'
            })
            .optional(),
         address: z
            .string({
               invalid_type_error: 'Address must be a string'
            })
            .optional(),
         addressNumber: z
            .string({
               invalid_type_error: 'AddressNumber must be a string'
            })
            .optional(),
         addressComplement: z
            .string({
               invalid_type_error: 'AddressComplement must be a string'
            })
            .optional(),
         neighborhood: z
            .string({
               invalid_type_error: 'Neighborhood must be a string'
            })
            .optional(),
         addressState: z
            .string({
               invalid_type_error: 'AddressState must be a string'
            })
            .optional(),
         addressCity: z
            .string({
               invalid_type_error: 'AddressCity must be a string'
            })
            .optional(),
         notifyByMail: z
            .boolean({
               invalid_type_error: 'NotifyByMail must be a boolean'
            })
            .optional()
      })
      .strict()
      .optional()
})

interface RestrictionsColumnsProps {
   code: string
   restriction: string
   subRestriction: string
   observation: string
   origin: string
}

const columns_restrictions: ColumnDef<RestrictionsColumnsProps>[] = [
   {
      accessorKey: 'code',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Código" />
      ),
      cell: ({ row }) => <div>{row.getValue('code')}</div>
   },
   {
      accessorKey: 'restriction',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Restrição" />
      ),
      cell: ({ row }) => <div>{row.getValue('restriction')}</div>
   },
   {
      accessorKey: 'subRestriction',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Sub-restrição" />
      ),
      cell: ({ row }) => <div>{row.getValue('subRestriction')}</div>
   },
   {
      accessorKey: 'observation',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Observação" />
      ),
      cell: ({ row }) => <div>{row.getValue('observation')}</div>
   },
   {
      accessorKey: 'origin',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Origem" />
      ),
      cell: ({ row }) => <div>{row.getValue('origin')}</div>
   }
]
