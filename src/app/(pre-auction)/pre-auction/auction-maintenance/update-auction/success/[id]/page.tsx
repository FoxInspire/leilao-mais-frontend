import * as React from 'react'

import { UpdateAuctionSuccess } from '@/src/features/pre-auction/auction-maintenance/update-auction/update-auction-success'

export const dynamic = 'force-dynamic'

export default async function UpdateAuctionSuccessPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id

   return (
      <React.Suspense>
         <UpdateAuctionSuccess id={id} />
      </React.Suspense>
   )
}
