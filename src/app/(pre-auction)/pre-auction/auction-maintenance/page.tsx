import * as React from 'react'

import { columns } from '@/src/features/auction-maintenance/components/columns'
import { promises as fs } from 'fs'
import { z } from 'zod'

import AuctionMaintenance from '@/src/features/auction-maintenance/auction-maintenance'
import path from 'path'

export const taskSchema = z.object({
   id: z.string(),
   title: z.string(),
   status: z.string(),
   label: z.string(),
   priority: z.string()
})

export type Task = z.infer<typeof taskSchema>

async function getTasks() {
   const data = await fs.readFile(
      path.join(process.cwd(), 'src/features/auction-maintenance/mocks/tasks.json')
   )

   const tasks = JSON.parse(data.toString())

   return z.array(taskSchema).parse(tasks)
}

export default async function AuctionMaintenancePage() {
   const tasks = await getTasks()
   return (
      <React.Suspense>
         <AuctionMaintenance data={tasks} columns={columns} />
      </React.Suspense>
   )
}
