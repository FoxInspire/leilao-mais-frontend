import * as React from 'react'

import { SearchOperations } from '@/src/features/pre-auction/operations-monitor/search-operations'
import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { readJSONFile } from '@/src/utils/file-path-utils'

export const dynamic = 'force-dynamic'

async function getAuctions() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json'
   )) as AuctionEntity[]
   return data
}

export default async function DashboardPage() {
   const auctions = await getAuctions()
   return (
      <React.Suspense>
         <SearchOperations auctions={auctions} />
      </React.Suspense>
   )
}
