'use client'

import * as React from 'react'

import { DataTableColumnHeader } from '@/features/pre-auction/auction-maintenance/components/data-table-column-header'
import { Button } from '@/src/components/ui/button'
import { NotifyOwnersEntity } from '@/src/types/entities/notify-owners.entity'
import { ColumnDef } from '@tanstack/react-table'

export const columns_notify_owners: ColumnDef<NotifyOwnersEntity>[] = [
   {
      accessorKey: 'vehiclePlate',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Placa" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.vehiclePlate}</div>
      }
   },
   {
      accessorKey: 'vehicleChassis',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Chassi" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.vehicleChassis}</div>
      }
   },
   {
      accessorKey: 'ownerName',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Proprietário" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.ownerName}</div>
      }
   },
   {
      accessorKey: 'financial',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Financeira" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.financial}</div>
      }
   },
   {
      accessorKey: 'communication',
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Comunicado venda" />
      ),
      cell: ({ row }) => {
         return <div>{row.original.communication}</div>
      }
   },
   {
      id: 'actions',
      cell: ({ row }) => {
         return (
            <React.Fragment>
               <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-secondary hover:bg-primary-default/10 dark:text-dark-primary-default dark:hover:bg-dark-primary-default/10 group transition-all duration-300"
               >
                  <span className="material-symbols-outlined group-hover:text-primary-default">
                     edit
                  </span>
               </Button>
            </React.Fragment>
         )
      }
   }
]
