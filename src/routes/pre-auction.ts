export const pre_auction_routes = {
   index: '/pre-auction',
   auction_maintenance: '/pre-auction/auction-maintenance',
   operations_monitor: '/pre-auction/operations-monitor',
   operation_monitor_details: (id: string) =>
      `/pre-auction/auction-maintenance/${id}`,
   auction_maintenance_lots: (id: string) =>
      `/pre-auction/auction-maintenance/${id}`
}
