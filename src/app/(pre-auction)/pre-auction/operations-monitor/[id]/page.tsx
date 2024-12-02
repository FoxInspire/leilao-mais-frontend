import * as React from 'react'

import { columns_auction_lots } from '@/src/features/pre-auction/auction-lots/components/columns'
import { readJSONFile } from '@/src/utils/file-path-utils'
import { AuctionLot } from '@/types/entities/auction.entity'
import { ColumnDef } from '@tanstack/react-table'

import { OperationsMonitor } from '@/src/features/pre-auction/operations-monitor/operations-monitor'

export const dynamic = 'force-dynamic'

async function getAuctions() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json'
   )) as typeof import('@/src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json')
   return data
}

export default async function AuctionMaintenanceLotsPage({
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
         <OperationsMonitor
            id={id}
            data={filteredAuctions}
            columns={columns_auction_lots as ColumnDef<AuctionLot>[]}
         />
      </React.Suspense>
   )
}
