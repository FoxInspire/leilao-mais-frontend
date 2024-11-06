'use client'

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

import React from 'react'

const ThemeSwitch = () => {
   const { theme, setTheme } = useTheme()

   return (
      <div className="w-full h-full flex flex-col justify-center items-center">
         <div className="flex justify-center items-center">
            <span>
               <svg
                  className={cn('h-6 w-6', {
                     'text-primary-default': theme !== 'dark',
                     'text-dark-primary-default': theme === 'dark'
                  })}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
               </svg>
            </span>

            <div
               className={cn(
                  'w-14 h-7 flex items-center rounded-full mx-3 px-1 cursor-pointer transition-colors duration-200 ease-in-out',
                  theme === 'dark' ? 'bg-dark-primary-default' : 'bg-primary-default'
               )}
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
               <div
                  className={cn(
                     'bg-common-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out',
                     theme === 'dark' && 'translate-x-7'
                  )}
               />
            </div>

            <span>
               <svg
                  className={cn('h-6 w-6', {
                     'text-primary-default': theme !== 'dark',
                     'text-dark-primary-default': theme === 'dark'
                  })}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
               </svg>
            </span>
         </div>
      </div>
   )
}

export default function Home() {
   return (
      <React.Fragment>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <ThemeSwitch />
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>Hover</TooltipTrigger>
                  <TooltipContent>
                     <p className="text-sm text-white">Add to library</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Drawer direction="right">
               <DrawerTrigger>Open</DrawerTrigger>
               <DrawerContent className="max-w-xl bg-white fixed w-[40rem] h-screen overflow-y-scroll overflow-x-hidden flex flex-col top-0 right-0 z-[1000] py-12 2xl:py-14 px-12 focus:outline-none">
                  <DrawerHeader>
                     <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                     <DrawerDescription>
                        This action cannot be undone.
                     </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                     <Button>Submit</Button>
                     <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                     </DrawerClose>
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <div>
               <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Leilão Mais</h4>
                  <p className="text-sm text-muted-foreground">
                     Sistema completo para gestão de leilões automotivos.
                  </p>
               </div>
               <Separator className="my-4" />
               <div className="flex h-5 items-center space-x-4 text-sm">
                  <div>Início</div>
                  <Separator orientation="vertical" />
                  <div>Sobre</div>
                  <Separator orientation="vertical" />
                  <div>Contato</div>
               </div>
            </div>
         </div>
         <div className="m-2 rounded-md p-2 border space-y-4 border-primary-default border-dashed">
            <Tabs defaultValue="account" className="w-[400px]">
               <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
               </TabsList>
               <TabsContent value="account">
                  Make changes to your account here.
               </TabsContent>
               <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
         </div>
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
         <div className="m-2 rounded-md p-2 border border-primary-default border-dashed space-y-2">
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
