import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import React from 'react'

export default function Home() {
   return (
      <React.Fragment>
         <div className="m-2 rounded-md p-2 border border-primary-default border-dashed">
            <Button variant="destructive">Click me</Button>
            <Button variant="default">Click me</Button>
            <Button variant="secondary">Click me</Button>
            <Button variant="outline">Click me</Button>
            <Button variant="ghost">Click me</Button>
            <Button variant="link">Click me</Button>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Input label="E-mail" placeholder="Placeholder" type="text" />
            <Input label="Label" placeholder="Placeholder" type="password" />
            <Input label="Email" type="email" />
            <Input label="Email" type="email" error="Error" />
            <Input label="Email" type="email" disabled />
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Accordion type="single" collapsible>
               <AccordionItem value="item-1">
                  <AccordionTrigger>Pré-leilão</AccordionTrigger>
                  <AccordionContent>Opções de pré-leilão</AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </React.Fragment>
   )
}
