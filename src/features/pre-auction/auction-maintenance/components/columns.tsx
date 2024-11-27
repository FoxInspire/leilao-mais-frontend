'use client'

import { StatusCell } from '@/features/pre-auction/auction-maintenance/components/status-cell'
import { Button } from '@/src/components/ui/button'
import { pre_auction_routes } from '@/src/routes/pre-auction'
import { ColumnDef } from '@tanstack/react-table'
import { AuctionEntity } from '../types/auction.entity.ts'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import Link from 'next/link'
import React from 'react'

export const columns: ColumnDef<AuctionEntity>[] = [
   {
      accessorKey: 'auctionDate',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Data" />
      ),
      cell: ({ row }) => (
         <div>
            {new Date(row.getValue('auctionDate')).toLocaleDateString('pt-BR')}
         </div>
      )
   },
   {
      accessorKey: 'auctionCode',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Leilão" />
      ),
      cell: ({ row }) => (
         <div className="font-bold font-nunito text-primary-default dark:text-dark-primary-default uppercase hover:underline">
            <Link
               href={pre_auction_routes.auction_maintenance_lots(
                  row.getValue('auctionCode')
               )}
            >
               {row.getValue('auctionCode')}
            </Link>
         </div>
      )
   },
   {
      accessorKey: 'addressCity',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Local" />
      ),
      cell: ({ row }) => <div>{row.getValue('addressCity')}</div>
   },
   {
      accessorKey: 'id',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div>{row.getValue('id')}</div>
   },
   {
      accessorKey: 'auctionStatus',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Status do leilão" />
      ),
      cell: ({ row }) => <StatusCell row={row} />
   },
   {
      accessorKey: 'Tenant',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Comitente" />
      ),
      cell: ({ row }) => <div>{row.original.Tenant?.name}</div>
   },
   {
      accessorKey: 'lotCount',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Lotes" />
      ),
      cell: ({ row }) => (
         <React.Fragment>
            {!row.original.AuctionLot?.length ? (
               <Button variant="icon" size="icon">
                  <span className="material-symbols-outlined">add</span>
               </Button>
            ) : (
               <span className="font-bold font-nunito text-black dark:text-white">
                  {row.original.AuctionLot.length}
               </span>
            )}
         </React.Fragment>
      )
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <DataTableRowActions
            row={row}
            onSelect={(value) => console.log(value)}
         />
      )
   }
]
