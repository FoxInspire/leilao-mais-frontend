import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/src/components/ui/button'

export type CardProps = {
   /**
    * Código identificador único do leilão no formato LEI-YYYY-XXX
    * onde YYYY é o ano e XXX é um número sequencial
    * @example "LEI-2024-001"
    * @type {string}
    */
   auctionCode: string

   /**
    * Nome completo do pátio responsável pela realização do leilão,
    * incluindo a cidade/região onde está localizado
    * @example "Pátio Central SP"
    * @type {string}
    */
   yardName: string

   /**
    * Identificador comercial do leilão no formato BRUXX.YY-DP
    * onde XX é o número sequencial e YY é o ano
    * @example "BRU01.23-DP"
    * @type {string}
    */
   name: string

   /**
    * Número total de lotes disponíveis para lance no leilão,
    * excluindo lotes cancelados ou suspensos
    * @type {number}
    */
   validLots: number

   /**
    * Data de realização do evento principal do leilão
    * Utilizada para ordenação e filtragem dos leilões
    * @type {Date}
    */
   date: Date

   /**
    * Endereço onde o leilão será realizado,
    * no formato "Cidade, UF"
    * @example "São Paulo, SP"
    * @type {string}
    */
   location: string

   /**
    * Callback acionado quando o usuário clica no botão de edição
    * Deve abrir o formulário de edição do leilão
    * @type {() => void}
    */
   onEdit: () => void

   /**
    * Agrupamento das transações do leilão por status,
    * usado para exibir os indicadores visuais no card
    * @type {object}
    */
   transactions: {
      /**
       * Transações em processamento ou aguardando aprovação
       * Representadas pelo indicador amarelo
       */
      pending: {
         /** Lista de transações com suas quantidades e descrições */
         items: Array<{
            /** Número de itens afetados pela transação */
            quantity: number
            /** Descrição ou identificador da transação */
            name: string
         }>
      }
      /**
       * Transações rejeitadas ou com problemas
       * Representadas pelo indicador vermelho
       */
      unfit: {
         /** Lista de transações com suas quantidades e descrições */
         items: Array<{
            /** Número de itens afetados pela transação */
            quantity: number
            /** Descrição ou identificador da transação */
            name: string
         }>
      }
      /**
       * Transações finalizadas com sucesso
       * Representadas pelo indicador verde
       */
      completed: {
         /** Lista de transações com suas quantidades e descrições */
         items: Array<{
            /** Número de itens afetados pela transação */
            quantity: number
            /** Descrição ou identificador da transação */
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
      <div className="p-4 space-y-4 bg-white rounded-md border border-neutral-300 h-full">
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
         <div className="flex justify-between">
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
