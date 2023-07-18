import CustomDataGrid from '@/components/custom/DataGrid'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import CheckLogo from '@/components/Core/CheckLogo'
import { formatDate, utcToLocal } from '@/utils/dates'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectReportsQuery,
  setFilters,
  resetFilters,
} from '@/reducers/reportsQuerySlice'

function ReportsMonitor() {
  const { filters } = useSelector(selectReportsQuery)
  const dispatch = useDispatch()

  const handleChangeFilter = (filter, value) => {
    dispatch(setFilters({ ...filters, [filter]: value }))
  }

  const handleCleanFilters = () => {
    dispatch(resetFilters())
  }

  console.log(filters)
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6">Reportes</Typography>
      <Stack direction="row" spacing={2}>
        <Box sx={{ minWidth: 200 }}>
          <Stack sx={{ mt: 1 }} spacing={1}>
            <Button fullWidth>BUSCAR</Button>
            <Button fullWidth size="small" onClick={handleCleanFilters}>
              LIMPIAR FILTROS
            </Button>
            <TextField
              fullWidth
              label="FOLIO"
              margin="dense"
              size="small"
              onChange={(e) => handleChangeFilter('folio', e.target.value)}
              value={filters.folio}
            />
            <TextField fullWidth label="ESTATUS" margin="dense" size="small" />
            <TextField
              fullWidth
              label="TIPO FALLA"
              margin="dense"
              size="small"
            />
            <TextField fullWidth label="OT" margin="dense" size="small" />
            <TextField fullWidth label="UNIDAD" margin="dense" size="small" />
            <TextField fullWidth label="OPERADOR" margin="dense" size="small" />
            <TextField fullWidth label="USUARIO" margin="dense" size="small" />
            <TextField fullWidth label="FOLIO" margin="dense" size="small" />
            <TextField
              fullWidth
              label="REPORTADO EN"
              margin="dense"
              size="small"
            />
            <TextField
              fullWidth
              label="REPORTADO HASTA"
              margin="dense"
              size="small"
            />
          </Stack>
        </Box>
        <Box>
          <CustomDataGrid columns={columns} rows={[]} />
        </Box>
      </Stack>
    </Box>
  )
}

export default ReportsMonitor

const columns = [
  {
    field: 'id',
    headerName: 'FOLIO',
    width: 150,
  },
  {
    field: 'time',
    headerName: 'FECHA / HORA REPORTE',
    type: 'dateTime',
    width: 110,
    valueFormatter: ({ value }) => {
      return formatDate(value)
    },
    valueGetter: ({ value }) => {
      return value ? utcToLocal(value) : 'Sin fecha'
    },
  },
  {
    field: 'vehicle',
    headerName: 'UNIDAD',
  },
  {
    field: 'odometer',
    headerName: 'HOROMETRO',
  },
  {
    field: 'driver',
    headerName: 'OPERADOR',
    width: 150,
  },
  {
    field: 'shipment_id',
    headerName: 'SOLICITUD',
  },
  {
    field: 'ot',
    headerName: 'OT',
    wdith: 150,
  },
  {
    field: 'status',
    headerName: 'ESTATUS',
    width: 100,
  },
  {
    field: 'report_type',
    headerName: 'TIPO FALLA',
    width: 200,
  },
  {
    field: 'has_observations',
    headerName: 'OBS',
    type: 'boolean',
    width: 100,
    renderCell: ({ value }) => {
      if (value === null) return null
      return <CheckLogo checked={value} />
    },
  },
  {
    field: 'has_evidences',
    headerName: 'EVID',
    type: 'boolean',
    width: 100,
    renderCell: ({ value }) => {
      if (value === null) return null
      return <CheckLogo checked={value} />
    },
  },
  {
    field: 'user',
    headerName: 'USUARIO',
    type: 'string',
    width: 130,
  },
  {
    field: 'assigned_on',
    headerName: 'FECHA OT ASIGNADA',
    type: 'string',
    width: 100,
  },
  {
    field: 'assigned_by',
    headerName: 'USUARIO ASIGNA OT',
    type: 'string',
    width: 100,
  },
  {
    field: 'process_on',
    headerName: 'FECHA OT EN PROCESO',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
  {
    field: 'process_by',
    headerName: 'USUARIO PROCESA OT',
    type: 'string',
    width: 100,
  },
]
