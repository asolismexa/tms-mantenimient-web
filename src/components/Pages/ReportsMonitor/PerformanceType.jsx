import { VEHICLE_TYPES } from '@/enums/vehicles'
import { Typography } from '@mui/material'

export function PerformanceType ({ detail }) {
  if (!detail) return <Typography>UNIDAD SIN SELECCIONAR</Typography>
  return (
    <div>
      <Typography variant='caption' fontWeight='bold'>
        {detail.typeId === VEHICLE_TYPES.MOTRIZ && 'CONFIGURACION MOTRIZ'}
        {detail.typeId === VEHICLE_TYPES.REMOLQUE && 'REMOLQUE'}
        {detail.typeId === VEHICLE_TYPES.DOLLY && 'DOLLY'}
      </Typography>
      <Typography variant='body2'>
        {detail.typeId === VEHICLE_TYPES.MOTRIZ && detail?.configuration}
        {
          detail.typeId === VEHICLE_TYPES.REMOLQUE &&
          detail.freightType !== -1 &&
          `${detail.feature}, ${detail.doorType}, `
        }
        {
          detail.year
        }
      </Typography>
    </div>
  )
}
