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
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { Separator } from '@/src/components/ui/separator'

import { DataTable } from '@/src/components/ui/data-table'
import { useFilePicker } from '@/src/hooks/useFilePicker'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { DataTableColumnHeader } from '../components/data-table-column-header'

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
   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
   const [data, setData] = React.useState<ImportOwnersColumnsProps[]>([])
   console.log('data', data)
   const [globalFilter, setGlobalFilter] = React.useState('')

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
      }
   }

   return (
      <React.Fragment>
         <div className="grid grid-cols-[1fr_auto]">
            <div className="space-y-6 h-full flex flex-col">
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
                     <div className="flex flex-wrap justify-between items-center gap-2">
                        <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
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
                  <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center sm:justify-between">
                     <div className="flex items-center gap-2 grow w-full">
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
                        <Button
                           variant="default"
                           className="sm:min-w-[150px] whitespace-nowrap"
                           onClick={() => handleSendFile()}
                        >
                           Enviar arquivo
                        </Button>
                     </div>
                  </div>
               </div>
               <div className="grid w-full overflow-scroll max-h-[calc(100vh-12.4125rem)]">
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
               <div className="space-y-2 h-full overflow-y-auto ml-4 mt-[36px]">
                  <div className="flex justify-between items-center gap-2">
                     <h1 className="text-2xl font-semibold font-montserrat">
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
                  <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                     <p className="text-black dark:text-dark-text-primary font-semibold text-start">
                        Descrição
                     </p>
                     <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                        A página de Importar Proprietários permite atualizar
                        informações dos lotes quando o retorno do Detran não é
                        automático. O usuário pode enviar um arquivo no sistema
                        seguindo um modelo específico e visualizar a lista de
                        arquivos importados para acompanhar as atualizações
                        realizadas.
                     </p>
                     <p className="text-black dark:text-dark-text-primary font-semibold text-start">
                        Detalhes
                     </p>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Baixar modelo
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Faz o download do modelo da planilha para
                           preenchimento dos dados necessários.
                        </p>
                     </div>
                     <div>
                        <p className="text-black dark:text-dark-text-primary font-normal text-start">
                           Enviar arquivo
                        </p>
                        <p className="text-text-secondary dark:text-dark-text-secondary text-start">
                           Atualiza as informações dos proprietários com o
                           conteúdo da planilha enviada.
                        </p>
                     </div>
                  </div>
               </div>
            </CollapsibleSidebar>
         </div>
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
