import {
   AuctionEntity,
   AuctionLot,
   Auctioneer,
   Committee,
   ExpenseReport,
   LotHistory,
   VehicleDebt
} from '@/features/pre-auction/auction-maintenance/types/auction.entity.ts'
import { faker } from '@faker-js/faker'

import fs from 'fs'
import path from 'path'

const statusOptions = [
   { value: 'assembly', label: 'Montagem' },
   { value: 'organs_evaluation', label: 'Avaliação órgão' },
   { value: 'payment_confirmation', label: 'Confirmação de pagamento' }
]

const statuses = statusOptions.map((option) => ({ value: option.value }))

const brazilianCities = [
   { city: 'MANAUS', state: 'AM' },
   { city: 'BELÉM', state: 'PA' },
   { city: 'PORTO VELHO', state: 'RO' },
   { city: 'PALMAS', state: 'TO' },
   { city: 'SALVADOR', state: 'BA' },
   { city: 'RECIFE', state: 'PE' },
   { city: 'FORTALEZA', state: 'CE' },
   { city: 'NATAL', state: 'RN' },
   { city: 'JOÃO PESSOA', state: 'PB' },
   { city: 'MACEIÓ', state: 'AL' },
   { city: 'ARACAJU', state: 'SE' },
   { city: 'SÃO LUÍS', state: 'MA' },
   { city: 'TERESINA', state: 'PI' },
   { city: 'BRASÍLIA', state: 'DF' },
   { city: 'GOIÂNIA', state: 'GO' },
   { city: 'CUIABÁ', state: 'MT' },
   { city: 'CAMPO GRANDE', state: 'MS' },
   { city: 'SÃO PAULO', state: 'SP' },
   { city: 'RIO DE JANEIRO', state: 'RJ' },
   { city: 'BELO HORIZONTE', state: 'MG' },
   { city: 'VITÓRIA', state: 'ES' },
   { city: 'CURITIBA', state: 'PR' },
   { city: 'FLORIANÓPOLIS', state: 'SC' },
   { city: 'PORTO ALEGRE', state: 'RS' }
]

const generateAuctionCode = (city: string) => {
   const prefix = city.slice(0, 3).toLowerCase()
   const num = faker.number.int({ min: 1, max: 99 }).toString().padStart(2, '0')
   const year = new Date().getFullYear().toString().slice(-2)
   return `${prefix}${num}.${year}-DP`
}

const zeroLotsIndexes = new Set<number>()
while (zeroLotsIndexes.size < 8) {
   zeroLotsIndexes.add(faker.number.int({ min: 0, max: 99 }))
}

const generateBrazilianCEP = () => {
   const cep = faker.number.int({ min: 10000000, max: 99999999 }).toString()
   return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}

