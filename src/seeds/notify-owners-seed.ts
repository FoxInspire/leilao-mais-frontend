import { NotifyOwnersEntity } from '@/types/entities/notify-owners.entity'
import { faker } from '@faker-js/faker'

import fs from 'fs'
import path from 'path'

const generateNotifyOwner = (): NotifyOwnersEntity => {
   return {
      id: faker.string.uuid(),
      vehiclePlate: faker.string.alphanumeric(7).toUpperCase(),
      vehicleChassis: faker.string.alphanumeric(17).toUpperCase(),
      ownerName: faker.person.fullName(),
      communication: faker.helpers.arrayElement([
         'Notificação enviada',
         'Aguardando envio',
         'Falha no envio',
         'AR não retornou',
         'Proprietário não encontrado'
      ]),
      financial: faker.helpers.arrayElement([
         'Sem débitos',
         'Com débitos',
         'Em análise',
         'Pendente de pagamento',
         'Regularizado'
      ])
   }
}

const generateNotifyOwnersData = (numberOfRecords: number = 50) => {
   const notifyOwners = Array.from({ length: numberOfRecords }, () =>
      generateNotifyOwner()
   )

   fs.writeFileSync(
      path.join(
         process.cwd(),
         'src',
         'features',
         'pre-auction',
         'auction-maintenance',
         'mocks',
         'notify-owners.json'
      ),
      JSON.stringify(notifyOwners, null, 2)
   )
}

if (require.main === module) {
   console.log('Generating notify owners data...')
   generateNotifyOwnersData()
   console.log('Notify owners data generated successfully!')
}
