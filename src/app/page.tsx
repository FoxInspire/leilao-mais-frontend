import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger
} from '@/components/ui/select'

import React from 'react'

export default function Home() {
   return (
      <React.Fragment>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Checkbox label="Sem Termo de Apreensão" />
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Select>
               <SelectTrigger hideIcon className="w-fit border-none p-0">
                  <Button asChild variant="ghost">
                     <div className="flex !flex-row items-center gap-2">
                        <span>Filtrar</span>
                        <span className="material-symbols-outlined text-[1.5rem]">
                           filter_alt
                        </span>
                     </div>
                  </Button>
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
               </SelectContent>
            </Select>
         </div>
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
