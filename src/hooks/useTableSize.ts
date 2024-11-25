import { useEffect, useState } from 'react'

interface TableSizeConfig {
   containerHeight: number
   rowHeight: number
   headerHeight: number
   paginationHeight: number
   padding: number
}

export function useTableSize(containerHeight: number) {
   const [pageSize, setPageSize] = useState(8)

   useEffect(() => {
      const config: TableSizeConfig = {
         containerHeight,
         rowHeight: 53, // altura de cada linha
         headerHeight: 45, // altura do header da tabela
         paginationHeight: 56, // altura da paginação
         padding: 32 // padding total (16px top + 16px bottom)
      }

      const availableHeight =
         config.containerHeight -
         config.headerHeight -
         config.paginationHeight -
         config.padding
      const calculatedRows = Math.floor(availableHeight / config.rowHeight)

      // Garantir um mínimo de 1 linha e máximo baseado no espaço disponível
      const newPageSize = Math.max(1, calculatedRows)
      setPageSize(newPageSize)
   }, [containerHeight])

   return pageSize
}
