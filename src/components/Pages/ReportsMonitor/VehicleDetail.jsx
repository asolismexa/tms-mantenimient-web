import { Divider, Typography } from '@mui/material'

export function VehicleDetail ({ detail }) {
  if (!detail) return null
  const hasDriver = detail.driver !== null && detail.driver !== undefined
  const hasShipment = detail.shipment !== null && detail.shipment !== undefined

  return (
    <>
      {hasDriver && (
        <div>
          <Divider sx={{ my: 2 }} />
          <Typography variant='caption' fontWeight='bold'>
            OPERADOR
          </Typography>
          <Typography variant='body2'>
            {detail.driver}
          </Typography>
        </div>
      )}
      {hasShipment && (
        <div>
          <Divider sx={{ my: 2 }} />
          <Typography variant='caption' fontWeight='bold'>
            SOLICITUD
          </Typography>
          <Typography variant='body2'>
            {detail.shipment}
          </Typography>
        </div>
      )}
    </>
  )
}
