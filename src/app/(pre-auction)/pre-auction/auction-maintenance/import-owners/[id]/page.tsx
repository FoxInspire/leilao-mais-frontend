import * as React from 'react'

import ImportOwners from '@/src/features/pre-auction/auction-maintenance/import-owners/import-owners'

export const dynamic = 'force-dynamic'

export default async function AuctionMaintenanceLotsPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id

   return (
      <React.Suspense>
         <ImportOwners id={id} />
      </React.Suspense>
   )
}
