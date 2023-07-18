import CustomDataGrid from '@/components/custom/DataGrid'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import CheckLogo from '@/components/Core/CheckLogo'
import { formatDate, utcToLocal } from '@/utils/dates'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectReportsQuery,
  setFilters,
  resetFilters,
  searchReports,
} from '@/reducers/reportsQuerySlice'
import AutoCompleteStatus from '../MonitorReports/AutoCompleteStatus'
import AutoCompleteTypes from '../MonitorReports/AutoCompleteTypes'
import AutoCompleteVehicles from '../MonitorReports/AutoCompleteVehicles'
import AutoCompleteDrivers from '../MonitorReports/AutoCompleteAsyncDrivers'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'

const inputStyles = {
  width: '100%',
  inputProps: {
    size: 'small',
  },
}

function ReportsMonitor() {
  const { filters, reports, loadingReports } = useSelector(selectReportsQuery)
  const dispatch = useDispatch()

  const handleChangeFilter = (filter, value) => {
    dispatch(setFilters({ ...filters, [filter]: value }))
  }

  const handleCleanFilters = () => {
    dispatch(resetFilters())
  }

  const handleSearchReports = () => {
    dispatch(searchReports())
  }

  console.log(filters)
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6">Reportes</Typography>
      <Stack direction="row" spacing={2}>
        <Box sx={{ minWidth: 200 }}>
          <Stack sx={{ mt: 1 }} spacing={1}>
            <Button fullWidth onClick={handleSearchReports}>
              BUSCAR
            </Button>
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
            <AutoCompleteStatus
              onChange={(_, value) => handleChangeFilter('status', value)}
              value={filters.status}
            />
            <AutoCompleteTypes
              {...inputStyles}
              onChange={(_, value) => handleChangeFilter('type', value)}
              value={filters.type}
            />
            <TextField
              fullWidth
              label="OT"
              margin="dense"
              size="small"
              onChange={(e) => handleChangeFilter('ot', e.target.value)}
              value={filters.ot}
            />
            <AutoCompleteVehicles
              {...inputStyles}
              onChange={(_, value) => handleChangeFilter('vehicle', value)}
              value={filters.vehicle}
            />
            <AutoCompleteDrivers
              {...inputStyles}
              onChange={(_, value) => handleChangeFilter('driver', value)}
              value={filters.driver}
            />
            <TextField fullWidth label="USUARIO" margin="dense" size="small" />
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
          {loadingReports ? (
            <LoadingBackdrop open={loadingReports} />
          ) : (
            <CustomDataGrid columns={columns} rows={reports} />
          )}
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
