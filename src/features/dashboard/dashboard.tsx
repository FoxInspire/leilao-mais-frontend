'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardProps } from '@/features/dashboard/components/cards'
import { Button } from '@/src/components/ui/button'
import { CollapsibleSidebar } from '@/src/components/ui/collapsible-sidebar'
import { Separator } from '@/src/components/ui/separator'
import { useQueryState } from 'nuqs'

import React from 'react'

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
      'in-progress': mocks.filter(
         (auction) => getAuctionStatus(auction as CardProps) === 'in-progress'
      ),
      unfit: mocks.filter(
         (auction) => getAuctionStatus(auction as CardProps) === 'unfit'
      ),
      completed: mocks.filter(
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

   return (
      <div className="flex h-full">
         <div className="flex-1">
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex justify-between items-center gap-2">
                     <h1 className="text-3xl font-bold font-montserrat">
                        Dashboard
                     </h1>
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                     >
                        <span className="material-symbols-outlined text-action-active">
                           info
                        </span>
                     </Button>
                  </div>
                  <Separator orientation="horizontal" />
               </div>
               <div>
                  <Tabs
                     defaultValue={Tab.InProgress}
                     onValueChange={(value) => setTab(value as Tab)}
                  >
                     <TabsList className="flex justify-between">
                        <div>
                           <TabsTrigger className="min-w-36" value={Tab.InProgress}>
                              Em progresso
                           </TabsTrigger>
                           <TabsTrigger className="min-w-36" value={Tab.Unfit}>
                              Inaptos
                           </TabsTrigger>
                           <TabsTrigger className="min-w-36" value={Tab.Completed}>
                              Concluídos
                           </TabsTrigger>
                        </div>
                        <Button variant="ghost" size="sm">
                           <div className="flex items-center gap-1.5">
                              <span className="text-sm font-nunito font-semibold">
                                 Filtros
                              </span>
                              <span className="material-symbols-outlined filled symbol-sm">
                                 filter_alt
                              </span>
                           </div>
                        </Button>
                     </TabsList>
                     <TabsContent value={tab} className="grid grid-cols-4 gap-4">
                        {tabs_content[tab as Tab].map((auction) => (
                           <Card
                              key={auction.auctionCode}
                              {...auction}
                              onEdit={() => console.log('Editar leilão')}
                           />
                        ))}
                     </TabsContent>
                  </Tabs>
               </div>
            </div>
         </div>
         <CollapsibleSidebar
            open={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
            className="ml-4"
         >
            <div className="space-y-2">
               <div className="flex justify-between items-center gap-2">
                  <h1 className="text-2xl font-bold font-montserrat">
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
            </div>
         </CollapsibleSidebar>
      </div>
   )
}

const mocks = [
   {
      auctionCode: 'LEI-2024-001',
      yardName: 'Pátio Central SP',
      name: 'BRU01.23-DP',
      validLots: 45,
      date: new Date('2024-03-15'),
      location: 'São Paulo, SP',
      transactions: {
         pending: {
            items: [
               { quantity: 5, name: 'Transação 001' },
               { quantity: 4, name: 'Transação 002' }
            ]
         },
         unfit: { items: [] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-002',
      yardName: 'Pátio RJ Norte',
      name: 'BRU02.23-DP',
      validLots: 30,
      date: new Date('2024-03-18'),
      location: 'Rio de Janeiro, RJ',
      transactions: {
         pending: { items: [{ quantity: 8, name: 'Transação 001' }] },
         unfit: { items: [] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-003',
      yardName: 'Pátio SP Oeste',
      name: 'BRU03.23-DP',
      validLots: 20,
      date: new Date('2024-03-30'),
      location: 'São Paulo, SP',
      transactions: {
         pending: { items: [{ quantity: 3, name: 'Transação 001' }] },
         unfit: { items: [] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-004',
      yardName: 'Pátio RJ Oeste',
      name: 'BRU04.23-DP',
      validLots: 25,
      date: new Date('2024-04-01'),
      location: 'Rio de Janeiro, RJ',
      transactions: {
         pending: { items: [{ quantity: 6, name: 'Transação 001' }] },
         unfit: { items: [] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-005',
      yardName: 'Pátio MG Norte',
      name: 'BRU05.23-DP',
      validLots: 18,
      date: new Date('2024-04-05'),
      location: 'Belo Horizonte, MG',
      transactions: {
         pending: { items: [{ quantity: 7, name: 'Transação 001' }] },
         unfit: { items: [] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-006',
      yardName: 'Pátio MG Sul',
      name: 'BRU06.23-DP',
      validLots: 25,
      date: new Date('2024-03-20'),
      location: 'Belo Horizonte, MG',
      transactions: {
         pending: { items: [{ quantity: 3, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 2, name: 'Transação 002' }] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-007',
      yardName: 'Pátio RS Central',
      name: 'BRU07.23-DP',
      validLots: 35,
      date: new Date('2024-03-22'),
      location: 'Porto Alegre, RS',
      transactions: {
         pending: { items: [] },
         unfit: {
            items: [
               { quantity: 4, name: 'Transação 001' },
               { quantity: 2, name: 'Transação 002' }
            ]
         },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-008',
      yardName: 'Pátio BA Norte',
      name: 'BRU08.23-DP',
      validLots: 22,
      date: new Date('2024-04-10'),
      location: 'Salvador, BA',
      transactions: {
         pending: { items: [] },
         unfit: { items: [{ quantity: 3, name: 'Transação 001' }] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-009',
      yardName: 'Pátio PR Oeste',
      name: 'BRU09.23-DP',
      validLots: 28,
      date: new Date('2024-04-12'),
      location: 'Curitiba, PR',
      transactions: {
         pending: { items: [] },
         unfit: { items: [{ quantity: 5, name: 'Transação 001' }] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-010',
      yardName: 'Pátio SC Central',
      name: 'BRU10.23-DP',
      validLots: 30,
      date: new Date('2024-04-15'),
      location: 'Florianópolis, SC',
      transactions: {
         pending: { items: [] },
         unfit: { items: [{ quantity: 6, name: 'Transação 001' }] },
         completed: { items: [] }
      }
   },
   {
      auctionCode: 'LEI-2024-011',
      yardName: 'Pátio PR Leste',
      name: 'BRU11.23-DP',
      validLots: 40,
      date: new Date('2024-03-25'),
      location: 'Curitiba, PR',
      transactions: {
         pending: { items: [] },
         unfit: { items: [] },
         completed: {
            items: [
               { quantity: 10, name: 'Transação 001' },
               { quantity: 10, name: 'Transação 002' }
            ]
         }
      }
   },
   {
      auctionCode: 'LEI-2024-012',
      yardName: 'Pátio BA Central',
      name: 'BRU12.23-DP',
      validLots: 28,
      date: new Date('2024-03-28'),
      location: 'Salvador, BA',
      transactions: {
         pending: { items: [] },
         unfit: { items: [] },
         completed: { items: [{ quantity: 15, name: 'Transação 001' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-013',
      yardName: 'Pátio SP Leste',
      name: 'BRU13.23-DP',
      validLots: 50,
      date: new Date('2024-04-20'),
      location: 'São Paulo, SP',
      transactions: {
         pending: { items: [] },
         unfit: { items: [] },
         completed: { items: [{ quantity: 20, name: 'Transação 001' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-014',
      yardName: 'Pátio RJ Central',
      name: 'BRU14.23-DP',
      validLots: 35,
      date: new Date('2024-04-22'),
      location: 'Rio de Janeiro, RJ',
      transactions: {
         pending: { items: [] },
         unfit: { items: [] },
         completed: { items: [{ quantity: 12, name: 'Transação 001' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-015',
      yardName: 'Pátio MG Oeste',
      name: 'BRU15.23-DP',
      validLots: 40,
      date: new Date('2024-04-25'),
      location: 'Belo Horizonte, MG',
      transactions: {
         pending: { items: [] },
         unfit: { items: [] },
         completed: { items: [{ quantity: 18, name: 'Transação 001' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-016',
      yardName: 'Pátio RS Norte',
      name: 'BRU16.23-DP',
      validLots: 45,
      date: new Date('2024-04-28'),
      location: 'Porto Alegre, RS',
      transactions: {
         pending: { items: [] },
         unfit: { items: [] },
         completed: { items: [{ quantity: 25, name: 'Transação 001' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-017',
      yardName: 'Pátio BA Leste',
      name: 'BRU17.23-DP',
      validLots: 38,
      date: new Date('2024-05-01'),
      location: 'Salvador, BA',
      transactions: {
         pending: { items: [{ quantity: 2, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 1, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 5, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-018',
      yardName: 'Pátio PR Central',
      name: 'BRU18.23-DP',
      validLots: 42,
      date: new Date('2024-05-05'),
      location: 'Curitiba, PR',
      transactions: {
         pending: { items: [{ quantity: 3, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 2, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 7, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-019',
      yardName: 'Pátio SC Leste',
      name: 'BRU19.23-DP',
      validLots: 36,
      date: new Date('2024-05-10'),
      location: 'Florianópolis, SC',
      transactions: {
         pending: { items: [{ quantity: 4, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 3, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 6, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-020',
      yardName: 'Pátio SP Central',
      name: 'BRU20.23-DP',
      validLots: 48,
      date: new Date('2024-05-15'),
      location: 'São Paulo, SP',
      transactions: {
         pending: { items: [{ quantity: 5, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 4, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 8, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-021',
      yardName: 'Pátio RJ Leste',
      name: 'BRU21.23-DP',
      validLots: 32,
      date: new Date('2024-05-18'),
      location: 'Rio de Janeiro, RJ',
      transactions: {
         pending: { items: [{ quantity: 6, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 2, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 9, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-022',
      yardName: 'Pátio MG Central',
      name: 'BRU22.23-DP',
      validLots: 29,
      date: new Date('2024-05-20'),
      location: 'Belo Horizonte, MG',
      transactions: {
         pending: { items: [{ quantity: 7, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 3, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 10, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-023',
      yardName: 'Pátio RS Leste',
      name: 'BRU23.23-DP',
      validLots: 34,
      date: new Date('2024-05-25'),
      location: 'Porto Alegre, RS',
      transactions: {
         pending: { items: [{ quantity: 8, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 4, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 11, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-024',
      yardName: 'Pátio BA Oeste',
      name: 'BRU24.23-DP',
      validLots: 37,
      date: new Date('2024-05-28'),
      location: 'Salvador, BA',
      transactions: {
         pending: { items: [{ quantity: 9, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 5, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 12, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-025',
      yardName: 'Pátio PR Norte',
      name: 'BRU25.23-DP',
      validLots: 39,
      date: new Date('2024-06-01'),
      location: 'Curitiba, PR',
      transactions: {
         pending: { items: [{ quantity: 10, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 6, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 13, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-026',
      yardName: 'Pátio SC Oeste',
      name: 'BRU26.23-DP',
      validLots: 41,
      date: new Date('2024-06-05'),
      location: 'Florianópolis, SC',
      transactions: {
         pending: { items: [{ quantity: 11, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 7, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 14, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-027',
      yardName: 'Pátio SP Norte',
      name: 'BRU27.23-DP',
      validLots: 43,
      date: new Date('2024-06-10'),
      location: 'São Paulo, SP',
      transactions: {
         pending: { items: [{ quantity: 12, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 8, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 15, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-028',
      yardName: 'Pátio RJ Oeste',
      name: 'BRU28.23-DP',
      validLots: 45,
      date: new Date('2024-06-15'),
      location: 'Rio de Janeiro, RJ',
      transactions: {
         pending: { items: [{ quantity: 13, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 9, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 16, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-029',
      yardName: 'Pátio MG Leste',
      name: 'BRU29.23-DP',
      validLots: 47,
      date: new Date('2024-06-20'),
      location: 'Belo Horizonte, MG',
      transactions: {
         pending: { items: [{ quantity: 14, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 10, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 17, name: 'Transação 003' }] }
      }
   },
   {
      auctionCode: 'LEI-2024-030',
      yardName: 'Pátio RS Oeste',
      name: 'BRU30.23-DP',
      validLots: 49,
      date: new Date('2024-06-25'),
      location: 'Porto Alegre, RS',
      transactions: {
         pending: { items: [{ quantity: 15, name: 'Transação 001' }] },
         unfit: { items: [{ quantity: 11, name: 'Transação 002' }] },
         completed: { items: [{ quantity: 18, name: 'Transação 003' }] }
      }
   }
]

export default Dashboard
