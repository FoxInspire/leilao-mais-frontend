import * as React from 'react'

import { SelectInputValue } from '@/src/components/ui/select'
import { UpdateLot } from '@/src/features/pre-auction/auction-maintenance/auction-lots/update-lot/update-lot'
import { readJSONFile } from '@/src/utils/file-path-utils'

export const dynamic = 'force-dynamic'

async function getAuctions() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json'
   )) as typeof import('@/src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json')
   return data
}

async function getCountries() {
   const data = (await readJSONFile(
      'src/mocks/countries.json'
   )) as SelectInputValue[]
   return data
}

export default async function EditAuctionPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id
   const auctions = await getAuctions()
   const countries = await getCountries()
   const filteredAuction = auctions.find((auction) =>
      auction?.AuctionLot?.map((lot) => lot.lotNumber.toLowerCase()).includes(
         id.toLowerCase()
      )
   )

   if (!filteredAuction) {
      return console.error('Lot not found in auction.')
   }

   return (
      <React.Suspense>
         <UpdateLot
            id={id}
            countries={countries}
            defaultValues={filteredAuction}
         />
      </React.Suspense>
   )
}
