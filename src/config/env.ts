import * as z from 'zod'

const createEnv = () => {
   const EnvSchema = z.object({ API_URL: z.string().url() })

   const envVars = Object.entries(import.meta.filename).reduce<
      Record<string, string>
   >((acc, curr) => {
      const [key, value] = curr
      if (key.startsWith('NEXT_PUBLIC_')) {
         acc[key.replace('NEXT_PUBLIC_', '')] = value
      }
      return acc
   }, {})

   const parsedEnv = EnvSchema.safeParse(envVars)

   if (!parsedEnv.success) {
      throw new Error(
         `Invalid env provided.
          The following variables are missing or invalid:
            ${Object.entries(parsedEnv.error.flatten().fieldErrors)
               .map(([k, v]) => `- ${k}: ${v}`)
               .join('\n')}`
      )
   }

   return parsedEnv.data
}

export const env = createEnv()
