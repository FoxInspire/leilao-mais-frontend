import { useEffect, useRef, useState } from 'react'

interface ElementSize {
   width: number
   height: number
}

export function useElementSize<T extends HTMLElement>() {
   const [dimensions, setDimensions] = useState<ElementSize>({
      width: 0,
      height: 0
   })
   const elementRef = useRef<T | null>(null) as React.MutableRefObject<T | null>

   useEffect(() => {
      const element = elementRef.current
      if (!element) return

      const resizeObserver = new ResizeObserver((entries) => {
         for (const entry of entries) {
            const { width, height } = entry.contentRect
            setDimensions({ width, height })
         }
      })

      resizeObserver.observe(element)

      return () => {
         resizeObserver.disconnect()
      }
   }, [])

   return { ref: elementRef, ...dimensions }
}
