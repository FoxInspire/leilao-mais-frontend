'use client'

import * as React from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { ThemeSwitch } from '@/components/ui/theme-switcher'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/src/hooks/useMobile'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import { PanelLeft } from 'lucide-react'

/** @dev Define constants for sidebar state and styles */
const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

/** @dev Define the shape of the SidebarContext */
type SidebarContext = {
   state: 'expanded' | 'collapsed'
   open: boolean
   setOpen: (open: boolean) => void
   openMobile: boolean
   setOpenMobile: (open: boolean) => void
   isMobile: boolean
   toggleSidebar: () => void
   hasHeaderMenu: boolean
}

/** @dev Create a React context for the sidebar */
const SidebarContext = React.createContext<SidebarContext | null>(null)

/** @dev Custom hook to use the SidebarContext */
function useSidebar() {
   /** @dev Access the SidebarContext */
   const context = React.useContext(SidebarContext)

   /** @dev Throw error if context is not available */
   if (!context) {
      throw new Error('useSidebar must be used within a SidebarProvider.')
   }

   /** @return Sidebar context */
   return context
}

/** @title SidebarProvider Component
 *  @notice Provides context and state management for the sidebar across the application.
 */
const SidebarProvider = React.forwardRef<
   HTMLDivElement,
   React.ComponentProps<'div'> & {
      defaultOpen?: boolean
      open?: boolean
      onOpenChange?: (open: boolean) => void
      hasHeaderMenu?: boolean
   }
>(
   (
      {
         defaultOpen = true,
         open: openProp,
         onOpenChange: setOpenProp,
         hasHeaderMenu = true,
         className,
         style,
         children,
         ...props
      },
      ref
   ) => {
      /** @dev Determine if the current view is on a mobile device */
      const isMobile = useIsMobile()

      /** @dev State to manage mobile sidebar open status */
      const [openMobile, setOpenMobile] = React.useState(false)

      /** @dev Initialize sidebar open state with default value */
      const [_open, _setOpen] = React.useState(defaultOpen)

      /** @dev Effect to load sidebar state from cookies on mount */
      React.useEffect(() => {
         /** @dev Retrieve the sidebar state from cookies */
         const cookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))

         /** @dev If cookie exists, set the sidebar state */
         if (cookie) {
            const savedState = cookie.split('=')[1] === 'true'
            _setOpen(savedState)
         }
      }, [])

      /** @dev Determine the current open state of the sidebar */
      const open = openProp ?? _open

      /** @dev Function to update the open state and save to cookies */
      const setOpen = React.useCallback(
         (value: boolean | ((value: boolean) => boolean)) => {
            /** @dev Determine the new open state */
            const openState = typeof value === 'function' ? value(open) : value

            /** @dev Update the open state via prop or internal state */
            if (setOpenProp) {
               setOpenProp(openState)
            } else {
               _setOpen(openState)
            }

            /** @dev Save the new state to cookies */
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
         },
         [setOpenProp, open]
      )

      /** @dev Function to toggle the sidebar open state */
      const toggleSidebar = React.useCallback(() => {
         return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
      }, [isMobile, setOpen, setOpenMobile])

      /** @dev Effect to handle keyboard shortcuts for toggling the sidebar */
      React.useEffect(() => {
         /** @dev Event handler for keydown events */
         const handleKeyDown = (event: KeyboardEvent) => {
            /** @dev Check if the shortcut key is pressed */
            if (
               event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
               (event.metaKey || event.ctrlKey)
            ) {
               event.preventDefault()
               toggleSidebar()
            }
         }

         /** @dev Add the keydown event listener */
         window.addEventListener('keydown', handleKeyDown)

         /** @dev Cleanup the event listener on unmount */
         return () => window.removeEventListener('keydown', handleKeyDown)
      }, [toggleSidebar])

      /** @dev Determine the current state of the sidebar for styling */
      const state = open ? 'expanded' : 'collapsed'

      /** @dev Memoize the context value to optimize performance */
      const contextValue = React.useMemo<SidebarContext>(
         () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
            hasHeaderMenu
         }),
         [
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
            hasHeaderMenu
         ]
      )

      return (
         <SidebarContext.Provider value={contextValue}>
            <TooltipProvider delayDuration={0}>
               <div
                  style={
                     {
                        '--sidebar-width': SIDEBAR_WIDTH,
                        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                        ...style
                     } as React.CSSProperties
                  }
                  className={cn(
                     'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
                     className
                  )}
                  ref={ref}
                  {...props}
               >
                  {children}
               </div>
            </TooltipProvider>
         </SidebarContext.Provider>
      )
   }
)
SidebarProvider.displayName = 'SidebarProvider'

