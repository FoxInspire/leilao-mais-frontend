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
