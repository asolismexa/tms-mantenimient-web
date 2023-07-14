import { Stack, Box, Typography } from '@mui/material'
import { formatDate, utcToLocal } from '@/utils/dates'
import CheckLogo from '@/components/Core/CheckLogo'
import AsyncSelectFilter from '../Core/AsyncSelectFilter'
import { store } from '@/store'
import { setFilters } from '@/reducers/reportMonitorSlice'
import { reportStatusUrl } from '@/services/reportStatus'

const { dispatch } = store
const stopEvents = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const handleChangeFilter = (e, filterName) => {
  const filters = store.getState().reportMonitor.filters
  stopEvents(e)
  dispatch(
    setFilters({
      ...filters,
      [filterName]: e.target.value,
    }),
  )
}

export const reportsColumns = [
  {
    field: 'id',
    headerName: 'FOLIO',
    width: 150,
    renderHeader: ({ colDef: { headerName } }) => {
      return (
        <Stack>
          <Typography variant="body2" fontWeight="bold">
            {headerName}
          </Typography>
          <input
            style={{
              display: 'block',
              width: '100%',
              zIndex: 1,
            }}
            type="text"
            onClick={stopEvents}
            onChange={(e) => {
              handleChangeFilter(e, 'folio')
            }}
          />
        </Stack>
      )
    },
  },
  {
    field: 'time',
    headerName: 'FECHA / HORA REPORTE',
    type: 'dateTime',
    width: 100,
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
    renderHeader: ({ colDef: { headerName } }) => {
      return (
        <Stack direction="column">
          <Box sx={{ fontWeight: 'bold', lineHeight: 'initial' }}>
            {headerName}
          </Box>
          <AsyncSelectFilter
            url={reportStatusUrl}
            name="select"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            onChange={(e) => {
              handleChangeFilter(e, 'status')
            }}
          />
        </Stack>
      )
    },
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
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
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
  {
    field: 'attended_on',
    headerName: 'FECHA OT FINALIZA',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
  {
    field: 'attended_by',
    headerName: 'USUARIO FINALIZA OT',
    type: 'string',
    width: 100,
  },
  {
    field: 'validated_on',
    headerName: 'FECHA EVALUADO',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
  {
    field: 'validated_by',
    headerName: 'USUARIO EVALUA',
    type: 'string',
    width: 100,
  },
  {
    field: 'validated_success',
    headerName: 'EVALUACION',
    type: 'boolean',
    width: 100,
    renderCell: ({ value }) => {
      if (value === null) return null
      return <CheckLogo checked={value} />
    },
  },
  {
    field: 'canceled_on',
    headerName: 'FECHA CANCELADO',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
  {
    field: 'canceled_by',
    headerName: 'USUARIO CANCELA',
    type: 'string',
    width: 100,
  },
]
