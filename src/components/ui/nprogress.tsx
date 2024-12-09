'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { useTheme } from 'next-themes'

import React from 'react'

export const NProgress: React.FC = () => {
   const { theme } = useTheme()
   return (
      <ProgressBar
         key={theme}
         height="2px"
         options={{ showSpinner: false }}
         shallowRouting
         disableSameURL
         color={theme === 'dark' ? '#19B26B' : '#1057E1'}
      />
   )
}
