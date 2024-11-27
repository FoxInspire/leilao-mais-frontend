import * as React from 'react'

import { columns } from '@/src/features/pre-auction/auction-maintenance/components/columns'
import { auctionEntitySchema } from '@/src/features/pre-auction/auction-maintenance/schemas/auction-maintenance-schemas'
import { promises as fs } from 'fs'
import { z } from 'zod'

import AuctionMaintenanceLots from '@/src/features/pre-auction/auction-maintenance/auction-maintenance-lots'
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

export default async function AuctionMaintenanceLotsPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id
   const auctions = await getAuctions()
   return (
      <React.Suspense>
         <AuctionMaintenanceLots id={id} data={auctions} columns={columns} />
      </React.Suspense>
   )
}
