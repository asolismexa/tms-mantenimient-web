import {
  Box,
  TextField,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import AutoCompleteAsync from './AutoCompleteAsync'

function ReportsMonitorFilters({ filters, setFilters }) {
  const handleChangeFilter = ({ name, value }) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Stack sx={{ pt: 2, pb: 0.5, width: 1500 }} direction="row" spacing={1}>
        <TextField
          label="FOLIO"
          size="small"
          margin="none"
          onChange={(event) =>
            handleChangeFilter({ name: 'folio', value: event.target.value })
          }
          value={filters.folio}
        />
        <DateTimePicker
          label="FECHA / HORA REPORTE"
          size="small"
          margin="none"
          slotProps={{
            textField: {
              margin: 'none',
              size: 'small',
            },
          }}
          onChange={(date) => handleChangeFilter({ name: 'date', value: date })}
          value={filters.time}
        />
        <AutoCompleteAsync
          width={200}
          label="UNIDAD"
          nameKey="alias"
          url="/api/vehicles"
          inputProps={{
            margin: 'none',
            size: 'small',
          }}
          onChange={(_, newValue) => {
            handleChangeFilter({ name: 'vehicle', value: newValue })
          }}
          value={filters.vehicle}
        />
        <AutoCompleteAsync
          width={200}
          url="/api/drivers"
          label="OPERADOR"
          size="small"
          margin="none"
          inputProps={{
            margin: 'none',
            size: 'small',
          }}
          onChange={(_, newValue) =>
            handleChangeFilter({ name: 'driver', value: newValue })
          }
          value={filters.driver}
        />
        <TextField
          label="SOLICITUD"
          size="small"
          margin="none"
          onChange={(event) =>
            handleChangeFilter({ name: 'solicitud', value: event.target.value })
          }
          value={filters.solicitud}
        />
        <AutoCompleteAsync
          label="ESTATUS"
          url="/api/reports/status"
          inputProps={{
            margin: 'none',
            size: 'small',
          }}
          onChange={(_, newValue) =>
            handleChangeFilter({ name: 'status', value: newValue })
          }
          value={filters.status}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="EVID"
          onChange={(event) =>
            handleChangeFilter({
              name: 'evidence',
              value: event.target.checked,
            })
          }
          value={filters.evid}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="OBS"
          onChange={(event) =>
            handleChangeFilter({
              name: 'observation',
              value: event.target.checked,
            })
          }
          value={filters.obs}
        />
      </Stack>
    </Box>
  )
}

export default ReportsMonitorFilters
