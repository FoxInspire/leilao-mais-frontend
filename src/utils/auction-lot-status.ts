export const auctionLotStatusOptions = [
   { value: 'unpaid_auction', label: 'Arrematação não paga' },
   { value: 'preserved', label: 'Conservado' },
   { value: 'fix_report', label: 'Corrigir laudo' },
   { value: 'police_station', label: 'Delegacia' },
   { value: 'disassociated_payment', label: 'Desassociado boleto' },
   { value: 'under_analysis', label: 'Em análise' },
   { value: 'canceled_grv', label: 'GRV cancelada' },
   { value: 'inspection_identification', label: 'Ident na vistoria' },
   { value: 'unanalyzed_report', label: 'Laudo não analisado' },
   { value: 'auctioned_preserved', label: 'Leiloado - conservado' },
   {
      value: 'auctioned_usable_scrap',
      label: 'Leiloado - sucata aproveitavel'
   },
   {
      value: 'auctioned_usable_scrap_unusable_engine',
      label: 'Leiloado - sucata aproveitavel com motor inservível'
   },
   {
      value: 'auctioned_unusable_scrap_identified',
      label: 'Leiloado - sucata inservível identificada'
   },
   {
      value: 'auctioned_unusable_scrap_unidentified',
      label: 'Leiloado - sucata inservível não identificada'
   },
   {
      value: 'lot_auctioned_other_auction',
      label: 'Lote arrematado em outro leilão'
   },
   { value: 'expertise_not_performed', label: 'Pericia não realizada' },
   {
      value: 'expertise_without_publication',
      label: 'Periciado sem publicação'
   },
   { value: 'removed_from_auction', label: 'Removido de leilão' },
   {
      value: 'administrative_restriction',
      label: 'Restrição administrativa'
   },
   { value: 'judicial_restriction', label: 'Restrição judicial' },
   { value: 'theft_restriction', label: 'Restrição roubo/furto' },
   { value: 'no_notification_return', label: 'Sem retorno de notificação' },
   { value: 'clone_suspicion', label: 'Suspeita de clone' },
   { value: 'vehicle_written_off', label: 'Veículo baixado' },
   { value: 'vehicle_released', label: 'Veículo liberado' },
   { value: 'vehicle_not_found', label: 'Veículo não localizado' }
]