/** @title Sidebar Component
 *  @notice Renders the sidebar, handling different variants and responsiveness.
 */
const Sidebar = React.forwardRef<
   HTMLDivElement,
   React.ComponentProps<'div'> & {
      side?: 'left' | 'right'
      variant?: 'sidebar' | 'floating' | 'inset'
      collapsible?: 'offcanvas' | 'icon' | 'none'
   }
>(
   (
      {
         side = 'left',
         variant = 'sidebar',
         collapsible = 'offcanvas',
         className,
         children,
         ...props
      },
      ref
   ) => {
      /** @dev Access sidebar context to get current state */
      const { isMobile, state, openMobile, setOpenMobile, hasHeaderMenu } =
         useSidebar()

      /** @dev JSX content of the sidebar */
      const sidebarContent = (
         <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow gap-6 dark:bg-dark-background-paper"
         >
            {children}
         </div>
      )

      /** @title HeaderMenu Component
       *  @notice Renders the header menu with toggle button, theme switch, and user avatar.
       */
      const HeaderMenu = () => {
         /** @dev Access context to toggle sidebar */
         const { isMobile, toggleSidebar } = useSidebar()

         return (
            <div className="fixed top-0 left-0 right-0 h-14 dark:bg-primary-default bg-dark-background-paper z-20 rounded-b-lg flex items-center justify-between px-6">
               <button
                  onClick={() => {
                     if (isMobile) {
                        setOpenMobile(true)
                     } else {
                        toggleSidebar()
                     }
                  }}
                  className="flex items-center justify-center"
               >
                  <span className="material-symbols-outlined text-white">menu</span>
               </button>
               <div className="flex items-center gap-4">
                  <ThemeSwitch />
                  <Avatar>
                     <AvatarFallback className="text-xl font-semibold">
                        R
                     </AvatarFallback>
                  </Avatar>
               </div>
            </div>
         )
      }

      /** @dev Render different sidebar layouts based on collapsible prop and device type */
      if (collapsible === 'none') {
         return (
            <div
               className={cn(
                  'flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground',
                  className
               )}
               ref={ref}
               {...props}
            >
               {sidebarContent}
            </div>
         )
      }

      /** @dev Render mobile-specific sidebar with Sheet component */
      if (isMobile) {
         return (
            <React.Fragment>
               {hasHeaderMenu && <HeaderMenu />}
               <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                  <SheetContent
                     data-sidebar="sidebar"
                     data-mobile="true"
                     className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                     style={
                        {
                           '--sidebar-width': SIDEBAR_WIDTH_MOBILE
                        } as React.CSSProperties
                     }
                     side={side}
                  >
                     <SheetTitle className="opacity-0">Menu</SheetTitle>
                     <div className="flex h-full w-full flex-col">
                        {sidebarContent}
                     </div>
                  </SheetContent>
               </Sheet>
            </React.Fragment>
         )
      }

      /** @dev Render desktop-specific sidebar with optional header */
      return (
         <React.Fragment>
            {hasHeaderMenu && <HeaderMenu />}
            <div
               ref={ref}
               className="group peer hidden md:block text-sidebar-foreground"
               data-state={state}
               data-collapsible={state === 'collapsed' ? collapsible : ''}
               data-variant={variant}
               data-side={side}
            >
               <div
                  /** @dev Handle the sidebar width and transition effects */
                  className={cn(
                     'duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear',
                     'group-data-[collapsible=offcanvas]:w-0',
                     'group-data-[side=right]:rotate-180',
                     variant === 'floating' || variant === 'inset'
                        ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
                        : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]'
                  )}
               />
               <div
                  className={cn(
                     'duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex',
                     hasHeaderMenu ? 'top-14' : 'top-0',
                     hasHeaderMenu ? 'h-[calc(100vh-3.5rem)]' : 'h-screen',
                     side === 'left'
                        ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                        : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
                     variant === 'floating' || variant === 'inset'
                        ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
                        : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
                     className
                  )}
                  {...props}
               >
                  {sidebarContent}
               </div>
            </div>
         </React.Fragment>
      )
   }
)
Sidebar.displayName = 'Sidebar'

/** @title SidebarTrigger Component
 *  @notice Button to toggle the sidebar's open or closed state.
 */
