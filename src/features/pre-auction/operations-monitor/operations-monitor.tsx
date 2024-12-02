'use client'

import * as React from 'react'

import { ColumnDef } from '@tanstack/react-table'

interface OperationsMonitorProps {
   columns: ColumnDef<any>[]
   data: any[]
}

export const OperationsMonitor: React.FC<OperationsMonitorProps> = ({
   columns,
   data
}: OperationsMonitorProps) => {
   return <div>OperationsMonitor</div>
}
