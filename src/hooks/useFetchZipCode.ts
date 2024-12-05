import * as React from 'react'

interface ZipCodeResponse {
   cep: string
   logradouro: string
   complemento: string
   bairro: string
   localidade: string
   uf: string
   ibge: string
   gia: string
   ddd: string
   siafi: string
   erro?: boolean
}

export const useFetchZipCode = () => {
   const [zipCodeData, setZipCodeData] = React.useState<ZipCodeResponse | null>(
      null
   )
   const [loading, setLoading] = React.useState(false)

   const fetchZipCode = async (zipCode: string) => {
      setLoading(true)
      try {
         const response = await fetch(
            `https://viacep.com.br/ws/${zipCode}/json/`
         )
         if (!response.ok) throw new Error(response.statusText)

         const data: ZipCodeResponse = await response.json()
         console.log('Data:', data)
         setZipCodeData(data)
         setLoading(false)
         return data
      } catch (error) {
         console.error('Erro ao buscar CEP:', error)
         setLoading(false)
         return null
      }
   }

   return { zipCodeData, loading, fetchZipCode }
}
