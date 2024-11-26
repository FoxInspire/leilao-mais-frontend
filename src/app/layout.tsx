import '@/src/styles/globals.css'
import '@/styles/reset.css'

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
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossOrigin="anonymous"
            />
            <link
               rel="preload"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=optional"
               as="style"
            />
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=optional"
            />
            <link
               rel="preload"
               href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=optional"
               as="style"
            />
            <link
               href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=optional"
               rel="stylesheet"
            />
         </head>
         <body className="antialiased bg-background-default dark:bg-dark-background-default">
            <NuqsAdapter>
               <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
               >
                  {children}
               </ThemeProvider>
            </NuqsAdapter>
         </body>
      </html>
   )
}
