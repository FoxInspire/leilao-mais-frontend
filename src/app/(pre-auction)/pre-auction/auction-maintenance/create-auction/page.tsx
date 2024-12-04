import * as React from 'react'

import { CreateAuction } from '@/src/features/pre-auction/auction-maintenance/create-auction'

export const dynamic = 'force-dynamic'

export default async function AuctionMaintenancePage() {
   return (
      <React.Suspense>
         <CreateAuction />
      </React.Suspense>
   )
}
