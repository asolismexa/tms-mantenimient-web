import { formatDate, utcToLocal } from '@/utils/dates'
import CheckLogo from '@/components/Core/CheckLogo'
import { reportStatusUrl } from '@/services/reportStatus'
import {
  AsyncSelectHeader,
  SelectFilterHeader,
  TextFilterHeader,
} from '@components/Core/headers'
import { reportTypeBaseUrl } from '@/services/reportTypes'
import { mettersToKilometers } from '@/utils/numbers'
import { groupsBaseUrl } from '@/services/vehicles'
import { CustomHeader } from '@/components/columns/CustomHeader'

export const stopEvents = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export const createMonitorColumns = ({ filters = [], aggregations = [] }) => [
  {
    field: 'id',
    headerName: 'FOLIO',
    width: 200,
    renderHeader: ({ colDef: { headerName } }) => {
      return (
        <CustomHeader title={headerName}>
          <div>0</div>
          <input type="text" onClick={stopEvents} />
        </CustomHeader>
      )
    },
  },
  {
    field: 'time',
    headerName: 'FECHA / HORA REPORTE',
    type: 'string',
    width: 110,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
    valueGetter: ({ value }) => {
      return value ? utcToLocal(value) : null
    },
    renderHeader: ({ colDef: { headerName } }) => {
      return (
        <CustomHeader title={headerName}>
          <div>0</div>
        </CustomHeader>
      )
    },
  },
  {
    field: 'vehicle',
    headerName: 'UNIDAD',
    renderHeader: ({ colDef: { headerName } }) => {
      return (
        <CustomHeader title={headerName} onClick={stopEvents}>
          <div>0</div>
        </CustomHeader>
      )
    },
  },
  {
    field: 'vehicle_type_id',
    headerName: 'TIPO UNIDAD',
    width: 150,
    valueFormatter: ({ value }) => {
      if (typeof value === 'string') return value
      return value === 1 ? 'MOTRIZ' : 'REMOLQUE'
    },
    renderHeader: ({ colDef: { headerName } }) => {
      return (
        <CustomHeader title={headerName}>
          <div>0</div>
          <input type="text" onClick={stopEvents} />
        </CustomHeader>
      )
    },
  },
  {
    field: 'odometer',
    headerName: 'ODOMETRO',
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader headerName={headerName} />
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
      <TextFilterHeader headerName={headerName} />
    ),
  },
  {
    field: 'cell',
    headerName: 'CE OP',
    width: 150,
    renderHeader: ({ colDef: { headerName } }) => (
      <AsyncSelectHeader headerName={headerName} url={groupsBaseUrl} />
    ),
  },
  {
    field: 'shipment_id',
    headerName: 'SOLICITUD',
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader headerName={headerName} />
    ),
  },
  {
    field: 'ot',
    headerName: 'OT',
    wdith: 150,
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader headerName={headerName} />
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
        exclude={[3, 4, 6]}
      />
    ),
  },
  {
    field: 'report_type',
    headerName: 'TIPO FALLA',
    width: 200,
    renderHeader: ({ colDef: { headerName } }) => (
      <AsyncSelectHeader headerName={headerName} url={reportTypeBaseUrl} />
    ),
  },
  {
    field: 'has_observations',
    headerName: 'OBS',
    type: 'boolean',
    width: 100,
    renderCell: ({ value }) => {
      if (value === null) return null
      if (typeof value === 'number') return value
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
      if (typeof value === 'number') return value
      return <CheckLogo checked={value} />
    },
  },
  {
    field: 'user',
    headerName: 'USUARIO',
    type: 'string',
    width: 130,
    renderHeader: ({ colDef: { headerName } }) => (
      <TextFilterHeader headerName={headerName} />
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
      <TextFilterHeader headerName={headerName} />
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
      <TextFilterHeader headerName={headerName} />
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
