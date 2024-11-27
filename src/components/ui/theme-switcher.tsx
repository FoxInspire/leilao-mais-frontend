'use client'

import { cn } from '@/src/lib/utils'
import { useTheme } from 'next-themes'

import React from 'react'
import { toast } from 'sonner'

export const ThemeSwitch: React.FC = () => {
   const { theme, setTheme } = useTheme()

   const [mounted, setMounted] = React.useState(false)

   React.useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) {
      return null
   }

   return (
      <div className="flex justify-center items-center">
         <div className="border border-neutral-300 dark:border-gray-400 rounded-full p-1 flex gap-1.5">
            <button
               onClick={() => setTheme('light')}
               className={cn(
                  'rounded-full h-6 w-6 transition-all duration-200',
                  'text-gray-500 dark:text-gray-500',
                  'hover:bg-gray-100 ',
                  'flex items-center justify-center',
                  'focus:outline-none',
                  theme === 'light' ? 'bg-gray-100 dark:bg-gray-700' : ''
               )}
            >
               <span
                  className={cn(
                     'material-symbols-outlined text-base',
                     theme === 'light'
                        ? 'text-primary-light'
                        : 'text-gray-400 dark:text-gray-500'
                  )}
                  style={{ fontSize: '1.2rem' }}
               >
                  light_mode
               </span>
            </button>

            {/* <button
               onClick={() => setTheme('system')}
               className={cn(
                  'rounded-full h-6 w-6 transition-all duration-200',
                  'text-gray-500 dark:text-gray-500',
                  'hover:bg-gray-100 ',
                  'flex items-center justify-center',
                  'focus:outline-none',
                  theme === 'system' ? 'bg-gray-100' : ''
               )}
            >
               <span
                  className={cn(
                     'material-symbols-outlined text-base',
                     theme === 'system'
                        ? 'text-primary-light'
                        : 'text-gray-400 dark:text-gray-500'
                  )}
                  style={{ fontSize: '1.2rem' }}
               >
                  desktop_windows
               </span>
            </button> */}

            <button
               onClick={async () => {
                  setTheme('dark')

                  await new Promise((resolve) => setTimeout(resolve, 1000))

                  toast.info(
                     'Sugerimos utilizar o modo claro até que o desenvolvimento esteja completo.',
                     {
                        duration: 5000
                     }
                  )

                  toast.info(
                     'O modo escuro ainda está em desenvolvimento e pode apresentar algumas inconsistências visuais.',
                     {
                        duration: 5000
                     }
                  )
               }}
               className={cn(
                  'rounded-full h-6 w-6 transition-all duration-200',
                  'text-gray-500 dark:text-gray-500',
                  'hover:bg-gray-100 ',
                  'flex items-center justify-center',
                  'focus:outline-none',
                  theme === 'dark' ? 'bg-gray-100' : ''
               )}
            >
               <span
                  className={cn(
                     'material-symbols-outlined text-base',
                     theme === 'dark' ? 'text-primary-light' : ''
                  )}
                  style={{ fontSize: '1.2rem' }}
               >
                  dark_mode
               </span>
            </button>
         </div>
      </div>
   )
}
