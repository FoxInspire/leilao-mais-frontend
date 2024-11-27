export const dynamic = 'force-dynamic'

import * as React from 'react'
import * as z from 'zod'

import { columns } from '@/src/features/pre-auction/auction-maintenance/components/columns'
import { auctionEntitySchema } from '@/src/features/pre-auction/auction-maintenance/schemas/auction-maintenance-schemas'
import { promises as fs } from 'fs'

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
         'auctions-maintenance.json'
      )
   )
   const auctions = JSON.parse(data.toString())
   return z.array(auctionEntitySchema).parse(auctions)
}

export default async function AuctionMaintenancePage() {
   const auctions = await getAuctions()
   return (
      <React.Suspense>
         <AuctionMaintenance data={auctions} columns={columns} />
      </React.Suspense>
   )
}
