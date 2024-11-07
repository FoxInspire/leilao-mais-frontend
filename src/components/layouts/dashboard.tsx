'use client'

import * as React from 'react'

import { LogoComplete, LogoSimplified } from '@/components/icons/logo'
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarHeader,
   SidebarInset,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
   SidebarProvider,
   SidebarRail,
   useSidebar
} from '@/components/ui/sidebar'
import { cn } from '@/src/lib/utils'
import { usePathname } from 'next/navigation'

import Link from 'next/link'

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
   children
}: React.PropsWithChildren) => {
   const pathname = usePathname()
   const isActiveRoute = (url: string) => pathname === url

   return (
      <section>
         <SidebarProvider>
            <Sidebar hasHeaderMenu collapsible="icon">
               <SidebarHeader>
                  <LogoSwitcher />
               </SidebarHeader>
               <SidebarContent>
                  <SidebarGroup>
                     <SidebarMenu className="gap-3">
                        {data.menuItems.map((item) =>
                           item.items && item.items.length > 0 ? (
                              <Collapsible
                                 key={item.title}
                                 asChild
                                 defaultOpen={item.isActive}
                                 className="group/collapsible"
                              >
                                 <SidebarMenuItem>
                                    <CollapsibleTrigger className="h-10" asChild>
                                       <SidebarMenuButton tooltip={item.title}>
                                          {item.icon &&
                                             renderIcon(
                                                item.icon,
                                                cn('w-6 h-6 block', {
                                                   'text-primary-default':
                                                      item.items.some((subItem) =>
                                                         isActiveRoute(subItem.url)
                                                      )
                                                })
                                             )}
                                          <span
                                             className={cn('text-sm font-medium', {
                                                'text-primary-default':
                                                   item.items.some((subItem) =>
                                                      isActiveRoute(subItem.url)
                                                   )
                                             })}
                                          >
                                             {item.title}
                                          </span>
                                          <div
                                             className={cn(
                                                'material-symbols-outlined shrink-0 transition-transform duration-200 origin-center text-action-active w-6 h-6 block !text-[24px]',
                                                'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-90'
                                             )}
                                          >
                                             keyboard_arrow_down
                                          </div>
                                       </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                       <SidebarMenuSub>
                                          {item.items.map((subItem) => (
                                             <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                   <Link href={subItem.url}>
                                                      <span
                                                         className={cn(
                                                            'text-sm font-normal',
                                                            {
                                                               'text-primary-default':
                                                                  isActiveRoute(
                                                                     subItem.url
                                                                  )
                                                            }
                                                         )}
                                                      >
                                                         {subItem.title}
                                                      </span>
                                                   </Link>
                                                </SidebarMenuSubButton>
                                             </SidebarMenuSubItem>
                                          ))}
                                       </SidebarMenuSub>
                                    </CollapsibleContent>
                                 </SidebarMenuItem>
                              </Collapsible>
                           ) : (
                              <SidebarMenuItem key={item.title}>
                                 <SidebarMenuButton className="h-10" asChild>
                                    <Link href={item.url}>
                                       {item.icon &&
                                          renderIcon(
                                             item.icon,
                                             cn('w-6 h-6 block', {
                                                'text-primary-default':
                                                   isActiveRoute(item.url)
                                             })
                                          )}
                                       <span
                                          className={cn('text-sm font-medium', {
                                             'text-primary-default': isActiveRoute(
                                                item.url
                                             )
                                          })}
                                       >
                                          {item.title}
                                       </span>
                                    </Link>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           )
                        )}
                     </SidebarMenu>
                  </SidebarGroup>
               </SidebarContent>
               <SidebarRail />
            </Sidebar>
            <SidebarInset className="p-6">{children}</SidebarInset>
         </SidebarProvider>
      </section>
   )
}

const data = {
   menuItems: [
      {
         title: 'Dashboard',
         url: '#',
         icon: (
            <span className="material-symbols-outlined filled !text-[24px] leading-6 w-6 h-6 block">
               space_dashboard
            </span>
         )
      },
      {
         title: 'Pré-leilão',
         url: '#',
         icon: (
            <span className="material-symbols-outlined !text-[24px] leading-6 w-6 h-6 block">
               monitor
            </span>
         ),
         isActive: true,
         items: [
            {
               title: 'Manutenção de leilões',
               url: '#'
            },
            {
               title: 'Monitor de operações',
               url: '/dashboard'
            }
         ]
      },
      {
         title: 'Pós-leilão',
         url: '#',
         icon: (
            <span className="material-symbols-outlined filled !text-[24px] leading-6 w-6 h-6 block">
               star
            </span>
         )
      }
   ] as MenuItemType[]
}

type IconType = React.ComponentType<{ className?: string }>

interface MenuItemType {
   title: string
   url: string
   icon: IconType | JSX.Element
   isActive?: boolean
   items?: MenuItemType[]
}

const renderIcon = (icon: IconType | JSX.Element, className?: string) => {
   if (React.isValidElement(icon)) {
      if ((icon as React.ReactElement).type === 'span') {
         return React.cloneElement(icon as React.ReactElement, {
            className: cn(
               (icon as React.ReactElement).props.className,
               className,
               'w-6 h-6 block'
            )
         })
      }
      return icon
   }
   const IconComponent = icon as IconType
   return <IconComponent className={cn(className, 'w-6 h-6 block')} />
}

const LogoSwitcher: React.FC = () => {
   const { state } = useSidebar()

   return (
      <div
         className={cn('flex items-center justify-center h-full', {
            'pt-6': state === 'expanded',
            'py-6': state === 'collapsed'
         })}
      >
         {state === 'expanded' ? (
            <LogoComplete className="w-48 h-auto" />
         ) : (
            <LogoSimplified className="w-full h-8" />
         )}
      </div>
   )
}
