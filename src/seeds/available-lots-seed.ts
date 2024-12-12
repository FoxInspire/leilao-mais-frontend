import { AuctionEntity } from '@/types/entities/auction.entity'
import { AvaliableLotEntity } from '@/types/entities/avaliable-lot.entity'
import { faker } from '@faker-js/faker'

import fs from 'fs'
import path from 'path'

const vehicleTypes = ['Carro', 'Moto', 'Caminhão', 'Van', 'Ônibus']

const vehicleBrands = {
   Carro: ['Volkswagen', 'Toyota', 'Fiat', 'Honda', 'Chevrolet'],
   Moto: ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Harley-Davidson'],
   Caminhão: ['Volvo', 'Mercedes-Benz', 'Scania', 'Iveco', 'MAN'],
   Van: ['Mercedes-Benz', 'Renault', 'Fiat', 'Peugeot', 'Citroën'],
   Ônibus: ['Marcopolo', 'Mercedes-Benz', 'Volvo', 'Scania', 'Volkswagen']
}

const vehicleColors = [
   'Preto',
   'Branco',
   'Prata',
   'Vermelho',
   'Azul',
   'Cinza',
   'Verde',
   'Amarelo'
]

const previousStatuses = [
   'unpaid_auction',
   'preserved',
   'fix_report',
   'police_station',
   'under_analysis',
   'canceled_grv',
   'inspection_identification',
   'unanalyzed_report'
]

const generateSimpleAuction = (): AuctionEntity => {
   const location = faker.helpers.arrayElement([
      { city: 'SÃO PAULO', state: 'SP' },
      { city: 'RIO DE JANEIRO', state: 'RJ' },
      { city: 'BELO HORIZONTE', state: 'MG' }
   ])

   return {
      id: faker.string.numeric(8),
      auctionCode: `${location.city.slice(0, 3).toLowerCase()}${faker.number
         .int({ min: 1, max: 99 })
         .toString()
         .padStart(2, '0')}.${new Date()
         .getFullYear()
         .toString()
         .slice(-2)}-DP`,
      description: faker.lorem.sentence(),
      auctionDate: faker.date.future(),
      address: faker.location.streetAddress(),
      addressCity: location.city,
      addressState: location.state,
      createdAt: new Date(),
      updatedAt: new Date(),
      Tenant: {
         id: faker.string.numeric(6),
         name: faker.company.name(),
         document: faker.string.numeric(14),
         email: faker.internet.email(),
         address: faker.location.streetAddress(),
         addressNumber: faker.location.buildingNumber(),
         addressState: location.state,
         addressCity: location.city,
         patioCode: faker.number.int({ min: 1000, max: 9999 }),
         municipioCode: faker.number.int({ min: 1000, max: 9999 }),
         createdAt: new Date(),
         updatedAt: new Date(),
         neighborhood: faker.location.county(),
         phone: faker.phone.number(),
         nfProvider: faker.helpers.arrayElement(['Sefaz', 'Nf-e', 'Nf-e-2']),
         nfProviderClientKey: faker.string.alphanumeric(10),
         nfProviderClientSecret: faker.string.alphanumeric(10)
      }
   } as AuctionEntity
}

const generateAvailableLot = (): AvaliableLotEntity => {
   const vehicleType = faker.helpers.arrayElement(
      vehicleTypes
   ) as keyof typeof vehicleBrands
   const vehicleBrand = faker.helpers.arrayElement(vehicleBrands[vehicleType])

   const hasPreviousAuction = Math.random() < 0.3
   const previousAuction = hasPreviousAuction
      ? generateSimpleAuction()
      : undefined

   return {
      id: faker.string.numeric(8),
      grvCode: faker.string.numeric(8),
      vehiclePlate: faker.string.alphanumeric(7).toUpperCase(),
      vehicleChassis: faker.string.alphanumeric(17).toUpperCase(),
      vehicleBrand,
      vehicleType,
      vehicleColor: faker.helpers.arrayElement(vehicleColors),
      previousStatus: faker.helpers.arrayElement(previousStatuses),
      previousAuction
   }
}

const generateAvailableLotsData = (numberOfLots: number = 100) => {
   const availableLots = Array.from({ length: numberOfLots }, () =>
      generateAvailableLot()
   )

   fs.writeFileSync(
      path.join(
         'src',
         'features',
         'pre-auction',
         'auction-maintenance',
         'mocks',
         'available-lots.json'
      ),
      JSON.stringify(availableLots, null, 2)
   )
}

if (require.main === module) {
   console.log('Generating available lots data...')
   generateAvailableLotsData(50)
   console.log('Available lots data generated successfully!')
}
