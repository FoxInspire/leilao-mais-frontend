import * as React from 'react'

import { columns_notify_owners } from '@/src/features/pre-auction/auction-maintenance/notify-owners/components/columns'
import NotifyOwners from '@/src/features/pre-auction/auction-maintenance/notify-owners/notify-owners'
import { NotifyOwnersEntity } from '@/src/types/entities/notify-owners.entity'
import { readJSONFile } from '@/src/utils/file-path-utils'

export const dynamic = 'force-dynamic'

async function getNotifyOwners() {
   const data = (await readJSONFile(
      'src/features/pre-auction/auction-maintenance/mocks/notify-owners.json'
   )) as NotifyOwnersEntity[]
   return data
}

export default async function NotifyOwnersPage({
   params
}: {
   params: Promise<{ id: string }>
}) {
   const id = (await params).id
   const data = await getNotifyOwners()

   return (
      <React.Suspense>
         <NotifyOwners id={id} data={[]} columns={columns_notify_owners} />
      </React.Suspense>
   )
}
