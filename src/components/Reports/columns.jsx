import { formatDate, utcToLocal } from '@/utils/dates'
import CheckLogo from '@/components/Core/CheckLogo'
import { store } from '@/store'
import { setFilters } from '@/reducers/reportMonitorSlice'
import { reportStatusUrl } from '@/services/reportStatus'
import {
  AsyncSelectHeader,
  SelectFilterHeader,
  TextFilterHeader,
} from '../Core/headers'
import { reportTypeBaseUrl } from '@/services/reportTypes'
import { mettersToKilometers } from '@/utils/numbers'
import { groupsBaseUrl } from '@/services/vehicles'

const { dispatch } = store

const handleChangeFilter = (e, filterName) => {
  const filters = store.getState().reportMonitor.filters
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
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'folio')}
      />
    ),
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
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'vehicle')}
      />
    ),
  },
  {
    field: 'vehicle_type_id',
    headerName: 'TIPO UNIDAD',
    width: 150,
    valueFormatter: ({ value }) => {
      return value === 1 ? 'MOTRIZ' : 'REMOLQUE'
    },
    renderHeader: ({ colDef: { headerName } }) => (
      <SelectFilterHeader
        headerName={headerName}
        options={[
          { id: 1, name: 'MOTRIZ' },
          { id: 2, name: 'REMOLQUE' },
        ]}
        onChange={(e) => handleChangeFilter(e, 'vehicleType')}
      />
    ),
  },
  {
    field: 'odometer',
    headerName: 'ODOMETRO',
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'odometer')}
      />
    ),
    valueFormatter: ({ value }) => {
      if (value) return mettersToKilometers(value)
      return null
    },
  },
  {
    field: 'driver',
    headerName: 'OPERADOR',
    width: 150,
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'driver')}
      />
    ),
  },
  {
    field: 'cell',
    headerName: 'CE OP',
    width: 150,
    renderHeader: ({ colDef: { headerName } }) => (
      <AsyncSelectHeader
        headerName={headerName}
        url={groupsBaseUrl}
        onChange={(e) => handleChangeFilter(e, 'cell')}
      />
    ),
  },
  {
    field: 'shipment_id',
    headerName: 'SOLICITUD',
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'shipment')}
      />
    ),
  },
  {
    field: 'ot',
    headerName: 'OT',
    wdith: 150,
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'ot')}
      />
    ),
  },
  {
    field: 'status',
    headerName: 'ESTATUS',
    width: 150,
    renderHeader: ({ colDef: { headerName } }) => (
      <AsyncSelectHeader
        headerName={headerName}
        url={reportStatusUrl}
        onChange={(e) => handleChangeFilter(e, 'status')}
      />
    ),
  },
  {
    field: 'report_type',
    headerName: 'TIPO FALLA',
    width: 200,
    renderHeader: ({ colDef: { headerName } }) => (
      <AsyncSelectHeader
        headerName={headerName}
        url={reportTypeBaseUrl}
        onChange={(e) => handleChangeFilter(e, 'reportType')}
      />
    ),
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
    field: 'last_observation',
    headerName: 'ULTIMA OBSERVACION',
    width: 200,
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
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'user')}
      />
    ),
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
    width: 170,
    headerClassNames: 'MuiDataGrid-columnHeaderTitle',
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'userAssign')}
      />
    ),
  },
  {
    field: 'process_on',
    headerName: 'FECHA OT EN PROCESO',
    headerClassNames: 'MuiDataGrid-columnHeaderTitle',
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
    width: 180,
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader
        headerName={headerName}
        onChange={(e) => handleChangeFilter(e, 'userProcess')}
      />
    ),
  },
  {
    field: 'ot_date',
    headerName: 'FECHA OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
  {
    field: 'ot_initial_date',
    headerName: 'FECHA INICIO OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
  {
    field: 'ot_promise_date',
    headerName: 'FECHA PROMESA OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
  },
]
