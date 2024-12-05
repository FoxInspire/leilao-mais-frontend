'use client'

import * as React from 'react'

import { cn } from '@/src/lib/utils'
import { AuctionEntity } from '@/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'

interface TransactionStatusProps {
   row: Row<AuctionEntity>
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
   row
}: TransactionStatusProps) => {
   const colors = {
      pending: 'bg-warning-default dark:bg-dark-warning-light',
      unfit: 'bg-error-default dark:bg-dark-error-default',
      completed: 'bg-success-default dark:bg-dark-success-default',
      awaiting:
         'bg-action-selected/10 text-black dark:text-dark-text-primary dark:bg-dark-action-selected/10'
   }
   return (
      <React.Fragment>
         <div
            className={cn(
               'px-2 py-0.5 flex flex-1 items-center justify-center rounded-3xl text-white',
               colors.awaiting
            )}
         >
            <span>Transação 003</span>
         </div>
      </React.Fragment>
   )
}