const SidebarTrigger = React.forwardRef<
   React.ElementRef<typeof Button>,
   React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
   /** @dev Access toggleSidebar function from context */
   const { toggleSidebar } = useSidebar()

   return (
      <Button
         ref={ref}
         data-sidebar="trigger"
         variant="ghost"
         size="icon"
         className={cn('h-7 w-7', className)}
         onClick={(event) => {
            onClick?.(event)
            toggleSidebar()
         }}
         {...props}
      >
         <PanelLeft />
         <span className="sr-only">Toggle Sidebar</span>
      </Button>
   )
})
SidebarTrigger.displayName = 'SidebarTrigger'

/** @title SidebarRail Component
 *  @notice A rail for the sidebar that allows users to drag or click to toggle the sidebar.
 */
const SidebarRail = React.forwardRef<
   HTMLButtonElement,
   React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
   /** @dev Access toggleSidebar function from context */
   const { toggleSidebar } = useSidebar()

   return (
      <button
         ref={ref}
         data-sidebar="rail"
         aria-label="Toggle Sidebar"
         tabIndex={-1}
         onClick={toggleSidebar}
         title="Toggle Sidebar"
         className={cn(
            'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[1px] hover:after:w-[2px] after:bg-sidebar-border dark:after:bg-[#1f252b] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',

            '[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize',

            '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',

            'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar',

            '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
            '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',

            className
         )}
         {...props}
      />
   )
})
SidebarRail.displayName = 'SidebarRail'

/** @title SidebarInset Component
 *  @notice Renders the main content area with padding and background, adjusting based on sidebar state.
 */
const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<'main'>>(
   ({ className, ...props }, ref) => {
      const { hasHeaderMenu } = useSidebar()

      return (
         <main
            id="sidebar-inset"
            ref={ref}
            className={cn(
               'relative grid w-screen bg-white dark:bg-dark-background-paper',
               hasHeaderMenu ? 'mt-14' : '',
               'peer-data-[variant=inset]:h-[calc(100svh-theme(spacing.4))]',
               'md:peer-data-[variant=inset]:m-2',
               'md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2',
               'md:peer-data-[variant=inset]:ml-0',
               'md:peer-data-[variant=inset]:rounded-xl',
               'md:peer-data-[variant=inset]:shadow',
               className
            )}
            {...props}
         />
      )
   }
)
SidebarInset.displayName = 'SidebarInset'

/** @title SidebarInput Component
 *  @notice Input field styled specifically for use within the sidebar.
 */
const SidebarInput = React.forwardRef<
   React.ElementRef<typeof Input>,
   React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
   return (
      <Input
         ref={ref}
         data-sidebar="input"
         className={cn(
            'h-8 w-full bg-white shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring dark:bg-neutral-950',
            className
         )}
         {...props}
      />
   )
})
SidebarInput.displayName = 'SidebarInput'

/** @title SidebarHeader Component
 *  @notice Renders the header section of the sidebar.
 */
const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
   ({ className, ...props }, ref) => {
      return (
         <div
            ref={ref}
            data-sidebar="header"
            className={cn('flex flex-col gap-2 p-2', className)}
            {...props}
         />
      )
   }
)
SidebarHeader.displayName = 'SidebarHeader'

/** @title SidebarFooter Component
 *  @notice Renders the footer section of the sidebar.
 */
const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
   ({ className, ...props }, ref) => {
      return (
         <div
            ref={ref}
            data-sidebar="footer"
            className={cn('flex flex-col gap-2 p-2', className)}
            {...props}
         />
      )
   }
)
SidebarFooter.displayName = 'SidebarFooter'

/** @title SidebarSeparator Component
 *  @notice Renders a separator line within the sidebar for dividing sections.
 */
const SidebarSeparator = React.forwardRef<
   React.ElementRef<typeof Separator>,
   React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
   return (
      <Separator
         ref={ref}
         data-sidebar="separator"
         className={cn('mx-2 w-auto bg-sidebar-border', className)}
         {...props}
      />
   )
})
SidebarSeparator.displayName = 'SidebarSeparator'

/** @title SidebarContent Component
 *  @notice Container for the main content within the sidebar.
 */
const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
   ({ className, ...props }, ref) => {
      return (
         <div
            ref={ref}
            data-sidebar="content"
            className={cn(
               'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
               className
            )}
            {...props}
         />
      )
   }
)
SidebarContent.displayName = 'SidebarContent'

/** @title SidebarGroup Component
 *  @notice Groups related items within the sidebar for better organization.
 */
