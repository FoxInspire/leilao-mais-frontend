import { AuctionEntity } from '@/types/entities/auction.entity'

export interface BidderEntity {
   id: string
   name: string
   document: string
   email: string
   phone: string
   address: string
   addressNumber: string
   addressComplement: string
   neighborhood: string
   addressState: string
   addressCity: string
   addressCep: string
   auctionLotId: string
   createdAt: Date
   updatedAt: Date
   AuctionLot?: AuctionEntity
   BidderInvoice?: BidderInvoiceEntity[]
}

export interface BidderInvoiceEntity {
   id: string
   bidderId: string
   email: string
   invoiceCode: string
   totalValue: number
   status: string
   creationDate: Date
   dueDate: Date
   items: string
   paymentDate: Date
   paymentMethod: string
   createdAt: Date
   updatedAt: Date
   Bidder?: BidderEntity
}
