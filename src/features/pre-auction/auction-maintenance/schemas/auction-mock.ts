import { z } from 'zod'

export const auctionSchema = z.object({
   id: z.string(),
   date: z.string(),
   auction: z.string(),
   location: z.string(),
   status: z.string(),
   committer: z.string(),
   lots: z.number()
})

export type Auction = z.infer<typeof auctionSchema>
