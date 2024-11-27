import { z } from 'zod'
import { AuctionLot } from '../types/auction.entity.ts'

export const lotTransactionSchema = z.object({
   id: z.string(),
   auctionLotId: z.string(),
   name: z.string(),
   status: z.string(),
   isLatest: z.boolean(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const inspectionSchema = z.object({
   id: z.string(),
   auctionLotId: z.string(),
   status: z.string().optional(),
   evaluation: z.number().optional(),
   inspected: z.boolean().optional(),
   minimumBid: z.number().optional(),
   observations: z.string().optional(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date(),
   AuctionLot: z.lazy(() => auctionLotSchema).optional()
})

export const characteristicsSchema = z.object({
   id: z.string(),
   inspected: z.boolean().optional(),
   origin: z.string().optional(),
   hasKey: z.boolean().optional(),
   mileage: z.number().optional(),
   transmission: z.string().optional(),
   hasAirConditioner: z.boolean().optional(),
   hasPowerSteering: z.boolean().optional(),
   hasElectricWindow: z.boolean().optional(),
   hasLock: z.boolean().optional(),
   hasTrailer: z.boolean().optional(),
   condition: z.string().optional(),
   hasGnvKit: z.boolean().optional(),
   plateCondition: z.string().optional(),
   vehicleCondition: z.string().optional(),
   chassisCondition: z.string().optional(),
   auctionLotId: z.string(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const financialDetailsSchema = z.object({
   id: z.string(),
   name: z.string().optional(),
   document: z.string().optional(),
   cep: z.string().optional(),
   address: z.string().optional(),
   addressNumber: z.string().optional(),
   addressComplement: z.string().optional(),
   neighborhood: z.string().optional(),
   addressState: z.string().optional(),
   addressCity: z.string().optional(),
   notifyByMail: z.boolean().optional(),
   auctionLotId: z.string(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const saleNotificationSchema = z.object({
   id: z.string(),
   name: z.string().optional(),
   document: z.string().optional(),
   cep: z.string().optional(),
   address: z.string().optional(),
   number: z.string().optional(),
   complement: z.string().optional(),
   neighborhood: z.string().optional(),
   state: z.string().optional(),
   municipality: z.string().optional(),
   notifyByMail: z.boolean().optional(),
   auctionLotId: z.string(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const bidderSchema = z.object({
   id: z.string(),
   name: z.string(),
   document: z.string(),
   email: z.string().optional(),
   phone: z.string().optional(),
   address: z.string().optional(),
   addressNumber: z.string().optional(),
   addressComplement: z.string().optional(),
   neighborhood: z.string().optional(),
   addressState: z.string().optional(),
   addressCity: z.string().optional(),
   auctionLotId: z.string(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const vehicleDebtSchema = z.object({
   id: z.string(),
   auctionId: z.string(),
   auctionLotId: z.string(),
   description: z.string().optional(),
   value: z.number().optional(),
   category: z.string().optional(),
   reference: z.string().optional(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const lotHistorySchema = z.object({
   id: z.string(),
   auctionLotId: z.string(),
   auctionId: z.string(),
   lotNumber: z.string().optional(),
   status: z.string().optional(),
   plate: z.string().optional(),
   chassis: z.string().optional(),
   term: z.string().optional(),
   auction: z.string().optional(),
   file: z.string().optional(),
   transaction: z.string().optional(),
   type: z.string().optional(),
   returnDate: z.coerce.date().optional(),
   inclusionDate: z.coerce.date().optional(),
   returnMessage: z.string().optional(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export type AuctionLotSchema = z.ZodType<AuctionLot>

export const auctionLotSchema: AuctionLotSchema = z.object({
   id: z.string(),
   lotNumber: z.string().optional(),
   itemNumber: z.string().optional(),
   location: z.string().optional(),
   evaluation: z.number().optional(),
   auctionId: z.string(),
   status: z.string(),
   minumumBid: z.number(),
   hasKey: z.boolean().optional(),
   km: z.number().optional(),
   ggvId: z.string(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date(),
   Auction: z.lazy(() => auctionEntitySchema).optional(),
   Ggv: z.any().optional(),
   Characteristics: characteristicsSchema.optional(),
   FinancialDetails: financialDetailsSchema.optional(),
   SaleNotification: saleNotificationSchema.optional(),
   LotTransaction: z.array(lotTransactionSchema).optional(),
   Bidder: z.array(bidderSchema).optional(),
   Inspection: z.array(inspectionSchema).optional(),
   LotHistory: z.array(lotHistorySchema).optional(),
   VehicleDebt: z.array(vehicleDebtSchema).optional()
})

export const tenantSchema = z.object({
   id: z.string(),
   name: z.string(),
   document: z.string(),
   email: z.string(),
   address: z.string(),
   addressNumber: z.string(),
   addressComplement: z.string().optional(),
   addressState: z.string(),
   addressCity: z.string(),
   patioCode: z.number(),
   municipioCode: z.number(),
   neighborhood: z.string(),
   phone: z.string(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date(),
   nfProvider: z.union([z.string(), z.literal('omie')]),
   nfProviderClientKey: z.string().nullable(),
   nfProviderClientSecret: z.string().nullable(),
   accountCCNumber: z.string().nullable().optional(),
   cityIbgeCode: z.number().nullable().optional()
})

export const expenseReportSchema = z.object({
   id: z.string(),
   auctionId: z.string(),
   description: z.string().optional(),
   value: z.number().optional(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const auctioneerSchema = z.object({
   id: z.string(),
   name: z.string(),
   document: z.string(),
   email: z.string().optional(),
   phone: z.string().optional(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const auctionCompanySchema = z.object({
   id: z.string(),
   name: z.string(),
   document: z.string(),
   email: z.string().optional(),
   phone: z.string().optional(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const committeeSchema = z.object({
   id: z.string(),
   name: z.string(),
   document: z.string(),
   email: z.string().optional(),
   phone: z.string().optional(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date()
})

export const auctionEntitySchema = z.object({
   id: z.string(),
   auctionCode: z.string(),
   description: z.string(),
   auctionDate: z.coerce.date(),
   cep: z.string(),
   address: z.string(),
   addressNumber: z.string(),
   addressComplement: z.string().optional(),
   neighborhood: z.string(),
   addressState: z.string(),
   addressCity: z.string(),
   scheduleDate: z.coerce.date(),
   startRemovalDate: z.coerce.date(),
   endRemovalDate: z.coerce.date(),
   notificationDate: z.coerce.date(),
   noticeDate: z.coerce.date(),
   notificationEmails: z.array(z.string()),
   auctioneerId: z.string(),
   auctionCompanyId: z.string(),
   committeeId: z.string(),
   exhibitorId: z.string(),
   accountRule: z.string(),
   officialPublicationDate: z.coerce.date(),
   officialPublicationNumber: z.string(),
   internalMatrixOrder: z.string().optional(),
   internalAuctionOrder: z.string().optional(),
   vehicleObservations: z.string().optional(),
   tenantId: z.string(),
   createdAt: z.coerce.date(),
   updatedAt: z.coerce.date(),
   AuctionLot: z.array(auctionLotSchema).optional(),
   Tenant: tenantSchema,
   Auctioneer: auctioneerSchema.optional(),
   AuctionCompany: auctionCompanySchema.optional(),
   Committee: committeeSchema.optional(),
   LotHistory: z.array(lotHistorySchema).optional(),
   ExpenseReport: z.array(expenseReportSchema).optional(),
   VehicleDebt: z.array(vehicleDebtSchema).optional()
})

export type AuctionEntity = z.infer<typeof auctionEntitySchema>
