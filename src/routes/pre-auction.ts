import {
   LotType,
   Step
} from '@/features/pre-auction/auction-maintenance/insert-lots/insert-lots'

export const pre_auction_routes = {
   index: '/pre-auction',
   auction_maintenance: '/pre-auction/auction-maintenance',
   operations_monitor: '/pre-auction/operations-monitor',
   create_auction: '/pre-auction/auction-maintenance/create-auction',
   edit_auction: (id: string) =>
      `/pre-auction/auction-maintenance/update-auction/${id}`,
   edit_auction_success: (id: string) =>
      `/pre-auction/auction-maintenance/update-auction/success/${id}`,
   create_auction_success: (id: string) =>
      `/pre-auction/auction-maintenance/create-auction/success/${id}`,
   auction_maintenance_list_lots: (id: string) =>
      `/pre-auction/auction-maintenance/auction-lots/${id}`,
   operation_monitor_details: (id: string) =>
      `/pre-auction/operations-monitor/${id}`,
   insert_lots: (id: string) =>
      `/pre-auction/auction-maintenance/insert-lots/${id}?step=${Step.STEP1}&lotType=${LotType.NEW}`,
   insert_lots_success: (id: string) =>
      `/pre-auction/auction-maintenance/insert-lots/success/${id}`,
   notify_owners: (id: string) =>
      `/pre-auction/auction-maintenance/notify-owners/${id}`
}