const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
   ({ className, ...props }, ref) => {
      return (
         <div
            ref={ref}
            data-sidebar="group"
            className={cn('relative flex w-full min-w-0 flex-col px-2', className)}
            {...props}
         />
      )
   }
)
SidebarGroup.displayName = 'SidebarGroup'

/** @title SidebarGroupLabel Component
 *  @notice Label for a group within the sidebar, optionally rendering as a child component.
 */
const SidebarGroupLabel = React.forwardRef<
   HTMLDivElement,
   React.ComponentProps<'div'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
   /** @dev Determine the component type based on asChild prop */
   const Comp = asChild ? Slot : 'div'

   return (
      <Comp
         ref={ref}
         data-sidebar="group-label"
         className={cn(
            'duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
            'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
            className
         )}
         {...props}
      />
   )
})
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

/** @title SidebarGroupAction Component
 *  @notice Action button within a sidebar group, optionally rendering as a child component.
 */
const SidebarGroupAction = React.forwardRef<
   HTMLButtonElement,
   React.ComponentProps<'button'> & { asChild?: boolean; showOnHover?: boolean }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
   /** @dev Determine the component type based on asChild prop */
   const Comp = asChild ? Slot : 'button'

   return (
      <Comp
         ref={ref}
         data-sidebar="group-action"
         className={cn(
            'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
            'after:absolute after:-inset-2 after:md:hidden',
            'peer-data-[size=sm]/menu-button:top-1',
            'peer-data-[size=default]/menu-button:top-1.5',
            'peer-data-[size=lg]/menu-button:top-2.5',
            'group-data-[collapsible=icon]:hidden',
            showOnHover &&
               'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
            className
         )}
         {...props}
      />
   )
})
SidebarGroupAction.displayName = 'SidebarGroupAction'

/** @title SidebarGroupContent Component
 *  @notice Container for the content within a sidebar group.
 */
const SidebarGroupContent = React.forwardRef<
   HTMLDivElement,
   React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
   />
))
SidebarGroupContent.displayName = 'SidebarGroupContent'

/** @title SidebarMenu Component
 *  @notice Renders a menu list within the sidebar.
 */
const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
   ({ className, ...props }, ref) => (
      <ul
         ref={ref}
         data-sidebar="menu"
         className={cn('flex w-full min-w-0 flex-col gap-1', className)}
         {...props}
      />
   )
)
SidebarMenu.displayName = 'SidebarMenu'

/** @title SidebarMenuItem Component
 *  @notice Renders an individual menu item within the sidebar.
 */
const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
   ({ className, ...props }, ref) => (
      <li
         ref={ref}
         data-sidebar="menu-item"
         className={cn('group/menu-item relative', className)}
         {...props}
      />
   )
)
SidebarMenuItem.displayName = 'SidebarMenuItem'

/** @dev Define variants for the SidebarMenuButton using class-variance-authority */
const sidebarMenuButtonVariants = cva(
   'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-1 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
   {
      variants: {
         variant: {
            default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            outline:
               'bg-white shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))] dark:bg-neutral-950'
         },
         size: {
            default: 'h-8 text-sm',
            sm: 'h-7 text-xs',
            lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0'
         }
      },
      defaultVariants: {
         variant: 'default',
         size: 'default'
      }
   }
)

/** @title SidebarMenuButton Component
 *  @notice Button within the sidebar menu, supports variants and tooltips.
 */
const SidebarMenuButton = React.forwardRef<
   HTMLButtonElement,
   React.ComponentProps<'button'> & {
      asChild?: boolean
      isActive?: boolean
      tooltip?: string | React.ComponentProps<typeof TooltipContent>
   } & VariantProps<typeof sidebarMenuButtonVariants>
