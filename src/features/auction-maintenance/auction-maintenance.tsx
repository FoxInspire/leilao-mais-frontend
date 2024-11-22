import * as React from 'react'

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const AuctionMaintenance: React.FC = () => {
   return (
      <React.Fragment>
         <Breadcrumb>
            <BreadcrumbList>
               <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator />
               <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator />
               <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
               </BreadcrumbItem>
            </BreadcrumbList>
         </Breadcrumb>
      </React.Fragment>
   )
}

export default AuctionMaintenance
