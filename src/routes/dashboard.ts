import { pre_auction_routes } from './pre-auction'

export const dashboard_routes = {
   index: '/dashboard',
   pre_auction: pre_auction_routes,
   post_auction: {
      index: '/post-auction'
   }
}
