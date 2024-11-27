export interface VehicleEntity {
   id?: string
   name?: string
   description?: string
   chassis?: string
   plate?: string
   type?: {
      id?: string
      name?: string
      description?: string
      category?: {
         id: string
         name: string
         type: string
         dailyValue: number
         towingCost: number
      }
   }
   brand?: {
      id?: string
      name?: string
      typeVehicle?: string
   }
   model?: {
      id?: string
      name?: string
      brandId?: string
   }
   equipments?: Array<{
      id: string
      name: string
      code: number
      required: boolean
      vehicleTypes: string[]
      createdAt: Date
      updatedAt: Date
   }>
   createdAt?: Date
   updatedAt?: Date
}
