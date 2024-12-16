import {
   LotType,
   Step
} from '@/features/pre-auction/auction-maintenance/insert-lots/insert-lots'

export const pre_auction_routes = {
   index: '/pre-auction',
   auction_maintenance: '/pre-auction/auction-maintenance',
   operations_monitor: '/pre-auction/operations-monitor',

   auction: {
      create: '/pre-auction/auction-maintenance/create-auction',
      create_success: (id: string) =>
         `/pre-auction/auction-maintenance/create-auction/success/${id}`,

      edit: (id: string) =>
         `/pre-auction/auction-maintenance/update-auction/${id}`,
      edit_success: (id: string) =>
         `/pre-auction/auction-maintenance/update-auction/success/${id}`,

      list_lots: (id: string) =>
         `/pre-auction/auction-maintenance/auction-lots/${id}`,
      insert_lots: (id: string) =>
         `/pre-auction/auction-maintenance/insert-lots/${id}?step=${Step.STEP1}&lotType=${LotType.NEW}`,
      insert_lots_success: (id: string) =>
         `/pre-auction/auction-maintenance/insert-lots/success/${id}`,

      notify_owners: (id: string) =>
         `/pre-auction/auction-maintenance/notify-owners/${id}`,
      notify_owners_success: (id: string) =>
         `/pre-auction/auction-maintenance/notify-owners/success/${id}`
   },

   operations: {
      details: (id: string) => `/pre-auction/operations-monitor/${id}`
   }
}
