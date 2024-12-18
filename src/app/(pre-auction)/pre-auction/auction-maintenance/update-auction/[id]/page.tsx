import * as React from 'react'

import { SelectInputValue } from '@/src/components/ui/select'
import { UpdateAuction } from '@/src/features/pre-auction/auction-maintenance/update-auction/update-auction'
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
   const filteredAuction = auctions.find(
      (auction) => auction?.auctionCode?.toLowerCase() === id?.toLowerCase()
   )

   if (!filteredAuction) {
      return console.error('Auction not found.')
   }

   return (
      <React.Suspense>
         <UpdateAuction
            id={id}
            countries={countries}
            defaultValues={filteredAuction}
         />
      </React.Suspense>
   )
}
