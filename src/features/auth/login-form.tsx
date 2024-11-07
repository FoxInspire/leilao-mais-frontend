'use client'

import { LogoComplete } from '@/src/components/icons/logo'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

import React from 'react'

const LoginForm: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid grid-cols-2 gap-20 h-screen p-10">
            <div className="bg-primary-default/70 rounded-3xl"></div>
            <div className="flex gap-6 flex-col justify-center max-w-2xl">
               <LogoComplete className="w-64 mx-auto my-0" />
               <div className="flex gap-4 flex-col">
                  <div className="space-y-1">
                     <h3 className="text-2xl font-semibold font-montserrat">
                        Login
                     </h3>
                     <p className="text-base text-gray-500 font-nunito">
                        Insira suas credenciais para acessar a plataforma.
                     </p>
                  </div>
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
                  <span className="text-base font-normal text-primary-default hover:underline cursor-pointer text-end">
                     Esqueceu sua senha?
                  </span>
                  <Button>Entrar</Button>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default LoginForm
