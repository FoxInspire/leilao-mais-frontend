import * as React from 'react'

import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { Row } from '@tanstack/react-table'

interface ScheduleStatusProps {
   row: Row<AuctionEntity>
}

export const ScheduleStatus: React.FC<ScheduleStatusProps> = ({
   row
}: ScheduleStatusProps) => {
   return <React.Fragment>Agendamento</React.Fragment>
}
