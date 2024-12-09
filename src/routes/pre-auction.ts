export const pre_auction_routes = {
   index: '/pre-auction',
   auction_maintenance: '/pre-auction/auction-maintenance',
   operations_monitor: '/pre-auction/operations-monitor',
   create_auction: '/pre-auction/auction-maintenance/create-auction',
   edit_auction: (id: string) =>
      `/pre-auction/auction-maintenance/edit-auction/${id}`,
   edit_auction_success: (id: string) =>
      `/pre-auction/auction-maintenance/edit-auction/success/${id}`,
   create_auction_success: (id: string) =>
      `/pre-auction/auction-maintenance/create-auction/success/${id}`,
   operation_monitor_details: (id: string) =>
      `/pre-auction/operations-monitor/${id}`,
   auction_maintenance_lots: (id: string) =>
      `/pre-auction/auction-maintenance/${id}`
}
