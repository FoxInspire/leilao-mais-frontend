import * as React from 'react'

import { SelectInputValue } from '@/src/components/ui/select'
import { CreateAuction } from '@/src/features/pre-auction/auction-maintenance/create-auction'
import { readJSONFile } from '@/src/utils/file-path-utils'

export const dynamic = 'force-dynamic'

async function getCountries() {
   const data = (await readJSONFile(
      'src/mocks/countries.json'
   )) as SelectInputValue[]
   return data
}

export default async function AuctionMaintenancePage() {
   const countries = await getCountries()

   return (
      <React.Suspense>
         <CreateAuction countries={countries} />
      </React.Suspense>
   )
}
