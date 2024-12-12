import { AuctionEntity } from '@/types/entities/auction.entity'

export interface AvaliableLotEntity {
   id: string
   grvCode: string
   vehiclePlate: string
   vehicleChassis: string
   vehicleBrand: string
   vehicleType: string
   vehicleColor: string
   previousAuction?: AuctionEntity
   previousStatus: string
}

export interface AvaliableLotsFiltersInterface {
   pageNumber?: number
   pagesLimit?: number
   createdAt?: string
   patioId?: string
   daysForAuction?: number
   daysInPatio?: number
   lotStatus?: string
   grvCode?: string
   type?: 'new' | 'reusable'
   userId: string
   auctionId: string
}
