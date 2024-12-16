import * as React from 'react'

import { InsertLotsSuccess } from '@/src/features/pre-auction/auction-maintenance/insert-lots/insert-lots-success'

export const dynamic = 'force-dynamic'

export default async function InsertLotsSuccessPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id

   return (
      <React.Suspense>
         <InsertLotsSuccess id={id} />
      </React.Suspense>
   )
}
