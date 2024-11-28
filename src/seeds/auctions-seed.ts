import {
   AuctionEntity,
   AuctionLot,
   Auctioneer,
   Committee,
   ExpenseReport,
   LotHistory,
   VehicleDebt
} from '@/types/entities/auction.entity'
import { VehicleEntity } from '@/types/entities/vehicle.entity'
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

const vehicleTypes = [
   { id: '1', name: 'Carro', description: 'Veículo de passeio' },
   { id: '2', name: 'Moto', description: 'Motocicleta' },
   { id: '3', name: 'Caminhão', description: 'Veículo de carga' },
   { id: '4', name: 'Van', description: 'Veículo utilitário' },
   { id: '5', name: 'Ônibus', description: 'Veículo de transporte coletivo' }
]

const vehicleBrands = [
   { id: '1', name: 'Volkswagen', typeVehicle: '1' },
   { id: '2', name: 'Honda', typeVehicle: '2' },
   { id: '3', name: 'Volvo', typeVehicle: '3' },
   { id: '4', name: 'Toyota', typeVehicle: '1' },
   { id: '5', name: 'Yamaha', typeVehicle: '2' },
   { id: '6', name: 'Mercedes-Benz', typeVehicle: '3' },
   { id: '7', name: 'Fiat', typeVehicle: '1' },
   { id: '8', name: 'Suzuki', typeVehicle: '2' },
   { id: '9', name: 'Scania', typeVehicle: '3' },
   { id: '10', name: 'Renault', typeVehicle: '4' },
   { id: '11', name: 'Marcopolo', typeVehicle: '5' }
]

const vehicleStatusOptions = [
   { value: 'unpaid_auction', label: 'Arrematação não paga' },
   { value: 'preserved', label: 'Conservado' },
   { value: 'fix_report', label: 'Corrigir laudo' },
   { value: 'police_station', label: 'Delegacia' },
   { value: 'disassociated_payment', label: 'Desassociado boleto' },
   { value: 'under_analysis', label: 'Em análise' },
   { value: 'canceled_grv', label: 'GRV cancelada' },
   { value: 'inspection_identification', label: 'Ident na vistoria' },
   { value: 'unanalyzed_report', label: 'Laudo não analisado' },
   { value: 'auctioned_preserved', label: 'Leiloado - conservado' },
   { value: 'auctioned_usable_scrap', label: 'Leiloado - sucata aproveitavel' },
   {
      value: 'auctioned_usable_scrap_unusable_engine',
      label: 'Leiloado - sucata aproveitavel com motor inservível'
   },
   {
      value: 'auctioned_unusable_scrap_identified',
      label: 'Leiloado - sucata inservível identificada'
   },
   {
      value: 'auctioned_unusable_scrap_unidentified',
      label: 'Leiloado - sucata inservível não identificada'
   },
   {
      value: 'lot_auctioned_other_auction',
      label: 'Lote arrematado em outro leilão'
   },
   { value: 'expertise_not_performed', label: 'Pericia não realizada' },
   {
      value: 'expertise_without_publication',
      label: 'Periciado sem publicação'
   },
   { value: 'removed_from_auction', label: 'Removido de leilão' },
   { value: 'administrative_restriction', label: 'Restrição administrativa' },
   { value: 'judicial_restriction', label: 'Restrição judicial' },
   { value: 'theft_restriction', label: 'Restrição roubo/furto' },
   { value: 'no_notification_return', label: 'Sem retorno de notificação' },
   { value: 'clone_suspicion', label: 'Suspeita de clone' },
   { value: 'vehicle_written_off', label: 'Veículo baixado' },
   { value: 'vehicle_released', label: 'Veículo liberado' },
   { value: 'vehicle_not_found', label: 'Veículo não localizado' }
]

const zeroLotsIndexes = new Set<number>()
while (zeroLotsIndexes.size < 8) {
   zeroLotsIndexes.add(faker.number.int({ min: 0, max: 99 }))
}

