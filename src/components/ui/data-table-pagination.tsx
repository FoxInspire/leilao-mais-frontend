'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select'
import { Table } from '@tanstack/react-table'

interface DataTablePaginationProps<TData> {
   table: Table<TData>
   per_page?: number
}

export function DataTablePagination<TData>({
   table,
   per_page = 10
}: DataTablePaginationProps<TData>) {
   React.useEffect(() => {
      table.setPageSize(per_page)
   }, [per_page, table])

   return (
      <React.Fragment>
         <div className="flex items-center justify-end px-2">
            <div className="flex items-center space-x-6 lg:space-x-8">
               <div className="flex items-center space-x-2">
                  <Select
                     value={`${table.getState().pagination.pageSize}`}
                     onValueChange={(value) => {
                        table.setPageSize(Number(value))
                     }}
                  >
                     <SelectTrigger className="h-8 w-[70px] dark:border-white/10">
                        <SelectValue placeholder={per_page} />
                     </SelectTrigger>
                     <SelectContent side="top">
                        {[
                           per_page,
                           per_page * 2,
                           per_page * 3,
                           per_page * 4,
                           per_page * 5
                        ].map((pageSize) => (
                           <SelectItem key={pageSize} value={`${pageSize}`}>
                              {pageSize}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
               <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
               </div>
               <div className="flex items-center space-x-2">
                  <Button
                     variant="outline"
                     className="hidden h-8 w-8 p-0 lg:flex rounded-full"
                     onClick={() => table.setPageIndex(0)}
                     disabled={!table.getCanPreviousPage()}
                  >
                     <span className="sr-only">Go to first page</span>
                     <span className="material-symbols-outlined">
                        first_page
                     </span>
                  </Button>
                  <Button
                     variant="outline"
                     className="h-8 w-8 p-0 rounded-full"
                     onClick={() => table.previousPage()}
                     disabled={!table.getCanPreviousPage()}
                  >
                     <span className="sr-only">Go to previous page</span>
                     <span className="material-symbols-outlined">
                        chevron_left
                     </span>
                  </Button>
                  <Button
                     variant="outline"
                     className="h-8 w-8 p-0 rounded-full"
                     onClick={() => table.nextPage()}
                     disabled={!table.getCanNextPage()}
                  >
                     <span className="sr-only">Go to next page</span>
                     <span className="material-symbols-outlined">
                        chevron_right
                     </span>
                  </Button>
                  <Button
                     variant="outline"
                     className="hidden h-8 w-8 p-0 lg:flex rounded-full"
                     onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                     }
                     disabled={!table.getCanNextPage()}
                  >
                     <span className="sr-only">Go to last page</span>
                     <span className="material-symbols-outlined">
                        last_page
                     </span>
                  </Button>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}
