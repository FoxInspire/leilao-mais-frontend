import Dashboard from '@/src/features/dashboard/dashboard'

import * as React from 'react'

export default function OperationsMonitor() {
   return (
      <React.Suspense>
         <Dashboard />
      </React.Suspense>
   )
}
