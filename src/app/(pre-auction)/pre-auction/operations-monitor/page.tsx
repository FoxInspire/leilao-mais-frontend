import * as React from 'react'

import { readMultipleJSONFiles } from '@/src/utils/file-path-utils'

import Dashboard from '@/src/features/dashboard/dashboard'

export const dynamic = 'force-dynamic'

async function getDashboardData() {
   const [filterOptions, transactionOptions, cardsMock] =
      (await readMultipleJSONFiles([
         '@/src/features/dashboard/mocks/filter-options.json',
         '@/src/features/dashboard/mocks/filter-transactions.json',
         '@/src/features/dashboard/mocks/cards-mock.json'
      ])) as [
         typeof import('@/src/features/dashboard/mocks/filter-options.json'),
         typeof import('@/src/features/dashboard/mocks/filter-transactions.json'),
         typeof import('@/src/features/dashboard/mocks/cards-mock.json')
      ]

   return {
      filterOptions,
      transactionOptions,
      cardsMock
   }
}

export default async function DashboardPage() {
   const { filterOptions, transactionOptions, cardsMock } =
      await getDashboardData()

   return (
      <React.Suspense>
         <Dashboard
            filterOptions={filterOptions.options}
            transactionOptions={transactionOptions.options}
            cardsMock={cardsMock}
         />
      </React.Suspense>
   )
}
