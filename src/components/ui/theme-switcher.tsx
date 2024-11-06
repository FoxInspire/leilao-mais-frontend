import { cn } from '@/src/lib/utils'
import { useTheme } from 'next-themes'

import React from 'react'

export const ThemeSwitch: React.FC = () => {
   const { theme, setTheme } = useTheme()

   return (
      <div className="w-full h-full flex flex-col justify-center items-center">
         <div className="flex justify-center items-center">
            <span>
               <svg
                  className={cn('h-6 w-6', {
                     'text-primary-default': theme !== 'dark',
                     'text-text-secondary': theme === 'dark'
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
                     'text-action-disabled': theme !== 'dark',
                     'text-secondary-default': theme === 'dark'
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
