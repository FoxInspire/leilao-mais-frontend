import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/src/components/ui/button'

export type CardProps = {
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
         /** Lista de transações pendentes */
         items: Array<{
            /** Quantidade de transações */
            quantity: number
            /** Nome da transação */
            name: string
         }>
      }
      /**
       * Transações inaptas
       */
      unfit: {
         /** Lista de transações inaptas */
         items: Array<{
            /** Quantidade de transações */
            quantity: number
            /** Nome da transação */
            name: string
         }>
      }
      /**
       * Transações concluídas
       */
      completed: {
         /** Lista de transações concluídas */
         items: Array<{
            /** Quantidade de transações */
            quantity: number
            /** Nome da transação */
            name: string
         }>
      }
   }
}

export const Card: React.FC<CardProps> = ({
   auctionCode,
   date,
   name,
   yardName,
   validLots,
   transactions,
   location,
   onEdit
}) => {
   const formatTransactionsList = (
      items: Array<{ quantity: number; name: string }>
   ) => {
      return items.map((item) => `${item.quantity} - ${item.name}`).join('\n')
   }

   const hasTransactions = (items: Array<{ quantity: number; name: string }>) => {
      return items.some((item) => item.quantity > 0)
   }

   return (
      <div className="p-4 space-y-4 bg-white rounded-md shadow-elevation-8 h-full">
         <div className="flex justify-between items-center">
            <div className="flex flex-col items-start">
               <span className="text-base font-normal text-black">
                  {auctionCode}
               </span>
               <span className="text-base font-normal text-text-secondary">
                  {yardName}
               </span>
            </div>
            <Button variant="ghost" size="icon" className="my-auto" onClick={onEdit}>
               <span className="material-symbols-outlined filled text-text-secondary">
                  edit
               </span>
            </Button>
         </div>
         <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold">{name}</span>
            <div className="flex gap-2">
               {hasTransactions(transactions.pending.items) && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger>
                           <div className="w-3.5 h-3.5 rounded-full bg-action-active/10" />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p className="whitespace-pre">
                              {formatTransactionsList(transactions.pending.items)}
                           </p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
               {hasTransactions(transactions.unfit.items) && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger>
                           <div className="w-3.5 h-3.5 rounded-full bg-error-default" />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p className="whitespace-pre">
                              {formatTransactionsList(transactions.unfit.items)}
                           </p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
               {hasTransactions(transactions.completed.items) && (
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger>
                           <div className="w-3.5 h-3.5 rounded-full bg-success-default" />
                        </TooltipTrigger>
                        <TooltipContent>
                           <p className="whitespace-pre">
                              {formatTransactionsList(transactions.completed.items)}
                           </p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               )}
            </div>
         </div>
         <div className="grid grid-cols-3">
            <div className="flex flex-col">
               <span className="text-base font-normal text-text-secondary">
                  Lotes válidos
               </span>
               <span className="text-base font-normal text-black">{validLots}</span>
            </div>
            <div className="flex flex-col">
               <span className="text-base font-normal text-text-secondary">
                  Data
               </span>
               <span className="text-base font-normal text-black">
                  {date.toLocaleDateString()}
               </span>
            </div>
            <div className="flex flex-col">
               <span className="text-base font-normal text-text-secondary">
                  Local
               </span>
               <span className="text-base font-normal text-black">{location}</span>
            </div>
         </div>
      </div>
   )
}
