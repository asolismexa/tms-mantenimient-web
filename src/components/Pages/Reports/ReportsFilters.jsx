import { useState } from 'react'
import {
  TextField,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import ReplayIcon from '@mui/icons-material/Replay'
import SelectAsync from '@/components/Core/SelectAsync'

const initialForm = {
  folio: '',
  status: null,
  type: null,
  user: null,
  driver: null,
  vehicle: null,
}

function Filters({ onSearch, token }) {
  const [form, setForm] = useState(initialForm)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  const handleOnSearch = () => {
    if (onSearch) {
      onSearch({ ...form, start_date: startDate, end_date: endDate })
    }
  }

  return (
    <div>
      <Typography variant="h6">Reportes</Typography>
      <Stack direction="row" spacing={2}>
        <Button sx={{ my: 2 }} fullWidth onClick={handleOnSearch}>
          BUSCAR
        </Button>
        <Tooltip title="Limpiar filtros">
          <IconButton
            size="small"
            onClick={() => {
              setForm(initialForm)
              setStartDate(null)
              setEndDate(null)
            }}
          >
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <DateTimePicker
        label="DESDE"
        slotProps={{
          textField: {
            fullWidth: true,
            margin: 'dense',
            name: 'start_date',
            size: 'small',
          },
        }}
        defaultValue={startDate}
        onChange={(date) => setStartDate(date)}
        format="DD/MM/YYYY"
        value={startDate}
      />
      <DateTimePicker
        label="HASTA"
        slotProps={{
          textField: {
            fullWidth: true,
            margin: 'dense',
            size: 'small',
          },
        }}
        defaultValue={endDate}
        onChange={(date) => setEndDate(date)}
        value={endDate}
      />
      <TextField
        type="text"
        label="FOLIO"
        name="folio"
        fullWidth
        size="small"
        margin="dense"
        value={form.date}
        onChange={handleChange}
      />
      <SelectAsync
        label="ESTATUS"
        url="/api/reports/status"
        headers={{ Authorization: `Bearer ${token}` }}
        onChange={(event, newValue) => {
          setForm({
            ...form,
            status: newValue,
          })
        }}
        value={form.status}
      />
      <SelectAsync
        label="TIPO"
        url="/api/reports/types"
        headers={{ Authorization: `Bearer ${token}` }}
        onChange={(event, newValue) => {
          setForm({
            ...form,
            type: newValue,
          })
        }}
        value={form.type}
      />
      <SelectAsync
        label="USUARIO"
        url="/api/users"
        headers={{ Authorization: `Bearer ${token}` }}
        onChange={(event, newValue) => {
          setForm({
            ...form,
            user: newValue,
          })
        }}
        value={form.user}
      />
      <SelectAsync
        label="OPERADOR"
        url="/api/drivers"
        headers={{ Authorization: `Bearer ${token}` }}
        onChange={(event, newValue) => {
          setForm({
            ...form,
            driver: newValue,
          })
        }}
        value={form.driver}
      />
      <SelectAsync
        label="UNIDAD"
        url="/api/vehicles"
        nameKey="alias"
        headers={{ Authorization: `Bearer ${token}` }}
        onChange={(event, newValue) => {
          setForm({
            ...form,
            vehicle: newValue,
          })
        }}
        value={form.vehicle}
      />
    </div>
  )
}

export default Filters
