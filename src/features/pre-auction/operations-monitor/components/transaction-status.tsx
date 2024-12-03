import * as React from 'react'

import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'

interface TransactionStatusProps {
   row: Row<AuctionEntity>
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
   row
}: TransactionStatusProps) => {
   return <React.Fragment>Agendamento</React.Fragment>
}
