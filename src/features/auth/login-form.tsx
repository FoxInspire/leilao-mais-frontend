'use client'

import * as React from 'react'

import {
   LoginIllustrationDark,
   LoginIllustrationLight
} from '@/src/components/svgs/login'
import { LogoComplete } from '@/src/components/svgs/logo'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { ThemeSwitch } from '@/src/components/ui/theme-switcher'
import { useTheme } from 'next-themes'

const LoginForm: React.FC = () => {
   const { theme } = useTheme()
   return (
      <React.Fragment>
         <div className="grid min-h-screen grid-cols-1 gap-8 p-4 lg:grid-cols-2 lg:p-10">
            <div className="hidden flex-col items-center justify-center rounded-3xl bg-primary-default/70 dark:bg-dark-primary-default/70 lg:flex">
               {theme === 'light' ? (
                  <LoginIllustrationLight className="max-w-full lg:max-w-[500px]" />
               ) : (
                  <LoginIllustrationDark className="max-w-full lg:max-w-[500px]" />
               )}
            </div>
            <div className="relative mx-auto flex w-full flex-col justify-center gap-6 p-6">
               <LogoComplete className="mx-auto my-0 w-56 lg:w-64" />
               <div className="flex flex-col gap-6">
                  <div className="space-y-1">
                     <h3 className="font-montserrat text-xl font-semibold lg:text-2xl">
                        Login
                     </h3>
                     <p className="font-nunito text-sm text-gray-500 lg:text-base">
                        Insira suas credenciais para acessar a plataforma.
                     </p>
                  </div>
                  <div className="space-y-4">
                     <Input
                        label="E-mail"
                        type="email"
                        placeholder="Digite seu e-mail"
                     />
                     <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                     />
                  </div>
                  <span className="cursor-pointer text-end text-base font-normal text-primary-default hover:underline dark:text-dark-primary-default">
                     Esqueceu sua senha?
                  </span>
                  <Button>Entrar</Button>
               </div>
               <div className="static mt-4 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
                  <ThemeSwitch />
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default LoginForm
