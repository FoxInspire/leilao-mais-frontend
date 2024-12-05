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
