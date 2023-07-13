import { Stack, Box } from '@mui/material'
import { formatDate, utcToLocal } from '@/utils/dates'
import CheckLogo from '@/components/Core/CheckLogo'

export const reportsColumns = [
  {
    field: 'id',
    headerName: 'FOLIO',
    width: 100,
    renderHeader: ({ colDef: { headerName } }) => {
      return (
        <Stack direction="column">
          <Box sx={{ fontWeight: 'bold', lineHeight: 'initial' }}>
            {headerName}
          </Box>
          <input
            style={{ width: '100%' }}
            type="text"
            name="select"
            onClick={(evt) => {
              evt.stopPropagation()
              evt.preventDefault()
            }}
            onChange={(evt) => {
              evt.stopPropagation()
              evt.preventDefault()
              const { target } = evt
              const { value } = target
              // onStatusColorHeaderFilterChange(parseInt(value))
            }}
            // value={filterValue}
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
          <select
            name="select"
            onClick={(evt) => {
              evt.stopPropagation()
              evt.preventDefault()
            }}
            onChange={(evt) => {
              evt.stopPropagation()
              evt.preventDefault()
              // onStatusColorHeaderFilterChange(parseInt(value))
            }}
            // value={filterValue}
          >
            <option value="-1">[TODOS]</option>
            <option value="1">ROJO</option>
          </select>
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
