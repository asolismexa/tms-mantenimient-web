import { formatDate } from '@/utils/dates'
import dayjs from 'dayjs'

export default [
  {
    field: 'time',
    type: 'string',
    headerName: 'Fecha',
    width: 200,
    valueFormatter: ({ value }) => {
      return formatDate(value)
    },
    valueGetter: ({ value }) => {
      return dayjs(value).utc()
    },
  },
  {
    field: 'number',
    headerName: 'Folio',
    width: 120,
  },
  {
    field: 'status',
    type: 'string',
    headerName: 'Estatus',
    width: 150,
    // valueOptions: status,
  },
  {
    field: 'report_type',
    headerName: 'Tipo',
    type: 'string',
    width: 200,
    // valueOptions: types,
  },
  {
    field: 'user',
    headerName: 'Usuario',
    width: 150,
  },
  {
    field: 'driver',
    headerName: 'Operador',
    width: 200,
  },
  {
    field: 'vehicle',
    headerName: 'Unidad',
    width: 150,
  },
]
