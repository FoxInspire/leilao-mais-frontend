import AuctionMaintenance from '@/src/features/auction-maintenance/auction-maintenance'

import * as React from 'react'

export default function AuctionMaintenancePage() {
   return (
      <React.Suspense>
         <AuctionMaintenance />
      </React.Suspense>
   )
}