const generateAuctionCode = (city: string) => {
   const prefix = city.slice(0, 3).toLowerCase()
   const num = faker.number.int({ min: 1, max: 99 }).toString().padStart(2, '0')
   const year = new Date().getFullYear().toString().slice(-2)
   return `${prefix}${num}.${year}-DP`
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

const generateVehicleData = (): VehicleEntity => {
   const selectedType = faker.helpers.arrayElement(vehicleTypes)
   const compatibleBrands = vehicleBrands.filter(
      (brand) => brand.typeVehicle === selectedType.id
   )
   const selectedBrand = faker.helpers.arrayElement(compatibleBrands)

   return {
      id: faker.string.uuid(),
      name: faker.vehicle.model(),
      description: faker.vehicle.type(),
      chassis: faker.string.numeric(17).toUpperCase(),
      plate: faker.string.numeric(7).toUpperCase(),
      status: faker.helpers.arrayElement(vehicleStatusOptions).value,
      type: {
         id: selectedType.id,
         name: selectedType.name,
         description: selectedType.description,
         category: {
            id: faker.string.uuid(),
            name: faker.helpers.arrayElement([
               'Básico',
               'Luxo',
               'Premium',
               'Especial',
               'Executivo'
            ]),
            type: selectedType.name,
            dailyValue: faker.number.float({
               min: 100,
               max: 1000,
               fractionDigits: 2
            }),
            towingCost: faker.number.float({
               min: 200,
               max: 800,
               fractionDigits: 2
            })
         }
      },
      brand: {
         id: selectedBrand.id,
         name: selectedBrand.name,
         typeVehicle: selectedBrand.typeVehicle
      },
      model: {
         id: faker.string.uuid(),
         name: faker.vehicle.model(),
         brandId: selectedBrand.id
      },
      equipments: Array.from(
         { length: faker.number.int({ min: 2, max: 6 }) },
         () => ({
            id: faker.string.uuid(),
            name: faker.helpers.arrayElement([
               'GPS',
               'Ar Condicionado',
               'Câmera de Ré',
               'Sensor de Estacionamento',
               'Airbag',
               'Freios ABS',
               'Controle de Tração',
               'Piloto Automático',
               'Central Multimídia',
               'Bancos em Couro'
            ]),
            code: faker.number.int({ min: 1000, max: 9999 }),
            required: faker.datatype.boolean(),
            vehicleTypes: [selectedType.id],
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
         })
      ),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent()
   }
}

const generateAuctionsSeed = (): AuctionEntity => {
   const location = faker.helpers.arrayElement(brazilianCities)

   const baseAuction = {
      id: faker.number.int({ min: 1000, max: 9999 }).toString(),
      auctionCode: generateAuctionCode(location.city)?.toUpperCase(),
      description: faker.lorem.sentence(),
      auctionDate: parseDate(faker.date.future().toLocaleDateString('pt-BR')),
      cep: generateBrazilianCEP(),
      address: faker.location.street(),
      addressNumber: faker.number.int({ min: 1, max: 9999 }).toString(),
      addressComplement: faker.helpers.arrayElement(['Sala', 'Loja', 'Galpão']),
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

   const auctionLots: AuctionLot[] = Array.from({ length: 5 }, (_, index) => {
      const vehicle = generateVehicleData()

      return {
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
         status: faker.helpers.arrayElement(statusOptions).value,
         Vehicle: vehicle,
         createdAt: new Date(),
         updatedAt: new Date()
      }
   })

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

export const generateAuctionsData = () => {
   const auctions = Array.from({ length: 200 }, () => generateAuctionsSeed())

   const auctionsWithZeroLots = auctions.map(
      (auction: AuctionEntity, index) => {
         if (zeroLotsIndexes.has(index)) {
            const vehicle = generateVehicleData()
            return {
               ...auction,
               AuctionLot: [
                  {
                     id: `${auction.id}-0-${faker.number.int({
                        min: 1000,
                        max: 9999
                     })}`,
                     auctionId: auction.id,
                     lotNumber: '1',
                     status: statusOptions[0].value,
                     minumumBid: faker.number.float({
                        min: 100,
                        max: 1000,
                        fractionDigits: 2
                     }),
                     ggvId: faker.number
                        .int({ min: 1000, max: 9999 })
                        .toString(),
                     Vehicle: vehicle,
                     createdAt: new Date(),
                     updatedAt: new Date()
                  }
               ]
            }
         }
         return auction
      }
   )

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
      JSON.stringify(auctionsWithZeroLots, null, 2)
   )
}

export default generateAuctionsData
