'use client'

import * as React from 'react'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardProps } from '@/features/dashboard/components/cards'
import { cards_mock } from '@/features/dashboard/mocks/cards_mock'
import {
   filter_options,
   transaction_options
} from '@/features/dashboard/mocks/filter_options_mock'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { ScrollArea } from '@/src/components/ui/scroll-area'
import { Separator } from '@/src/components/ui/separator'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useQueryState } from 'nuqs'

const Dashboard: React.FC = () => {
   const getAuctionStatus = (auction: CardProps) => {
      const hasPending = auction.transactions.pending.items.length > 0
      const hasUnfit = auction.transactions.unfit.items.length > 0
      const hasCompleted = auction.transactions.completed.items.length > 0

      if (hasUnfit && !hasPending && !hasCompleted) return 'unfit'
      if (hasCompleted && !hasPending && !hasUnfit) return 'completed'
      return 'in-progress'
   }

   const filteredAuctions = {
      'in-progress': cards_mock.filter(
         (auction) => getAuctionStatus(auction as CardProps) === 'in-progress'
      ),
      unfit: cards_mock.filter(
         (auction) => getAuctionStatus(auction as CardProps) === 'unfit'
      ),
      completed: cards_mock.filter(
         (auction) => getAuctionStatus(auction as CardProps) === 'completed'
      )
   }

   enum Tab {
      InProgress = 'in-progress',
      Unfit = 'unfit',
      Completed = 'completed'
   }

   const [tab, setTab] = useQueryState('tab', {
      defaultValue: Tab.InProgress,
      clearOnDefault: false
   })

   const tabs_content = {
      [Tab.InProgress]: filteredAuctions[Tab.InProgress],
      [Tab.Unfit]: filteredAuctions[Tab.Unfit],
      [Tab.Completed]: filteredAuctions[Tab.Completed]
   }

   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

   const tabsRef = React.useRef(null)

   const nextTab = () => {
      const values = Object.values(Tab)
      const currentIndex = values.indexOf(tab as Tab)
      if (currentIndex < values.length - 1) {
         const nextValue = values[currentIndex + 1]
         setTab(nextValue)
      }
   }

   const previousTab = () => {
      const values = Object.values(Tab)
      const currentIndex = values.indexOf(tab as Tab)
      if (currentIndex > 0) {
         const prevValue = values[currentIndex - 1]
         setTab(prevValue)
      }
   }

   React.useEffect(() => {
      const tabsContainer = tabsRef.current as unknown as HTMLElement
      if (!tabsContainer) return

      const activeTabElement = tabsContainer.querySelector(
         `[data-value="${tab}"]`
      )

      if (activeTabElement) {
         activeTabElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
         })
      }
   }, [tab])

   return (
      <div className="grid grid-cols-[1fr_auto] h-[calc(100vh-6.5rem)] overflow-hidden">
         <div className="space-y-6">
            <div className="space-y-2">
               <div className="flex justify-between items-center gap-2">
                  <h1 className="md:text-3xl text-2xl font-semibold font-montserrat">
                     Dashboard
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
            <div>
               <Tabs
                  defaultValue={Tab.InProgress}
                  value={tab as Tab}
                  onValueChange={(value) => {
                     setTab(value as Tab)
                  }}
               >
                  <TabsList className="flex justify-between">
                     <div className="grid grid-flow-col items-center gap-4">
                        <span
                           className="material-symbols-outlined rotate-180 cursor-pointer !text-[32px] hover:scale-110 lg:!hidden"
                           onClick={previousTab}
                        >
                           chevron_right
                        </span>
                        <div className="flex w-full" ref={tabsRef}>
                           <div className="flex">
                              <TabsTrigger
                                 className="min-w-36"
                                 value={Tab.InProgress}
                                 data-value={Tab.InProgress}
                              >
                                 Em progresso
                              </TabsTrigger>
                              <TabsTrigger
                                 className="min-w-36"
                                 value={Tab.Unfit}
                                 data-value={Tab.Unfit}
                              >
                                 Inaptos
                              </TabsTrigger>
                              <TabsTrigger
                                 className="min-w-36"
                                 value={Tab.Completed}
                                 data-value={Tab.Completed}
                              >
                                 Concluídos
                              </TabsTrigger>
                           </div>
                        </div>
                        <span
                           className="material-symbols-outlined cursor-pointer !text-[32px] hover:scale-110 lg:!hidden"
                           onClick={nextTab}
                        >
                           chevron_right
                        </span>
                     </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="sm">
                              <div className="flex items-center gap-1.5">
                                 <span className="text-sm font-nunito font-semibold hidden md:block">
                                    Filtros
                                 </span>
                                 <span className="material-symbols-outlined filled symbol-sm">
                                    filter_alt
                                 </span>
                              </div>
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                           align="end"
                           className="px-1.5 py-2"
                        >
                           <DropdownMenuLabel className="text-sm">
                              Filtrar por
                           </DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuLabel className="text-sm">
                              Tipo de Erro
                           </DropdownMenuLabel>
                           {filter_options.map((option) => (
                              <DropdownMenuItem key={option.id}>
                                 <Checkbox
                                    size="md"
                                    label={option.label}
                                    onCheckedChange={(checked: CheckedState) =>
                                       console.log(
                                          `checked: ${checked}; id: ${option.id}`
                                       )
                                    }
                                 />
                              </DropdownMenuItem>
                           ))}
                           <DropdownMenuSeparator />
                           <DropdownMenuLabel className="text-sm">
                              Transação
                           </DropdownMenuLabel>
                           {transaction_options.map((option) => (
                              <DropdownMenuItem key={option.id}>
                                 <Checkbox
                                    size="md"
                                    label={option.label}
                                    onCheckedChange={(checked: CheckedState) =>
                                       console.log(
                                          `checked: ${checked}; id: ${option.id}`
                                       )
                                    }
                                 />
                              </DropdownMenuItem>
                           ))}
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </TabsList>
                  <TabsContent value={tab} className="h-full">
                     <ScrollArea className="h-[calc(100vh-15rem)] w-full pr-2.5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                           {tabs_content[tab as Tab].map((auction) => (
                              <Card
                                 key={auction.auctionCode}
                                 {...auction}
                                 onEdit={() => console.log('Editar leilão')}
                              />
                           ))}
                        </div>
                     </ScrollArea>
                  </TabsContent>
               </Tabs>
            </div>
         </div>
         <CollapsibleSidebar
            open={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
            className="h-[calc(100vh-1.5rem-56px)]"
         >
            <div className="space-y-2 h-full overflow-y-auto ml-4">
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
                        className="material-symbols-outlined text-action-active"
                        style={{ fontSize: '1.5rem' }}
                     >
                        close
                     </span>
                  </Button>
               </div>
               <Separator orientation="horizontal" />
               <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                  <p className="text-black font-semibold text-start">
                     Descrição
                  </p>
                  <p className="text-text-secondary text-start">
                     A página de Dashboard oferece uma visão geral dos leilões,
                     exibindo cards com o status das transações. O usuário pode
                     navegar em abas organizadas por: Em progresso, Inaptos e
                     Concluídos. Também é possível aplicar filtros por tipo de
                     erro e transação, facilitando o acompanhamento e a gestão
                     eficiente dos leilões.
                  </p>
                  <p className="text-black font-semibold text-start">
                     Detalhes
                  </p>
                  <div>
                     <p className="text-black font-normal text-start">
                        Aba Em progresso
                     </p>
                     <p className="text-text-secondary text-start">
                        Reúne os leilões que iniciaram as transações com o
                        DETRAN e não apresentam erros.
                     </p>
                  </div>
                  <div>
                     <p className="text-black font-normal text-start">
                        Aba Inaptos
                     </p>
                     <p className="text-text-secondary text-start">
                        Reúne os leilões que não aderem a nenhum filtro de erro.
                     </p>
                  </div>
                  <div>
                     <p className="text-black font-normal text-start">
                        Aba Concluídos
                     </p>
                     <p className="text-text-secondary text-start">
                        Reúne os leilões finalizados.
                     </p>
                  </div>
                  <div>
                     <p className="text-black font-normal text-start">Status</p>
                     <p className="text-text-secondary text-start">
                        A cor cinza indica lotes com transações em progresso. A
                        cor vermelha indica lotes com transações que precisam
                        ser revisadas. A cor verde indica lotes que necessitam
                        intervenção manual para a continuidade do processo
                        automático.
                     </p>
                  </div>
                  <div className="bg-[#E6F1F7] px-4 py-4 space-y-2">
                     <p className="text-black font-normal text-start">Info</p>
                     <p className="text-text-secondary text-start">
                        Clique no card para acessar o leilão.
                     </p>
                     <p className="text-text-secondary text-start">
                        Passe o ponteiro do mouse na cor do status para
                        visualizar a quantidade de lotes por transação.
                     </p>
                  </div>
               </div>
            </div>
         </CollapsibleSidebar>
      </div>
   )
}

export default Dashboard
