import {
   AuctionLot,
   Characteristics,
   FinancialDetails
} from '@/types/entities/auction.entity.ts'
import { faker } from '@faker-js/faker'

import fs from 'fs'
import path from 'path'

const statusOptions = [
   { value: 'pending', label: 'Pendente' },
   { value: 'approved', label: 'Aprovado' },
   { value: 'rejected', label: 'Rejeitado' },
   { value: 'in_progress', label: 'Em Andamento' }
]

const generateCharacteristics = (auctionLotId: string): Characteristics => ({
   id: faker.string.uuid(),
   inspected: faker.datatype.boolean(),
   origin: faker.helpers.arrayElement(['national', 'imported']),
   hasKey: faker.datatype.boolean(),
   mileage: faker.number.int({ min: 0, max: 200000 }),
   transmission: faker.helpers.arrayElement(['manual', 'automatic']),
   hasAirConditioner: faker.datatype.boolean(),
   hasPowerSteering: faker.datatype.boolean(),
   hasElectricWindow: faker.datatype.boolean(),
   hasLock: faker.datatype.boolean(),
   hasTrailer: faker.datatype.boolean(),
   condition: faker.helpers.arrayElement(['new', 'used', 'damaged']),
   hasGnvKit: faker.datatype.boolean(),
   plateCondition: faker.helpers.arrayElement(['good', 'damaged', 'missing']),
   vehicleCondition: faker.helpers.arrayElement(['running', 'not_running']),
   chassisCondition: faker.helpers.arrayElement([
      'original',
      'replaced',
      'damaged'
   ]),
   auctionLotId,
   createdAt: new Date(),
   updatedAt: new Date()
})

const generateFinancialDetails = (auctionLotId: string): FinancialDetails => ({
   id: faker.string.uuid(),
   name: faker.person.fullName(),
   document: faker.string.numeric(11),
   cep: faker.location.zipCode('########'),
   address: faker.location.street(),
   addressNumber: faker.location.buildingNumber(),
   addressComplement: faker.location.secondaryAddress(),
   neighborhood: faker.location.county(),
   addressState: faker.location.state(),
   addressCity: faker.location.city(),
   notifyByMail: faker.datatype.boolean(),
   auctionLotId,
   createdAt: new Date(),
   updatedAt: new Date()
})

const generateAuctionLot = (index: number): AuctionLot => {
   const id = faker.string.uuid()
   const auctionId = faker.string.uuid()

   return {
      id,
      lotNumber: `${index + 1}`.padStart(3, '0'),
      itemNumber: faker.string.numeric(5),
      location: faker.location.city(),
      evaluation: faker.number.float({ min: 5000, max: 100000 }),
      auctionId,
      status: faker.helpers.arrayElement(statusOptions).value,
      minumumBid: faker.number.float({ min: 1000, max: 10000 }),
      hasKey: faker.datatype.boolean(),
      km: faker.number.int({ min: 0, max: 200000 }),
      ggvId: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      Characteristics: generateCharacteristics(id),
      FinancialDetails: generateFinancialDetails(id),
      SaleNotification: {
         id: faker.string.uuid(),
         name: faker.person.fullName(),
         document: faker.string.numeric(11),
         cep: faker.location.zipCode('########'),
         address: faker.location.street(),
         number: faker.location.buildingNumber(),
         complement: faker.location.secondaryAddress(),
         neighborhood: faker.location.county(),
         state: faker.location.state(),
         municipality: faker.location.city(),
         notifyByMail: faker.datatype.boolean(),
         auctionLotId: id,
         createdAt: new Date(),
         updatedAt: new Date()
      },
      LotTransaction: Array.from(
         { length: faker.number.int({ min: 1, max: 3 }) },
         () => ({
            id: faker.string.uuid(),
            auctionLotId: id,
            name: faker.person.fullName(),
            status: faker.helpers.arrayElement(statusOptions).value,
            isLatest: faker.datatype.boolean(),
            createdAt: new Date(),
            updatedAt: new Date()
         })
      ),
      Bidder: Array.from(
         { length: faker.number.int({ min: 1, max: 5 }) },
         () => ({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            document: faker.string.numeric(11),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.street(),
            addressNumber: faker.location.buildingNumber(),
            addressComplement: faker.location.secondaryAddress(),
            neighborhood: faker.location.county(),
            addressState: faker.location.state(),
            addressCity: faker.location.city(),
            auctionLotId: id,
            createdAt: new Date(),
            updatedAt: new Date()
         })
      )
   }
}

export const generateAuctionLotsSeed = (length: number) =>
   Array.from({ length }, (_, index) => generateAuctionLot(index))

export const generateAuctionLotsData = () => {
   fs.writeFileSync(
      path.join(
         process.cwd(),
         'src',
         'features',
         'pre-auction',
         'auction-lots',
         'mocks',
         'auction-lots.json'
      ),
      JSON.stringify(generateAuctionLotsSeed(100), null, 2)
   )
}
