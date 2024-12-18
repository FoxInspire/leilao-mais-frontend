import * as React from 'react'

import { UpdateLotSuccess } from '@/src/features/pre-auction/auction-maintenance/auction-lots/update-lot/update-lot-success'

export const dynamic = 'force-dynamic'

export default async function UpdateAuctionSuccessPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id

   return (
      <React.Suspense>
         <UpdateLotSuccess id={id} />
      </React.Suspense>
   )
}
