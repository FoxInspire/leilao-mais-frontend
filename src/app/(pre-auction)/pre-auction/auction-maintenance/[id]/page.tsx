export const dynamic = 'force-dynamic'

import * as React from 'react'
import * as z from 'zod'

import { columns_auction_lots } from '@/src/features/pre-auction/auction-lots/components/columns'
import { auctionEntitySchema } from '@/src/features/pre-auction/auction-maintenance/schemas/auction-maintenance-schemas'
import { promises as fs } from 'fs'

import AuctionLots from '@/src/features/pre-auction/auction-lots/auction-lots'
import path from 'path'

async function getAuctions() {
   const data = await fs.readFile(
      path.join(
         process.cwd(),
         'src',
         'features',
         'pre-auction',
         'auction-maintenance',
         'mocks',
         'auctions-maintenance.json'
      )
   )
   const auctions = JSON.parse(data.toString())
   return z.lazy(() => z.array(auctionEntitySchema)).parse(auctions)
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
         <AuctionLots
            id={id}
            data={filteredAuctions}
            columns={columns_auction_lots}
         />
      </React.Suspense>
   )
}
