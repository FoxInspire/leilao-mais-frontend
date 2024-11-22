import * as React from 'react'

import { columns } from '@/src/features/auction-maintenance/components/columns'
import { promises as fs } from 'fs'
import { z } from 'zod'

import AuctionMaintenance from '@/src/features/auction-maintenance/auction-maintenance'
import path from 'path'

export const taskSchema = z.object({
   id: z.string(),
   date: z.string(),
   auction: z.string(),
   location: z.string(),
   status: z.string(),
   committer: z.string(),
   lots: z.number()
})

export type Task = z.infer<typeof taskSchema>

async function getTasks() {
   const data = await fs.readFile(path.join(process.cwd(), 'tasks.json'))
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
