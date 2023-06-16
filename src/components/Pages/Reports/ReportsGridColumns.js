import { status, types } from '@/constants/reports'

export default [
  {
    field: 'time',
    type: 'dateTime',
    headerName: 'Fecha',
    width: 200,
    valueGetter: ({ value }) => {
      const date = new Date(value)

      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      }

      return new Date(date.toLocaleString('en-US', options))
    },
  },
  {
    field: 'number',
    headerName: 'Folio',
    width: 120,
  },
  {
    field: 'status_id',
    type: 'singleSelect',
    headerName: 'Estatus',
    width: 150,
    valueOptions: status,
  },
  {
    field: 'report_type_id',
    headerName: 'Tipo',
    type: 'singleSelect',
    width: 150,
    valueOptions: types,
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
