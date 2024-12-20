import * as React from 'react'

import { columns } from '@/src/features/pre-auction/auction-maintenance/components/columns'
import { AuctionEntity } from '@/src/types/entities/auction.entity'
import { readJSONFile } from '@/src/utils/file-path-utils'

import PostAuction from '@/src/features/post-auction/post-auction'

export const dynamic = 'force-dynamic'

async function getAuctions() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json'
   )) as AuctionEntity[]
   return data
}

export default async function PostAuctionPage() {
   const auctions = await getAuctions()
   return (
      <React.Suspense>
         <PostAuction data={auctions} columns={columns} />
      </React.Suspense>
   )
}
