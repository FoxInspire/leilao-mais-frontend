import * as React from 'react'

import { readJSONFile } from '@/src/utils/file-path-utils'

export const dynamic = 'force-dynamic'

async function getAuctions() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json'
   )) as typeof import('@/src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json')
   return data
}

export default async function EditAuctionPage({
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
         {/* <AuctionLots
            id={id}
            data={filteredAuctions}
            columns={columns_auction_lots as ColumnDef<AuctionLot>[]}
         /> */}
         <div>
            <h1>Edit Auction</h1>
            <p>Auction Code: {id}</p>
         </div>
      </React.Suspense>
   )
}
