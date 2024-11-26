'use client'

import * as React from 'react'

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
import { LogoComplete, LogoSimplified } from '@/src/components/svgs/logo'
import { useIsMobile } from '@/src/hooks/useMobile'
import { cn } from '@/src/lib/utils'
import { dashboard_routes } from '@/src/routes/dashboard'
import { usePathname } from 'next/navigation'

import Link from 'next/link'

const DashboardContent: React.FC<React.PropsWithChildren> = ({ children }) => {
   const { state } = useSidebar()
   const pathname = usePathname()
   const isActiveRoute = (url: string) => pathname === url

   return (
      <React.Fragment>
         <Sidebar collapsible="icon">
            <SidebarHeader>
               <LogoSwitcher state={state} />
            </SidebarHeader>
            <SidebarContent>
               <SidebarGroup>
                  <SidebarMenu className="gap-3">
                     {data.menuItems.map((item) =>
                        item.items && item.items.length > 0 ? (
                           <Collapsible
                              key={item.title}
                              asChild
                              className={cn('group/collapsible', {
                                 'opacity-50 pointer-events-none': item.disabled
                              })}
                           >
                              <SidebarMenuItem>
                                 <CollapsibleTrigger className="h-10" asChild>
                                    <SidebarMenuButton
                                       tooltip={item.title}
                                       className={cn(
                                          {
                                             'pointer-events-none':
                                                item.disabled
                                          },
                                          'justify-normal'
                                       )}
                                       asChild={state === 'collapsed'}
                                    >
                                       {state === 'collapsed' ? (
                                          <Link
                                             id="link"
                                             href={
                                                item.disabled ? '#' : item.url
                                             }
                                          >
                                             {item.icon &&
                                                renderIcon(
                                                   item.icon,
                                                   cn('w-6 h-6 block', {
                                                      'text-primary-default dark:text-dark-primary-default':
                                                         item.items.some(
                                                            (subItem) =>
                                                               isActiveRoute(
                                                                  subItem.url
                                                               )
                                                         )
                                                   })
                                                )}
                                             <span
                                                className={cn(
                                                   'text-sm font-medium',
                                                   {
                                                      'text-primary-default dark:text-dark-primary-default':
                                                         item.items.some(
                                                            (subItem) =>
                                                               isActiveRoute(
                                                                  subItem.url
                                                               )
                                                         )
                                                   }
                                                )}
                                             >
                                                {item.title}
                                             </span>
                                          </Link>
                                       ) : (
                                          <>
                                             {item.icon &&
                                                renderIcon(
                                                   item.icon,
                                                   cn('w-6 h-6 block', {
                                                      'text-primary-default dark:text-dark-primary-default':
                                                         item.items.some(
                                                            (subItem) =>
                                                               isActiveRoute(
                                                                  subItem.url
                                                               )
                                                         )
                                                   })
                                                )}
                                             <span
                                                className={cn(
                                                   'text-sm font-medium',
                                                   {
                                                      'text-primary-default dark:text-dark-primary-default':
                                                         item.items.some(
                                                            (subItem) =>
                                                               isActiveRoute(
                                                                  subItem.url
                                                               )
                                                         )
                                                   }
                                                )}
                                             >
                                                {item.title}
                                             </span>
                                             <div
                                                className={cn(
                                                   'material-symbols-outlined shrink-0 transition-transform duration-200 origin-center text-action-active w-6 h-6 block !text-[24px]',
                                                   'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-90 dark:text-sidebar-foreground'
                                                )}
                                             >
                                                keyboard_arrow_down
                                             </div>
                                          </>
                                       )}
                                    </SidebarMenuButton>
                                 </CollapsibleTrigger>
                                 <CollapsibleContent>
                                    <SidebarMenuSub>
                                       {item.items.map((subItem) => (
                                          <SidebarMenuSubItem
                                             key={subItem.title}
                                          >
                                             <SidebarMenuSubButton
                                                asChild
                                                className={cn({
                                                   'pointer-events-none opacity-50':
                                                      item.disabled ||
                                                      subItem.disabled
                                                })}
                                             >
                                                <Link
                                                   href={
                                                      item.disabled ||
                                                      subItem.disabled
                                                         ? '#'
                                                         : subItem.url
                                                   }
                                                >
                                                   <span
                                                      className={cn(
                                                         'text-sm font-normal',
                                                         {
                                                            'text-primary-default dark:text-dark-primary-default':
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
                              <SidebarMenuButton
                                 tooltip={item.title}
                                 className={cn('h-10', {
                                    'opacity-50 pointer-events-none':
                                       item.disabled
                                 })}
                                 asChild
                              >
                                 <Link href={item.disabled ? '#' : item.url}>
                                    {item.icon &&
                                       renderIcon(
                                          item.icon,
                                          cn('w-6 h-6 block', {
                                             'text-primary-default dark:text-dark-primary-default':
                                                isActiveRoute(item.url)
                                          })
                                       )}
                                    <span
                                       className={cn('text-sm font-medium', {
                                          'text-primary-default dark:text-dark-primary-default':
                                             isActiveRoute(item.url)
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
         <SidebarInset className="p-6">
            <div className="h-full flex flex-col">{children}</div>
         </SidebarInset>
      </React.Fragment>
   )
}

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
   children
}: React.PropsWithChildren) => {
   return (
      <SidebarProvider hasHeaderMenu>
         <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
   )
}

const data = {
   menuItems: [
      {
         title: 'Dashboard',
         url: dashboard_routes.index,
         icon: (
            <span className="material-symbols-outlined filled !text-[24px] leading-6 w-6 h-6 block">
               space_dashboard
            </span>
         ),
         disabled: false
      },
      {
         title: 'Pré-leilão',
         url: dashboard_routes.pre_auction.auction_maintenance,
         icon: (
            <span className="material-symbols-outlined !text-[24px] leading-6 w-6 h-6 block">
               monitor
            </span>
         ),
         disabled: false,
         items: [
            {
               title: 'Manutenção de leilões',
               url: dashboard_routes.pre_auction.auction_maintenance,
               disabled: false
            },
            {
               title: 'Monitor de operações',
               url: dashboard_routes.pre_auction.operations_monitor,
               disabled: true
            }
         ]
      },
      {
         title: 'Pós-leilão',
         url: dashboard_routes.post_auction.index,
         disabled: true,
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
   disabled?: boolean
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

const LogoSwitcher: React.FC<{ state: 'expanded' | 'collapsed' }> = ({
   state
}) => {
   const isMobile = useIsMobile()
   return (
      <div
         className={cn('flex items-center justify-center h-full', {
            'pt-6': state === 'expanded',
            'py-6': state === 'collapsed'
         })}
      >
         {state === 'expanded' ? (
            <React.Fragment>
               <LogoComplete className="w-48 h-auto" />
            </React.Fragment>
         ) : (
            <React.Fragment>
               {isMobile ? (
                  <LogoComplete className="w-48 h-auto" />
               ) : (
                  <LogoSimplified className="w-full h-8" />
               )}
            </React.Fragment>
         )}
      </div>
   )
}
