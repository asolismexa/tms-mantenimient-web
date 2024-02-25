import { useState, useMemo } from 'react'
import CustomDataGrid from '@/components/custom/CustomDataGrid'
import {
  Box,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useSearchOTs } from '@/hooks/ots/useSearchOTs'
import { otPageColumns } from './columns'

const initialForm = {
  name: '',
  userId: null,
  statusId: 1,
  startDate: null,
  endDate: null,
  costCenterId: null,
  orderTypeId: null,
  released: false,
}

export function OtPage() {
  const { ots, loading: isSearching, searchOts } = useSearchOTs()
  const [form, setForm] = useState(initialForm)

  const columns = useMemo(() => otPageColumns(), [])

  const handleClearFilters = () => setForm(initialForm)

  const handleChangeDateInput = (field) => (val) => {
    setForm((prev) => ({ ...prev, [field]: val }))
  }

  const handleChangeInput = (field) => (e) => {
    let value = e.target.value
    if (field === 'released') value = e.target.checked
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    if (!form.startDate || !form.endDate) return
    searchOts({
      ...form,
      startDate: form.startDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: form.endDate.format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        bgcolor: '#f5f5f5',
      }}
    >
      <Stack sx={{ width: '100%' }} direction="row" justifyContent="center">
        <Stack spacing={1} sx={{ maxWidth: 300, minWidth: 250, p: 2 }}>
          <Typography textAlign="center" variant="h5">
            ORDENES DE TRABAJO
          </Typography>
          <Button onClick={handleSearch}>BUSCAR</Button>
          <Button onClick={handleClearFilters}>LIMPIAR FILTROS</Button>
          <Box>
            <DatePicker
              label="FECHA INICIO"
              value={form.startDate}
              onChange={handleChangeDateInput('startDate')}
              slotProps={{
                textField: { size: 'small', fullWidth: true, margin: 'dense' },
              }}
            />
            <DatePicker
              label="FECHA FIN"
              value={form.endDate}
              onChange={handleChangeDateInput('endDate')}
              slotProps={{
                textField: { size: 'small', fullWidth: true, margin: 'dense' },
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="NOMBRE"
              margin="dense"
              value={form.name}
              onChange={handleChangeInput('name')}
            />
            <TextField fullWidth size="small" label="USUARIO" margin="dense" />
            <TextField
              fullWidth
              size="small"
              label="CENTRO COSTOS"
              margin="dense"
            />
            <TextField
              fullWidth
              size="small"
              label="TIPO ORDEN DE TRABAJO"
              margin="dense"
            />
            <FormControlLabel
              label="SIN LIBERAR"
              value={form.released}
              onChange={handleChangeInput('released')}
              control={<Checkbox />}
            />
          </Box>
        </Stack>
        <CustomDataGrid
          sx={{ width: '100%', height: '100%' }}
          loading={isSearching}
          columns={columns}
          rows={ots}
          rowHeight={65}
          getRowId={(row) => row.Id}
          disableColumnSelector
          disableDensitySelector
        />
      </Stack>
    </Box>
  )
}
