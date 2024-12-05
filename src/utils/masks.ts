export const ZIP_CODE_MASK = [
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   /\d/,
   '-',
   /\d/,
   /\d/,
   /\d/
]

export const isValidZipCode = (zipCode: string) => {
   const cleanZipCode = zipCode.replace(/\D/g, '')
   return cleanZipCode.length === 8
}

export const isValidEmail = (email: string) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   return emailRegex.test(email)
}

export const isValidEmailStrict = (email: string) => {
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   return emailRegex.test(email)
}
