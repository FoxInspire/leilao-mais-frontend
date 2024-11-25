import { statuses } from '@/src/features/pre-auction/auction-maintenance/data/data'
import { faker } from '@faker-js/faker'

import fs from 'fs'
import path from 'path'

const generateFutureDate = () => {
   const futureDate = faker.date.future()
   return futureDate.toLocaleDateString('pt-BR')
}

const generateTask = () => ({
   id: `LEILAO-${faker.number.int({ min: 1000, max: 9999 })}`,
   date: generateFutureDate(),
   auction: faker.helpers.arrayElement([
      'Leilão Judicial',
      'Leilão Extrajudicial',
      'Leilão de Veículos',
      'Leilão de Imóveis',
      'Leilão de Equipamentos',
      'Leilão de Bens Diversos'
   ]),
   location: `${faker.location.city()}, ${faker.location.state()}`,
   status: faker.helpers.arrayElement(statuses).value,
   committer: faker.company.name(),
   lots: faker.number.int({ min: 1, max: 500 })
})

const tasks = Array.from({ length: 100 }, generateTask)

fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2))

console.log('✅ Tasks data generated.')
