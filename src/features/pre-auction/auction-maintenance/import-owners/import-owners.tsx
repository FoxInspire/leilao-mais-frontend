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
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { DataTable } from '@/src/components/ui/data-table'
import { DataTableColumnHeader } from '@/src/components/ui/data-table-column-header'
import { DisabledFeature } from '@/src/components/ui/disabled-feature'
import { Separator } from '@/src/components/ui/separator'
import { useFilePicker } from '@/src/hooks/useFilePicker'
import { cn } from '@/src/lib/utils'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface ImportOwnersProps {
   id: string
}

interface ImportOwnersColumnsProps {
   file: string
   type: string
   itemsCount: number
   errorsCount: number
   status: string
   importDate: string
   importUser: string
}

interface ConvertedFile {
   fileName: string
   data: any[]
}

const ImportOwners: React.FC<ImportOwnersProps> = ({
   id
}: ImportOwnersProps) => {
   const [dialog, setDialog] = React.useState(false)
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [data, setData] = React.useState<ImportOwnersColumnsProps[]>([])

   const handleDownloadModel = () => {
      try {
         const link = document.createElement('a')
         link.href = '/ModeloImportacaoProprietario.xlsx'
         link.download = 'ModeloImportacaoProprietario.xlsx'

         document.body.appendChild(link)
         link.click()
         document.body.removeChild(link)
      } catch (error) {
         console.error('Erro ao baixar modelo:', error)
         toast.error('Erro ao baixar modelo')
      }
   }

   const handleFileConversion = async (
      files: File[]
   ): Promise<ConvertedFile[]> => {
      try {
         const results = await Promise.all(
            files.map(async (file) => {
               return new Promise<ConvertedFile>((resolve, reject) => {
                  const reader = new FileReader()

                  reader.onload = (e) => {
                     try {
                        const data = e.target?.result
                        const workbook = XLSX.read(data, { type: 'binary' })

                        const firstSheet =
                           workbook.Sheets[workbook.SheetNames[0]]

                        const jsonData = XLSX.utils.sheet_to_json(firstSheet)

                        resolve({
                           fileName: file.name,
                           data: jsonData
                        })
                     } catch (error) {
                        reject(error)
                     }
                  }

                  reader.onerror = (error) => reject(error)
                  reader.readAsBinaryString(file)
               })
            })
         )

         return results
      } catch (error) {
         toast.error('Erro ao processar arquivo(s)')
         console.error(error)
         return []
      }
   }

   const select_files = useFilePicker({
      accept: '.csv',
      multiple: false,
      onFileSelect: async (files) => {}
   })

   const handleSelectFileFromSys = () => {
      select_files.onSelectFile()
   }

   const handleSendFile = async () => {
      if (select_files.files.length === 0) {
         toast.error('Selecione um arquivo primeiro')
         return
      }

      try {
         const convertedFiles = await handleFileConversion(select_files.files)

         const newData: ImportOwnersColumnsProps[] = convertedFiles.map(
            (file) => ({
               file: file.fileName,
               type: file.fileName.split('.').pop() || '',
               itemsCount: Array.isArray(file.data) ? file.data.length : 0,
               errorsCount: 0,
               status: 'Processado',
               importDate: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
               importUser: 'teste'
            })
         )

         setData(newData)
         toast.success('Arquivo processado com sucesso!')
         select_files.clear()
      } catch (error) {
         toast.error('Erro ao processar arquivo: ' + error)
         console.error(error)
      } finally {
         setDialog(false)
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
                              Importar proprietários
                           </BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <div className="space-y-2">
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <h1 className="font-montserrat text-2xl font-semibold md:text-3xl">
                           Importar proprietários - {id}
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
                     <div className="flex w-full grow items-center gap-2">
                        <Button
                           variant="outline"
                           className="whitespace-nowrap"
                           onClick={() => handleDownloadModel()}
                        >
                           <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined filled symbol-sm">
                                 download_2
                              </span>
                              <span className="text-sm">Baixar modelo</span>
                           </div>
                        </Button>
                     </div>
                     <div className="flex grow items-center gap-2">
                        <Button
                           variant="ghost"
                           className="whitespace-nowrap"
                           onClick={() => handleSelectFileFromSys()}
                        >
                           <div className="flex items-center gap-2">
                              {select_files.files.length > 0 && (
                                 <span className="material-symbols-outlined symbol-sm">
                                    close
                                 </span>
                              )}
                              <span className="text-sm">
                                 {select_files.files.length > 0
                                    ? select_files.files
                                         .map((file) => file.name)
                                         .join(', ')
                                    : 'Selecionar arquivo'}
                              </span>
                           </div>
                        </Button>
                        {select_files.files.length === 0 && (
                           <DisabledFeature message="Selecione um arquivo primeiro">
                              <div>
                                 <Button
                                    variant="default"
                                    disabled
                                    className="whitespace-nowrap sm:min-w-[150px]"
                                    onClick={() => setDialog(true)}
                                 >
                                    Enviar arquivo
                                 </Button>
                              </div>
                           </DisabledFeature>
                        )}
                        {select_files.files.length > 0 && (
                           <Button
                              variant="default"
                              className="whitespace-nowrap sm:min-w-[150px]"
                              onClick={() => setDialog(true)}
                           >
                              Enviar arquivo
                           </Button>
                        )}
                     </div>
                  </div>
               </div>
               <div className="grid max-h-[calc(100vh-12.4125rem)] w-full overflow-scroll">
                  <div className="flex-1 overflow-auto">
                     <DataTable
                        emptyMessage={'Nenhum arquivo encontrado.'}
                        columns={columns_import_owners}
                        data={data}
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
                        A página de Importar Proprietários permite atualizar
                        informações dos lotes quando o retorno do Detran não é
                        automático. O usuário pode enviar um arquivo no sistema
                        seguindo um modelo específico e visualizar a lista de
                        arquivos importados para acompanhar as atualizações
                        realizadas.
                     </p>
                     <p className="text-start font-semibold text-black dark:text-dark-text-primary">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Baixar modelo
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Faz o download do modelo da planilha para
                           preenchimento dos dados necessários.
                        </p>
                     </div>
                     <div>
                        <p className="text-start font-normal text-black dark:text-dark-text-primary">
                           Enviar arquivo
                        </p>
                        <p className="text-start text-text-secondary dark:text-dark-text-secondary">
                           Atualiza as informações dos proprietários com o
                           conteúdo da planilha enviada.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
         <Dialog open={dialog} onOpenChange={setDialog}>
            <DialogContent className={cn('md:max-w-md')}>
               <DialogHeader>
                  <DialogTitle>Enviar arquivo</DialogTitle>
               </DialogHeader>
               <div className="space-y-6 py-4 pb-6">
                  <div className="flex w-full flex-col items-center justify-center">
                     <span className="material-symbols-outlined symbol-xl text-error-default">
                        warning
                     </span>
                  </div>
                  <div className="space-y-2">
                     <p className="text-center font-montserrat text-lg font-medium">
                        Enviar os dados do arquivo no sistema
                     </p>
                     <p className="text-center font-montserrat text-sm">
                        Esta ação irá atualizar as informações dos proprietários
                        com os dados do arquivo selecionado. Deseja continuar?
                     </p>
                  </div>
               </div>
               <div className="mb-6 mt-2 grid gap-2 md:grid-cols-2">
                  <div className="order-2 md:order-1">
                     <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => setDialog(false)}
                     >
                        cancelar
                     </Button>
                  </div>
                  <div className="order-1 md:order-2">
                     <Button
                        variant="default"
                        className="w-full"
                        onClick={() => handleSendFile()}
                     >
                        enviar arquivo
                     </Button>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </React.Fragment>
   )
}

const columns_import_owners: ColumnDef<ImportOwnersColumnsProps>[] = [
   {
      accessorKey: 'file',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Arquivo" />
      ),
      cell: ({ row }) => <div>{row.getValue('file')}</div>
   },
   {
      accessorKey: 'type',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Tipo" />
      ),
      cell: ({ row }) => <div>{row.getValue('type')}</div>
   },
   {
      accessorKey: 'itemsCount',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Qtd itens" />
      ),
      cell: ({ row }) => <div>{row.getValue('itemsCount')}</div>
   },
   {
      accessorKey: 'errorsCount',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Qtd erro" />
      ),
      cell: ({ row }) => <div>{row.getValue('errorsCount')}</div>
   },
   {
      accessorKey: 'status',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <div>{row.getValue('status')}</div>
   },
   {
      accessorKey: 'importDate',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Data importação" />
      ),
      cell: ({ row }) => <div>{row.getValue('importDate')}</div>
   },
   {
      accessorKey: 'importUser',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Usuário" />
      ),
      cell: ({ row }) => <div>{row.getValue('importUser')}</div>
   }
]

export default ImportOwners
