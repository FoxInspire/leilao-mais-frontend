import * as React from 'react'

import { columns_operation_monitor_details } from '@/src/features/pre-auction/operations-monitor/components/columns'
import { OperationsMonitorDetails } from '@/src/features/pre-auction/operations-monitor/operations-monitor-details'
import { readJSONFile } from '@/src/utils/file-path-utils'
import { AuctionEntity, AuctionLot } from '@/types/entities/auction.entity'
import { ColumnDef } from '@tanstack/react-table'

export const dynamic = 'force-dynamic'

async function getAuctions() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json'
   )) as AuctionEntity[]
   return data
}

export default async function OperationsMonitorDetailsPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id
   const auctions = await getAuctions()
   const filteredAuctions = auctions.filter(
      (auction) => auction?.auctionCode?.toLowerCase() === id?.toLowerCase()
   )

   return (
      <React.Suspense>
         <OperationsMonitorDetails
            id={id}
            data={filteredAuctions}
            columns={
               columns_operation_monitor_details as ColumnDef<AuctionLot>[]
            }
         />
      </React.Suspense>
   )
}
