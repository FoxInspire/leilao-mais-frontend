export interface LotTransaction {
   id: string
   auctionLotId: string
   name: string
   status: string
   isLatest: boolean
   createdAt: Date
   updatedAt: Date
}

export interface Inspection {
   id: string
   auctionLotId: string
   status?: string
   evaluation?: number
   inspected?: boolean
   minimumBid?: number
   observations?: string
   createdAt: Date
   updatedAt: Date
   AuctionLot?: AuctionLot
}

export interface Characteristics {
   id: string
   inspected?: boolean
   origin?: string
   hasKey?: boolean
   mileage?: number
   transmission?: string
   hasAirConditioner?: boolean
   hasPowerSteering?: boolean
   hasElectricWindow?: boolean
   hasLock?: boolean
   hasTrailer?: boolean
   condition?: string
   hasGnvKit?: boolean
   plateCondition?: string
   vehicleCondition?: string
   chassisCondition?: string
   auctionLotId: string
   createdAt: Date
   updatedAt: Date
}

export interface FinancialDetails {
   id: string
   name?: string
   document?: string
   cep?: string
   address?: string
   addressNumber?: string
   addressComplement?: string
   neighborhood?: string
   addressState?: string
   addressCity?: string
   notifyByMail?: boolean
   auctionLotId: string
   createdAt: Date
   updatedAt: Date
}

export interface SaleNotification {
   id: string
   name?: string
   document?: string
   cep?: string
   address?: string
   number?: string
   complement?: string
   neighborhood?: string
   state?: string
   municipality?: string
   notifyByMail?: boolean
   auctionLotId: string
   createdAt: Date
   updatedAt: Date
}

export interface Bidder {
   id: string
   name: string
   document: string
   email?: string
   phone?: string
   address?: string
   addressNumber?: string
   addressComplement?: string
   neighborhood?: string
   addressState?: string
   addressCity?: string
   auctionLotId: string
   createdAt: Date
   updatedAt: Date
}

export interface AuctionLot {
   id: string
   lotNumber?: string
   itemNumber?: string
   location?: string
   evaluation?: number
   auctionId: string
   status: string
   minumumBid: number
   hasKey?: boolean
   km?: number
   ggvId: string
   createdAt: Date
   updatedAt: Date
   Auction?: AuctionEntity
   Ggv?: any
   Characteristics?: Characteristics
   FinancialDetails?: FinancialDetails
   SaleNotification?: SaleNotification
   LotTransaction?: LotTransaction[]
   Bidder?: Bidder[]
   Inspection?: Inspection[]
   LotHistory?: LotHistory[]
   VehicleDebt?: VehicleDebt[]
}

export interface Tenant {
   id: string
   name: string
   document: string
   email: string
   address: string
   addressNumber: string
   addressComplement?: string
   addressState: string
   addressCity: string
   patioCode: number
   municipioCode: number
   neighborhood: string
   phone: string
   createdAt: Date
   updatedAt: Date
   nfProvider: string | 'omie'
   nfProviderClientKey: string | null
   nfProviderClientSecret: string | null
   accountCCNumber?: string | null
   cityIbgeCode?: number | null
}

export interface LotHistory {
   id: string
   auctionLotId: string
   auctionId: string
   lotNumber?: string
   status?: string
   plate?: string
   chassis?: string
   term?: string
   auction?: string
   file?: string
   transaction?: string
   type?: string
   returnDate?: Date
   inclusionDate?: Date
   returnMessage?: string
   createdAt: Date
   updatedAt: Date
}

export interface VehicleDebt {
   id: string
   auctionId: string
   auctionLotId: string
   description?: string
   value?: number
   category?: string
   reference?: string
   createdAt: Date
   updatedAt: Date
}

export interface ExpenseReport {
   id: string
   auctionId: string
   description?: string
   value?: number
   createdAt: Date
   updatedAt: Date
}

export interface Auctioneer {
   id: string
   name: string
   document: string
   email?: string
   phone?: string
   createdAt: Date
   updatedAt: Date
}

export interface AuctionCompany {
   id: string
   name: string
   document: string
   email?: string
   phone?: string
   createdAt: Date
   updatedAt: Date
}

export interface Committee {
   id: string
   name: string
   document: string
   email?: string
   phone?: string
   createdAt: Date
   updatedAt: Date
}

export interface AuctionEntity {
   id: string
   auctionCode: string
   description: string
   auctionDate: Date
   cep: string
   address: string
   addressNumber: string
   addressComplement?: string
   neighborhood: string
   addressState: string
   addressCity: string
   scheduleDate: Date
   startRemovalDate: Date
   endRemovalDate: Date
   notificationDate: Date
   noticeDate: Date
   notificationEmails: string[]
   auctioneerId: string
   auctionCompanyId: string
   committeeId: string
   exhibitorId: string
   accountRule: string
   officialPublicationDate: Date
   officialPublicationNumber: string
   internalMatrixOrder?: string
   internalAuctionOrder?: string
   vehicleObservations?: string
   tenantId: string
   createdAt: Date
   updatedAt: Date
   AuctionLot?: AuctionLot[]
   Tenant: Tenant
   Auctioneer?: Auctioneer
   AuctionCompany?: AuctionCompany
   Committee?: Committee
   LotHistory?: LotHistory[]
   ExpenseReport?: ExpenseReport[]
   VehicleDebt?: VehicleDebt[]
}