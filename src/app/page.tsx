import { Button } from '@/components/ui/button'

import React from 'react'

export default function Home() {
   return (
      <React.Fragment>
         <Button variant="destructive">Click me</Button>
         <Button variant="default">Click me</Button>
         <Button variant="secondary">Click me</Button>
         <Button variant="outline">Click me</Button>
         <Button variant="ghost">Click me</Button>
         <Button variant="link">Click me</Button>
      </React.Fragment>
   )
}
