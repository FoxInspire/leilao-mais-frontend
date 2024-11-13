'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/src/components/ui/button'
import { Separator } from '@/src/components/ui/separator'

import React from 'react'

const Dashboard: React.FC = () => {
   return (
      <React.Fragment>
         <div className="space-y-6">
            <div className="space-y-2">
               <div className="flex justify-between items-center gap-2">
                  <h1 className="text-3xl font-bold font-montserrat">Dashboard</h1>
                  <span className="material-symbols-outlined text-action-active">
                     info
                  </span>
               </div>
               <Separator orientation="horizontal" />
            </div>
            <div>
               <Tabs>
                  <TabsList className="flex justify-between">
                     <div>
                        <TabsTrigger className="min-w-36" value="in-progress">
                           Em progresso
                        </TabsTrigger>
                        <TabsTrigger className="min-w-36" value="unfit">
                           Inaptos
                        </TabsTrigger>
                        <TabsTrigger className="min-w-36" value="completed">
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
                  <TabsContent
                     value="in-progress"
                     className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4"
                  >
                     <Card />
                     <Card />
                     <Card />
                     <Card />
                  </TabsContent>
                  <TabsContent value="unfit">Change your password here.</TabsContent>
                  <TabsContent value="completed">Concluídos</TabsContent>
               </Tabs>
            </div>
         </div>
      </React.Fragment>
   )
}

type CardProps = {
   /**
    * Código identificador único do leilão
    * @type {string}
    */
   auctionCode: string

   /**
    * Nome do pátio onde o leilão está acontecendo
    * @type {string}
    */
   yardName: string

   /**
    * Nome do leilão
    * @type {string}
    */
   name: string

   /**
    * Quantidade de lotes válidos no leilão
    * @type {number}
    */
   validLots: number

   /**
    * Data de realização do leilão
    * @type {Date}
    */
   date: Date

   /**
    * Local onde o leilão está acontecendo
    * @type {string}
    */
   location: string

   /**
    * Função callback para edição do leilão
    * @type {function}
    */
   onEdit: () => void

   /**
    * Objeto contendo informações sobre as transações do leilão
    * @type {object}
    */
   transactions: {
      /**
       * Transações em andamento
       */
      pending: {
         /** Quantidade de transações */
         quantity: number
         /** Status ou nome da transação */
         status: string
      }
      /**
       * Transações inaptas
       */
      unfit: {
         /** Quantidade de transações */
         quantity: number
         /** Status ou nome da transação */
         status: string
      }
      /**
       * Transações concluídas
       */
      completed: {
         /** Quantidade de transações */
         quantity: number
         /** Status ou nome da transação */
         status: string
      }
   }
}

const Card: React.FC<CardProps> = ({}) => {
   return <div className="p-4 bg-white rounded-md shadow-elevation-8">Card</div>
}

export default Dashboard
