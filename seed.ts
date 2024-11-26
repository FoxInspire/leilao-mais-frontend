import { faker } from '@faker-js/faker'

import fs from 'fs'
import path from 'path'

const statuses = [
   { value: 'Montagem' },
   { value: 'Avaliação órgão' },
   { value: 'Confirmação de pagamento' }
]

const generateFutureDate = () => {
   const futureDate = faker.date.future()
   return futureDate.toLocaleDateString('pt-BR')
}

const brazilianCities = [
   { city: 'BRUMADO', state: 'BA' },
   { city: 'SALVADOR', state: 'BA' },
   { city: 'RECIFE', state: 'PE' },
   { city: 'FORTALEZA', state: 'CE' },
   { city: 'NATAL', state: 'RN' },
   { city: 'MACEIO', state: 'AL' },
   { city: 'ARACAJU', state: 'SE' },
   { city: 'TERESINA', state: 'PI' }
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

const generateTask = (index: number) => {
   const location = faker.helpers.arrayElement(brazilianCities)
   return {
      id: faker.number.int({ min: 1000, max: 9999 }).toString(),
      date: generateFutureDate(),
      auction: generateAuctionCode(location.city),
      location: `${location.city}/${location.state}`,
      status: faker.helpers.arrayElement(statuses).value,
      committer: 'PÁTIOS NORDESTE',
      lots: zeroLotsIndexes.has(index)
         ? 0
         : faker.helpers.arrayElement([
              ...Array.from({ length: 500 }, (_, i) => i + 1)
           ])
   }
}

const tasks = Array.from({ length: 100 }, (_, index) => generateTask(index))

const dir = path.resolve(
   __dirname,
   'src',
   'features',
   'pre-auction',
   'auction-maintenance',
   'mocks'
)

if (!fs.existsSync(dir)) {
   fs.mkdirSync(dir, { recursive: true })
}

fs.writeFileSync(
   path.join(dir, 'auctions.json'),
   JSON.stringify(tasks, null, 2)
)

console.log('✅ Auctions data generated successfully!')
