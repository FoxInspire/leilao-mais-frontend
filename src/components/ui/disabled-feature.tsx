import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'

interface DisabledFeatureProps {
   children: ReactNode
   message?: string
   className?: string
}

export const DisabledFeature: React.FC<DisabledFeatureProps> = ({
   children,
   message = 'Funcionalidade em desenvolvimento',
   className
}: DisabledFeatureProps) => {
   return (
      <TooltipProvider>
         <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
               <div>{children}</div>
            </TooltipTrigger>
            <TooltipContent>
               <p className="text-sm">{message}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}
