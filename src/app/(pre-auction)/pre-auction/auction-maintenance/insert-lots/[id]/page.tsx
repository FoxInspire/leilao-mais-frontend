import * as React from 'react'

import { SelectInputValue } from '@/src/components/ui/select'
import { columns_insert_lots } from '@/src/features/pre-auction/auction-maintenance/insert-lots/components/columns'
import { InsertLots } from '@/src/features/pre-auction/auction-maintenance/insert-lots/insert-lots'
import { AuctionLot } from '@/src/types/entities/auction.entity'
import { readJSONFile } from '@/src/utils/file-path-utils'
import { ColumnDef } from '@tanstack/react-table'

export const dynamic = 'force-dynamic'

async function getCountries() {
   const data = (await readJSONFile(
      'src/mocks/countries.json'
   )) as SelectInputValue[]
   return data
}

async function getAuctions() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json'
   )) as typeof import('@/src/features/pre-auction/auction-maintenance/mocks/auctions-maintenance.json')
   return data
}

export default async function InsertLotsPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id
   const countries = await getCountries()
   const auctions = await getAuctions()
   const filteredAuctions = auctions.filter(
      (auction) => auction?.auctionCode?.toLowerCase() === id?.toLowerCase()
   )

   return (
      <React.Suspense>
         <InsertLots
            id={id}
            countries={countries}
            data={filteredAuctions}
            columns={columns_insert_lots as ColumnDef<AuctionLot>[]}
         />
      </React.Suspense>
   )
}
