import Dashboard from '@/src/features/dashboard/dashboard'

import * as React from 'react'

export default function OperationsMonitorPage() {
   return (
      <React.Suspense>
         <Dashboard />
      </React.Suspense>
   )
}
