'use client'

import {
   LoginIllustrationDark,
   LoginIllustrationLight
} from '@/src/components/svgs/login'
import { LogoComplete } from '@/src/components/svgs/logo'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { ThemeSwitch } from '@/src/components/ui/theme-switcher'
import { useTheme } from 'next-themes'

import * as React from 'react'

const LoginForm: React.FC = () => {
   const { theme } = useTheme()
   return (
      <React.Fragment>
         <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 min-h-screen p-4 lg:p-10">
            <div className="bg-primary-default/70 dark:bg-dark-primary-default/70 hidden lg:flex flex-col justify-center items-center rounded-3xl">
               {theme === 'light' ? (
                  <LoginIllustrationLight className="max-w-full lg:max-w-[500px]" />
               ) : (
                  <LoginIllustrationDark className="max-w-full lg:max-w-[500px]" />
               )}
            </div>
            <div className="flex gap-6 flex-col justify-center w-full mx-auto relative p-6">
               <LogoComplete className="w-56 lg:w-64 mx-auto my-0" />
               <div className="flex gap-6 flex-col">
                  <div className="space-y-1">
                     <h3 className="text-xl lg:text-2xl font-semibold font-montserrat">
                        Login
                     </h3>
                     <p className="text-sm lg:text-base text-gray-500 font-nunito">
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
                  <span className="text-base font-normal text-primary-default hover:underline cursor-pointer text-end dark:text-dark-primary-default">
                     Esqueceu sua senha?
                  </span>
                  <Button>Entrar</Button>
               </div>
               <div className="lg:absolute static mt-4 lg:mt-0 lg:bottom-0 lg:right-0">
                  <ThemeSwitch />
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default LoginForm