>(
   (
      {
         asChild = false,
         isActive = false,
         variant = 'default',
         size = 'default',
         tooltip,
         className,
         ...props
      },
      ref
   ) => {
      /** @dev Determine the component type based on asChild prop */
      const Comp = asChild ? Slot : 'button'

      /** @dev Access sidebar context to determine state */
      const { isMobile, state } = useSidebar()

      /** @dev JSX for the menu button */
      const button = (
         <Comp
            ref={ref}
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            className={cn(
               sidebarMenuButtonVariants({ variant, size }),
               'dark:hover:bg-[#fafafa0a]',
               className
            )}
            {...props}
         />
      )

      /** @dev If no tooltip is provided, return the button directly */
      if (!tooltip) {
         return button
      }

      /** @dev Normalize tooltip prop to an object if it's a string */
      if (typeof tooltip === 'string') {
         tooltip = {
            children: tooltip
         }
      }

      return (
         <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent
               side="right"
               align="center"
               hidden={state !== 'collapsed' || isMobile}
               {...tooltip}
            />
         </Tooltip>
      )
   }
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

/** @title SidebarMenuAction Component
 *  @notice Action button within a sidebar menu item, visible on hover.
 */
const SidebarMenuAction = React.forwardRef<
   HTMLButtonElement,
   React.ComponentProps<'button'> & {
      asChild?: boolean
      showOnHover?: boolean
   }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
   /** @dev Determine the component type based on asChild prop */
   const Comp = asChild ? Slot : 'button'

   return (
      <Comp
         ref={ref}
         data-sidebar="menu-action"
         className={cn(
            'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
            'after:absolute after:-inset-2 after:md:hidden',
            'peer-data-[size=sm]/menu-button:top-1',
            'peer-data-[size=default]/menu-button:top-1.5',
            'peer-data-[size=lg]/menu-button:top-2.5',
            'group-data-[collapsible=icon]:hidden',
            showOnHover &&
               'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
            className
         )}
         {...props}
      />
   )
})
SidebarMenuAction.displayName = 'SidebarMenuAction'

/** @title SidebarMenuBadge Component
 *  @notice Badge component to display additional information or counts within a menu item.
 */
const SidebarMenuBadge = React.forwardRef<
   HTMLDivElement,
   React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
         'absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none',
         'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
         'peer-data-[size=sm]/menu-button:top-1',
         'peer-data-[size=default]/menu-button:top-1.5',
         'peer-data-[size=lg]/menu-button:top-2.5',
         'group-data-[collapsible=icon]:hidden',
         className
      )}
      {...props}
   />
))
SidebarMenuBadge.displayName = 'SidebarMenuBadge'

/** @title SidebarMenuSkeleton Component
 *  @notice Skeleton loader for sidebar menu items during data fetching.
 */
const SidebarMenuSkeleton = React.forwardRef<
   HTMLDivElement,
   React.ComponentProps<'div'> & {
      showIcon?: boolean
   }
>(({ className, showIcon = false, ...props }, ref) => {
   /** @dev Random width for the skeleton text to simulate variability */
   const width = React.useMemo(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`
   }, [])

   return (
      <div
         ref={ref}
         data-sidebar="menu-skeleton"
         className={cn('rounded-md h-8 flex gap-2 px-2 items-center', className)}
         {...props}
      >
         {showIcon && (
            <Skeleton
               className="size-4 rounded-md"
               data-sidebar="menu-skeleton-icon"
            />
         )}
         <Skeleton
            className="h-4 flex-1 max-w-[--skeleton-width]"
            data-sidebar="menu-skeleton-text"
            style={
               {
                  '--skeleton-width': width
               } as React.CSSProperties
            }
         />
      </div>
   )
})
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton'

/** @title SidebarMenuSub Component
 *  @notice Renders a nested submenu within a sidebar menu item.
 */
const SidebarMenuSub = React.forwardRef<
   HTMLUListElement,
   React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
   <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
         'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
         'group-data-[collapsible=icon]:hidden',
         className
      )}
      {...props}
   />
))
SidebarMenuSub.displayName = 'SidebarMenuSub'

/** @title SidebarMenuSubItem Component
 *  @notice Renders an individual item within a sidebar submenu.
 */
const SidebarMenuSubItem = React.forwardRef<
   HTMLLIElement,
   React.ComponentProps<'li'>
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem'

/** @title SidebarMenuSubButton Component
 *  @notice Button within a sidebar submenu item, supports variants and active state.
 */
const SidebarMenuSubButton = React.forwardRef<
   HTMLAnchorElement,
   React.ComponentProps<'a'> & {
      asChild?: boolean
      size?: 'sm' | 'md'
      isActive?: boolean
   }
>(({ asChild = false, size = 'md', isActive, className, ...props }, ref) => {
   /** @dev Determine the component type based on asChild prop */
   const Comp = asChild ? Slot : 'a'

   return (
      <Comp
         ref={ref}
         data-sidebar="menu-sub-button"
         data-size={size}
         data-active={isActive}
         className={cn(
            'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent dark:hover:bg-[#fafafa0a] hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
            'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            'group-data-[collapsible=icon]:hidden',
            className
         )}
         {...props}
      />
   )
})
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'

export {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupAction,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarInput,
   SidebarInset,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuBadge,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSkeleton,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
   SidebarProvider,
   SidebarRail,
   SidebarSeparator,
   SidebarTrigger,
   useSidebar
}
