import * as React from 'react'

import { SelectInputValue } from '@/src/components/ui/select'
import { InsertLots } from '@/src/features/pre-auction/auction-maintenance/insert-lots/insert-lots'
import { readJSONFile } from '@/src/utils/file-path-utils'

export const dynamic = 'force-dynamic'

async function getCountries() {
   const data = (await readJSONFile(
      'src/mocks/countries.json'
   )) as SelectInputValue[]
   return data
}

export default async function AuctionMaintenanceLotsPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id
   const countries = await getCountries()

   return (
      <React.Suspense>
         <InsertLots id={id} countries={countries} />
      </React.Suspense>
   )
}
