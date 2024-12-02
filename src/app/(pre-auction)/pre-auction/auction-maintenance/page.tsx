export const dynamic = 'force-dynamic'

import * as React from 'react'

import { columns } from '@/src/features/pre-auction/auction-maintenance/components/columns'
import { readJSONFile } from '@/src/utils/file-path-utils'

import AuctionMaintenance from '@/src/features/pre-auction/auction-maintenance/auction-maintenance'
import { AuctionEntity } from '@/src/types/entities/auction.entity'

async function getAuctions() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json'
   )) as AuctionEntity[]
   return data
}

export default async function AuctionMaintenancePage() {
   const auctions = await getAuctions()
   return (
      <React.Suspense>
         <AuctionMaintenance data={auctions} columns={columns} />
      </React.Suspense>
   )
}
