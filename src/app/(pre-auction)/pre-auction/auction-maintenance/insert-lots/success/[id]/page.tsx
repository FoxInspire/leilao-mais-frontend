import * as React from 'react'

import { CreateAuctionSuccess } from '@/src/features/pre-auction/auction-maintenance/create-auction/create-auction-success'

export const dynamic = 'force-dynamic'

export default async function CreateAuctionSuccessPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id

   return (
      <React.Suspense>
         <CreateAuctionSuccess id={id} />
      </React.Suspense>
   )
}
