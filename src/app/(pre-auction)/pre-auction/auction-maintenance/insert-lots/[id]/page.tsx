import * as React from 'react'

import { columns_insert_lots } from '@/src/features/pre-auction/auction-maintenance/insert-lots/components/columns'
import { InsertLots } from '@/src/features/pre-auction/auction-maintenance/insert-lots/insert-lots'
import { AvaliableLotEntity } from '@/src/types/entities/avaliable-lot.entity'
import { readJSONFile } from '@/src/utils/file-path-utils'

export const dynamic = 'force-dynamic'

async function getAvailableLots() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/available-lots.json'
   )) as AvaliableLotEntity[]
   return data
}

export default async function InsertLotsPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id
   const availableLots = await getAvailableLots()

   return (
      <React.Suspense>
         <InsertLots
            id={id}
            data={availableLots}
            columns={columns_insert_lots}
         />
      </React.Suspense>
   )
}
