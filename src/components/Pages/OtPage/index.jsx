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
import { otPageColumns } from './columns'
import { useSearchOTs } from '@/hooks/ots/useSearchOTs'
import { useMemo } from 'react'

export function OtPage() {
  const { ots, loading: isSearching, searchOts } = useSearchOTs()

  const columns = useMemo(() => otPageColumns(), [])

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
          <Button onClick={searchOts}>BUSCAR</Button>
          <Button>LIMPIAR FILTROS</Button>
          <Box>
            <DatePicker
              label="FECHA INICIO"
              slotProps={{
                textField: { size: 'small', fullWidth: true, margin: 'dense' },
              }}
            />
            <DatePicker
              label="FECHA FIN"
              slotProps={{
                textField: { size: 'small', fullWidth: true, margin: 'dense' },
              }}
            />
            <TextField fullWidth size="small" label="NOMBRE" margin="dense" />
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
            <FormControlLabel label="SIN LIBERAR" control={<Checkbox />} />
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
