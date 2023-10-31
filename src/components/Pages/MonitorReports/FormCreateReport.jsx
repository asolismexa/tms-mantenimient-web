import { useState, useEffect } from 'react'
import { Divider, Typography, CircularProgress, Stack } from '@mui/material'
import AutoCompleteVehicles from './AutoCompleteVehicles'
import { getVehicleById } from '@/services/vehicles'

function FormCreateReport ({ form, setForm, children }) {
  const [resp, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (form.vehicle) {
      setLoading(true)
      getVehicleById(form.vehicle.id)
        .then(({ data }) => {
          setResponse(data)
          setForm((prev) => {
            return {
              ...prev,
              driver: data.driver,
              shipment: data.shipmentsCurrent
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [form.vehicle, setForm])

  return (
    <Stack padding={1} spacing={2}>
      <Stack direction="row" spacing={2}>
        <AutoCompleteVehicles
          value={form.vehicle}
          onChange={(_, newValue) => {
            setForm({
              ...form,
              vehicle: newValue
            })
          }}
        />
        {form.vehicle && form.vehicle?.freight_type_id == -1 && (
          <div>
            <Typography variant="caption">CONFIGURACION MOTRIZ</Typography>
            <Typography variant="body1">
              {form.vehicle?.performance_type}
            </Typography>
          </div>
        )}
        {form.vehicle && form.vehicle?.freight_type_id != -1 && (
          <div>
            <Typography variant="caption">REMOLQUE</Typography>
            <Typography variant="body1">
              {form.vehicle?.freight_type}, {form.vehicle?.door_type},{' '}
              {form.vehicle?.model_year}
            </Typography>
          </div>
        )}
      </Stack>
      <Divider />
      {loading && <CircularProgress />}
      {resp && resp.driver && (
        <>
          <Divider sx={{ mt: 1 }} />
          <Typography variant="caption">OPERADOR</Typography>
          <Typography variant="body1">{resp.driver.driver}</Typography>
        </>
      )}
      {resp && resp.shipmentsCurrent && (
        <>
          <Divider sx={{ mt: 1 }} />
          <Typography variant="caption">SOLICITUD</Typography>
          <Typography variant="body1">
            {resp.shipmentsCurrent.shipment_id}
          </Typography>
        </>
      )}
      <div>{children}</div>
    </Stack>
  )
}

export default FormCreateReport
