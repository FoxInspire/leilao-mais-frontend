import '@/src/styles/globals.css'
import '@/styles/reset.css'

import { NProgress } from '@/components/ui/nprogress'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
   metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
   title: 'Leilão Mais | Gerencie seus leilões com facilidade',
   description:
      'Sistema completo para gestão de leilões automotivos. Organize, gerencie e realize leilões de forma eficiente e transparente através da plataforma Pátio Mais.',
   authors: [{ name: 'Pátio Mais' }],
   keywords: [
      'leilão automotivo',
      'gestão de leilões',
      'leilão de veículos',
      'pátio mais',
      'sistema de leilões',
      'leilão online',
      'gestão de pátio'
   ],
   openGraph: {
      title: 'Leilão Mais | Módulo de Leilões do Pátio Mais',
      description:
         'Sistema completo para gestão de leilões automotivos. Organize, gerencie e realize leilões de forma eficiente e transparente.',
      type: 'website'
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Leilão Mais | Módulo de Leilões do Pátio Mais',
      description:
         'Sistema completo para gestão de leilões automotivos. Organize, gerencie e realize leilões de forma eficiente e transparente.'
   }
}

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="pt-BR" suppressHydrationWarning>
         <head>
            <link
               rel="preconnect"
               href="https://fonts.googleapis.com"
               crossOrigin="anonymous"
            />
            <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossOrigin="anonymous"
            />
            <link
               rel="preload"
               href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
               as="style"
            />
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            />
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=block"
            />
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
            />
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&display=swap"
            />
         </head>
         <body className="bg-background-default antialiased dark:bg-dark-background-default">
            <NuqsAdapter>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  {children}
                  <NProgress />
                  <Toaster />
               </ThemeProvider>
            </NuqsAdapter>
         </body>
      </html>
   )
}
