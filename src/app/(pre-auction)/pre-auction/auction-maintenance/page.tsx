import * as React from 'react'

import { columns } from '@/src/features/pre-auction/auction-maintenance/components/columns'
import { auctionSchema } from '@/src/features/pre-auction/auction-maintenance/data/schema'
import { promises as fs } from 'fs'
import { z } from 'zod'

import AuctionMaintenance from '@/src/features/pre-auction/auction-maintenance/auction-maintenance'
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
         'auctions.json'
      )
   )
   const auctions = JSON.parse(data.toString())
   return z.array(auctionSchema).parse(auctions)
}

export default async function AuctionMaintenancePage() {
   const auctions = await getAuctions()
   return (
      <React.Suspense>
         <AuctionMaintenance data={auctions} columns={columns} />
      </React.Suspense>
   )
}
