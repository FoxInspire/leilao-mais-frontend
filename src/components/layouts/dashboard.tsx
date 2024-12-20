'use client'

import { getCookie, setCookie } from 'cookies-next'
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
import { COOKIE_KEYS } from '@/src/utils/cookies-keys'
import { usePathname } from 'next/navigation'

import { post_auction_routes } from '@/src/routes/post-auction'
import Link from 'next/link'

const DashboardContent: React.FC<React.PropsWithChildren> = ({ children }) => {
   const { state } = useSidebar()

   const pathname = usePathname()

   const [collapsedItems, setCollapsedItems] = React.useState<string[]>(() => {
      const savedState = getCookie(COOKIE_KEYS.SIDEBAR_COLLAPSED_ITEMS)
      return savedState ? JSON.parse(savedState as string) : []
   })

   const handleCollapseChange = (itemTitle: string, isOpen: boolean) => {
      const newCollapsedItems = isOpen
         ? collapsedItems.filter((item) => item !== itemTitle)
         : [...collapsedItems, itemTitle]

      setCollapsedItems(newCollapsedItems)
      setCookie(
         COOKIE_KEYS.SIDEBAR_COLLAPSED_ITEMS,
         JSON.stringify(newCollapsedItems),
         {
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
         }
      )
   }

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
                              defaultOpen={!collapsedItems.includes(item.title)}
                              onOpenChange={(isOpen) =>
                                 handleCollapseChange(item.title, isOpen)
                              }
                              className={cn('group/collapsible', {
                                 'pointer-events-none opacity-50': item.disabled
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
                                                   'material-symbols-outlined block h-6 w-6 shrink-0 origin-center !text-[24px] text-action-active transition-transform duration-200',
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
                                    'pointer-events-none opacity-50':
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
         <SidebarInset className="overflow-hidden p-6">
            <div className="flex flex-col overflow-hidden">
               <div className="flex-1">{children}</div>
            </div>
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
            <span className="material-symbols-outlined filled block h-6 w-6 !text-[24px] leading-6">
               space_dashboard
            </span>
         ),
         disabled: false
      },
      {
         title: 'Pré-leilão',
         url: dashboard_routes.pre_auction.auction_maintenance,
         icon: (
            <span className="material-symbols-outlined block h-6 w-6 !text-[24px] leading-6">
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
               disabled: false
            }
         ]
      },
      {
         title: 'Pós-leilão',
         url: post_auction_routes.index,
         disabled: false,
         icon: (
            <span className="material-symbols-outlined filled block h-6 w-6 !text-[24px] leading-6">
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
   return <IconComponent className={cn(className, 'block h-6 w-6')} />
}

const LogoSwitcher: React.FC<{ state: 'expanded' | 'collapsed' }> = ({
   state
}) => {
   const isMobile = useIsMobile()
   return (
      <div
         className={cn('flex h-full items-center justify-center', {
            'pt-6': state === 'expanded',
            'py-6': state === 'collapsed'
         })}
      >
         {state === 'expanded' ? (
            <React.Fragment>
               <LogoComplete className="h-auto w-48" />
            </React.Fragment>
         ) : (
            <React.Fragment>
               {isMobile ? (
                  <LogoComplete className="h-auto w-48" />
               ) : (
                  <LogoSimplified className="h-8 w-full" />
               )}
            </React.Fragment>
         )}
      </div>
   )
}
