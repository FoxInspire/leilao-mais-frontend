'use client'

import { DataTableColumnHeader } from '@/src/components/ui/data-table-column-header'
import { ColumnDef } from '@tanstack/react-table'

interface PostAuctionColumnProps {
   auction: string
   location: string
   auctionStatus: string
   committee: string
   bidders: string[]
}

export const columns_post_auction_listing: ColumnDef<PostAuctionColumnProps>[] =
   [
      {
         accessorKey: 'auction',
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Leilão" />
         ),
         cell: ({ row }) => <div>{row.getValue('auction')}</div>
      },
      {
         accessorKey: 'location',
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Local" />
         ),
         cell: ({ row }) => <div>{row.getValue('location')}</div>
      },
      {
         accessorKey: 'auctionStatus',
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status do leilão" />
         ),
         cell: ({ row }) => <div>{row.getValue('addressCity')}</div>
      },
      {
         accessorKey: 'committee',
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Comitente" />
         ),
         cell: ({ row }) => <div>{row.getValue('committee')}</div>
      },
      {
         accessorKey: 'bidders',
         header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Arrematantes" />
         ),
         cell: ({ row }) => <div>{row.getValue('bidders')}</div>
      },
      {
         id: 'actions'
         //  cell: ({ row }) => <DataTableRowActions row={[]} />
      }
   ]