const generateBrazilianPhone = () => {
   const ddd = faker.number.int({ min: 11, max: 99 }).toString()
   const number = faker.number
      .int({ min: 900000000, max: 999999999 })
      .toString()
   return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`
}

const parseDate = (dateString: string): Date => {
   const [day, month, year] = dateString.split('/').map(Number)
   return new Date(year, month - 1, day)
}

const generateTask = (index: number): AuctionEntity => {
   const location = faker.helpers.arrayElement(brazilianCities)

   const baseAuction = {
      id: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionCode: generateAuctionCode(location.city),
      description: faker.lorem.sentence(),
      auctionDate: parseDate(faker.date.future().toLocaleDateString('pt-BR')),
      cep: generateBrazilianCEP(),
      address: faker.location.street(),
      addressNumber: faker.number.int({ min: 1, max: 9999 }).toString(),
      addressComplement: faker.helpers.arrayElement([
         'Sala',
         'Loja',
         'Galpão',
         ''
      ]),
      neighborhood: faker.location.county(),
      addressState: location.state,
      addressCity: location.city,
      scheduleDate: parseDate(faker.date.future().toLocaleDateString('pt-BR')),
      startRemovalDate: parseDate(
         faker.date.future().toLocaleDateString('pt-BR')
      ),
      endRemovalDate: parseDate(
         faker.date.future().toLocaleDateString('pt-BR')
      ),
      notificationDate: parseDate(
         faker.date.future().toLocaleDateString('pt-BR')
      ),
      noticeDate: parseDate(faker.date.future().toLocaleDateString('pt-BR')),
      notificationEmails: [faker.internet.email()],
      auctioneerId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionCompanyId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      committeeId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      exhibitorId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      accountRule: faker.lorem.word(),
      officialPublicationDate: parseDate(
         faker.date.future().toLocaleDateString('pt-BR')
      ),
      officialPublicationNumber: faker.number
         .int({ min: 1000, max: 9999 })
         .toString(),
      internalMatrixOrder: faker.lorem.word(),
      internalAuctionOrder: faker.lorem.word(),
      vehicleObservations: faker.lorem.sentence(),
      tenantId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      Tenant: {
         id: faker.number.int({ min: 1000, max: 9999 }).toString(),
         name: faker.company.name(),
         document: faker.string.uuid(),
         email: faker.internet.email(),
         address: faker.location.streetAddress(),
         addressNumber: faker.location.buildingNumber(),
         addressComplement: faker.location.secondaryAddress(),
         addressState: location.state,
         addressCity: location.city,
         patioCode: faker.number.int({ min: 1000, max: 9999 }),
         municipioCode: faker.number.int({ min: 1000, max: 9999 }),
         neighborhood: faker.location.county(),
         phone: faker.phone.number(),
         createdAt: new Date(),
         updatedAt: new Date(),
         nfProvider: 'omie',
         nfProviderClientKey: null,
         nfProviderClientSecret: null,
         accountCCNumber: null,
         cityIbgeCode: null
      }
   }

   const auctioneer: Auctioneer = {
      id: baseAuction.auctioneerId,
      name: faker.person.fullName(),
      document: faker.string.numeric(11),
      email: faker.internet.email(),
      phone: generateBrazilianPhone(),
      createdAt: new Date(),
      updatedAt: new Date()
   }

   const auctionCompany = {
      id: baseAuction.auctionCompanyId,
      name: faker.company.name(),
      document: faker.string.numeric(14),
      email: faker.internet.email(),
      phone: generateBrazilianPhone(),
      createdAt: new Date(),
      updatedAt: new Date()
   }

   const committee: Committee = {
      id: baseAuction.committeeId,
      name: faker.person.fullName(),
      document: faker.string.numeric(11),
      email: faker.internet.email(),
      phone: generateBrazilianPhone(),
      createdAt: new Date(),
      updatedAt: new Date()
   }

   const lotHistory: LotHistory[] = Array.from({ length: 3 }, () => ({
      id: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionLotId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionId: baseAuction.id,
      returnDate: new Date(),
      inclusionDate: new Date(),
      status: faker.helpers.arrayElement(statuses).value,
      createdAt: new Date(),
      updatedAt: new Date()
   }))

   const expenseReports: ExpenseReport[] = Array.from({ length: 2 }, () => ({
      id: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionLotId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionId: baseAuction.id,
      description: faker.lorem.sentence(),
      value: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }),
      createdAt: new Date(),
      updatedAt: new Date()
   }))

   const vehicleDebts: VehicleDebt[] = Array.from({ length: 2 }, () => ({
      id: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionLotId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionId: baseAuction.id,
      description: faker.lorem.sentence(),
      value: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }),
      createdAt: new Date(),
      updatedAt: new Date()
   }))

   const auctionLots: AuctionLot[] = Array.from({ length: 5 }, (_, index) => ({
      id: `${baseAuction.id}-${index}-${faker.number.int({
         min: 1000,
         max: 9999
      })}`,
      auctionId: baseAuction.id,
      lotNumber: faker.number.int({ min: 1, max: 999 }).toString(),
      description: faker.lorem.sentence(),
      initialValue: faker.number.float({
         min: 1000,
         max: 10000,
         fractionDigits: 2
      }),
      minimumValue: faker.number.float({
         min: 500,
         max: 5000,
         fractionDigits: 2
      }),
      minumumBid: faker.number.float({
         min: 100,
         max: 1000,
         fractionDigits: 2
      }),
      ggvId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      status:
         statusOptions[
            faker.number.int({ min: 0, max: statusOptions.length - 1 })
         ].value,
      createdAt: new Date(),
      updatedAt: new Date()
   }))

   return {
      ...baseAuction,
      AuctionLot: auctionLots,
      Auctioneer: auctioneer,
      AuctionCompany: auctionCompany,
      Committee: committee,
      LotHistory: lotHistory,
      ExpenseReport: expenseReports,
      VehicleDebt: vehicleDebts
   }
}

const tasks = Array.from({ length: 200 }, (_, index) => generateTask(index))

const tasksWithZeroLots = tasks.map((task, index) => {
   if (zeroLotsIndexes.has(index)) {
      return {
         ...task,
         AuctionLot: [
            {
               id: `${task.id}-0-${faker.number.int({ min: 1000, max: 9999 })}`,
               auctionId: task.id,
               lotNumber: '1',
               status: statusOptions[0].value,
               minumumBid: faker.number.float({
                  min: 100,
                  max: 1000,
                  fractionDigits: 2
               }),
               ggvId: faker.number.int({ min: 1000, max: 9999 }).toString(),
               createdAt: new Date(),
               updatedAt: new Date()
            }
         ]
      }
   }
   return task
})

fs.writeFileSync(
   path.join(
      process.cwd(),
      'src',
      'features',
      'pre-auction',
      'auction-maintenance',
      'mocks',
      'auctions-maintenance.json'
   ),
   JSON.stringify(tasksWithZeroLots, null, 2)
)
