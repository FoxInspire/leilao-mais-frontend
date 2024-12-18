'use client'

import * as React from 'react'
import * as XLSX from 'xlsx'

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { SelectInput } from '@/components/ui/select'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { DataTable } from '@/src/components/ui/data-table'
import { Separator } from '@/src/components/ui/separator'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { NotifyOwnersEntity } from '@/src/types/entities/notify-owners.entity'
import { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'

interface NotifyOwnersProps {
   id: string
   data: NotifyOwnersEntity[]
   columns: ColumnDef<NotifyOwnersEntity>[]
}

const NotifyOwners: React.FC<NotifyOwnersProps> = ({
   id,
   columns,
   data
}: NotifyOwnersProps) => {
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [globalFilter, setGlobalFilter] = React.useState('')

   const createHeaders = (columns: ExcelColumn[]) =>
      columns.reduce((acc, col) => ({ ...acc, [col.key]: col.header }), {})

   const transformData = (data: NotifyOwnersEntity[], columns: ExcelColumn[]) =>
      data.map((row) =>
         columns.reduce(
            (acc, col) => ({
               ...acc,
               [col.key]: col.transform
                  ? col.transform(row[col.key])
                  : row[col.key]
            }),
            {}
         )
      )

   const handleExportToExcel = () => {
      try {
         const headers = createHeaders(excelColumns)
         const transformedData = transformData(data, excelColumns)

         const ws = XLSX.utils.json_to_sheet([headers, ...transformedData], {
            skipHeader: true
         })

         const wb = XLSX.utils.book_new()
         XLSX.utils.book_append_sheet(wb, ws, 'Notificações')
         XLSX.writeFile(wb, `notificacoes_${id}.csv`)

         toast.success('Arquivo exportado com sucesso!')
      } catch (error) {
         console.error('Erro ao exportar:', error)
         toast.error('Erro ao exportar arquivo')
      }
   }

   const handleExportToTxt = () => {
      try {
         const content = 'sample_txt'

         const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })

         const url = window.URL.createObjectURL(blob)
         const link = document.createElement('a')
         link.href = url
         link.download = `notificacoes_${id}.txt`

         document.body.appendChild(link)
         link.click()

         document.body.removeChild(link)
         window.URL.revokeObjectURL(url)

         toast.success('Arquivo exportado com sucesso!')
      } catch (error) {
         console.error('Erro ao exportar:', error)
         toast.error('Erro ao exportar arquivo')
      }
   }

   return (
      <React.Fragment>
         <div className="grid grid-cols-[1fr_auto]">
            <div className="flex h-full flex-col space-y-6">
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
                        <BreadcrumbItem>
                           <BreadcrumbPage>
                              Notificar proprietários
                           </BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
                           Notificar proprietários - {id}
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
                     <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <div className="min-w-[300px]">
                           <SelectInput
                              options={[
                                 { value: 'all', label: 'Todos', id: 'all' },
                                 {
                                    value: 'has_address',
                                    label: 'Possui endereço notificável',
                                    id: 'has_address'
                                 },
                                 {
                                    value: 'no_address',
                                    label: 'Não possui endereço notificável',
                                    id: 'no_address'
                                 }
                              ]}
                              label="Endereço notificável"
                              placeholder="Selecione o endereço notificável"
                           />
                        </div>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                           {data?.length} registros encontrados
                        </p>
                     </div>
                     <div className="flex grow items-center gap-2">
                        <Button
                           variant="ghost"
                           className="whitespace-nowrap"
                           onClick={() => handleExportToExcel()}
                        >
                           extrair excel
                        </Button>
                        <Button
                           variant="default"
                           className="whitespace-nowrap sm:min-w-[150px]"
                           onClick={() => handleExportToTxt()}
                        >
                           Gerar arquivo
                        </Button>
                     </div>
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
               <div className="ml-4 mt-[36px] h-full space-y-2 overflow-y-auto">
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
                        A página de Notificar Proprietários permite visualizar a
                        lista de proprietários dos veículos incluídos em um
                        leilão. É possível extrair uma planilha com os dados da
                        listagem e gerar um arquivo de texto para utilização em
                        outras plataformas, como o sistema dos Correios.
                     </p>
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Extrair excel
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Faz o download da planilha Excel contendo todos os
                           dados referente aos proprietários dos veículos.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Gerar arquivo
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Faz o download de um arquivo de texto (.txt) para ser
                           utilizado em outras plataformas, contendo todos os
                           dados referente aos proprietários dos veículos.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
      </React.Fragment>
   )
}

interface TransformFunction<T, K extends keyof T> {
   (value: T[K]): unknown
}

interface ExcelColumn<T = NotifyOwnersEntity> {
   key: keyof T
   header: string
   transform?: TransformFunction<T, keyof T>
}

const excelColumns: ExcelColumn[] = [
   { key: 'vehiclePlate', header: 'Placa' },
   { key: 'vehicleChassis', header: 'Chassi' },
   {
      key: 'ownerName',
      header: 'Proprietário',
      transform: (value) => value?.toUpperCase()
   },
   { key: 'financial', header: 'Financeira' },
   {
      key: 'communication',
      header: 'Comunicado venda',
      transform: (value) => (value ? 'Sim' : 'Não')
   }
]

export default NotifyOwners
