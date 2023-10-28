import { formatDate, utcToLocal } from '@/utils/dates'
import CheckLogo from '@/components/Core/CheckLogo'
import { reportStatusUrl } from '@/services/reportStatus'
import { reportTypeBaseUrl } from '@/services/reportTypes'
import { mettersToKilometers } from '@/utils/numbers'
import { groupsBaseUrl } from '@/services/vehicles'
import { CustomHeader } from '@/components/columns/CustomHeader'
import InputTextHeader from '@/components/columns/InputTextHeader'
import { SelectAsyncHeader } from '@/components/columns/SelectAsyncHeader'
import { SelectHeader } from '@/components/columns/SelectHeader'
import { VEHICLE_TYPES_LIST } from '@/enums/vehicles'
import { CheckBoxHeader } from '@/components/columns/CheckBoxHeader'
import { initialAggregations } from '@/utils/reportsAggregations'

export const stopEvents = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export const createMonitorColumns = ({
  onFilterChange,
  aggregations = { ...initialAggregations }
}) => [
  {
    field: 'id',
    headerName: 'FOLIO',
    minWidth: 80,
    renderHeader: () => {
      return (
        <InputTextHeader
          label="FOLIO"
          onChange={({ target }) => onFilterChange('folio', target.value)}
        >
          {aggregations.totalCount}
        </InputTextHeader>
      )
    }
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
      return <CustomHeader title={headerName}></CustomHeader>
    }
  },
  {
    field: 'vehicle',
    headerName: 'UNIDAD',
    width: 120,
    renderHeader: () => {
      return (
        <InputTextHeader
          label="UNIDAD"
          onChange={({ target }) => onFilterChange('vehicle', target.value)}
        >
          {aggregations.vehicleCount}
        </InputTextHeader>
      )
    }
  },
  {
    field: 'vehicleType',
    headerName: 'TIPO UNIDAD',
    width: 150,
    valueFormatter: ({ value }) => {
      return value === 'CARGA' ? 'REMOLQUE' : value
    },
    renderHeader: () => {
      return (
        <SelectHeader
          label="TIPO UNIDAD"
          options={VEHICLE_TYPES_LIST}
          onChange={({ target }) => onFilterChange('vehicleType', target.value)}
        >
          {aggregations.vehicleTypeCount}
        </SelectHeader>
      )
    }
  },
  {
    field: 'odometer',
    headerName: 'ODOMETRO',
    width: 130,
    valueFormatter: ({ value }) => {
      if (value) return mettersToKilometers(value)
      return null
    },
    renderHeader: () => {
      return (
        <InputTextHeader
          label="ODOMETRO"
          onChange={({ target }) => onFilterChange('odometer', target.value)}
        ></InputTextHeader>
      )
    }
  },
  {
    field: 'driver',
    headerName: 'OPERADOR',
    renderHeader: () => {
      return (
        <InputTextHeader
          label="OPERADOR"
          onChange={({ target }) => onFilterChange('driver', target.value)}
        >
          {aggregations.driversCount}
        </InputTextHeader>
      )
    }
  },
  {
    field: 'cell',
    headerName: 'CE OP',
    width: 150,
    renderHeader: () => (
      <SelectAsyncHeader
        label="CE OP"
        url={groupsBaseUrl}
        onChange={({ target }) => onFilterChange('cell', target.value)}
      >
        {aggregations.cellCount}
      </SelectAsyncHeader>
    )
  },
  {
    field: 'shipmentId',
    headerName: 'SOLICITUD',
    width: 120,
    renderHeader: () => {
      return (
        <InputTextHeader
          label="SOLICITUD"
          onChange={({ target }) => onFilterChange('shipment', target.value)}
        >
          {aggregations.shipmentCount}
        </InputTextHeader>
      )
    }
  },
  {
    field: 'ot',
    headerName: 'OT',
    width: 150,
    renderHeader: () => {
      return (
        <InputTextHeader
          label="OT"
          onChange={({ target }) => onFilterChange('ot', target.value)}
        >
          {aggregations.otCount}
        </InputTextHeader>
      )
    }
  },
  {
    field: 'status',
    headerName: 'ESTATUS',
    width: 150,
    renderHeader: () => (
      <SelectAsyncHeader
        label="ESTATUS"
        url={reportStatusUrl}
        exclude={[3, 4, 6]}
        onChange={({ target }) => onFilterChange('status', target.value)}
      >
        {aggregations.statusCount}
      </SelectAsyncHeader>
    )
  },
  {
    field: 'reportType',
    headerName: 'TIPO FALLA',
    width: 200,
    renderHeader: () => (
      <SelectAsyncHeader
        label="TIPO FALLA"
        url={reportTypeBaseUrl}
        onChange={({ target }) => onFilterChange('reportType', target.value)}
      >
        {aggregations.reportTypeCount}
      </SelectAsyncHeader>
    )
  },
  {
    field: 'hasObservations',
    headerName: 'OBS',
    type: 'boolean',
    width: 100,
    renderCell: ({ value }) => {
      if (value === null) return null
      if (typeof value === 'number') return value
      return <CheckLogo checked={value} />
    }
  },
  {
    field: 'lastObservation',
    headerName: 'ULTIMA OBSERVACION',
    width: 200,
    renderCell: ({ value }) => (
      <span
        style={{
          display: 'block',
          maxHeight: '3rem',
          overflow: 'hidden'
        }}
      >
        {value}
      </span>
    )
  },
  {
    field: 'hasEvidences',
    headerName: 'EVID',
    type: 'boolean',
    width: 100,
    renderCell: ({ value }) => {
      if (value === null) return null
      if (typeof value === 'number') return value
      return <CheckLogo checked={value} />
    },
    renderHeader: () => {
      return (
        <CheckBoxHeader
          label="EVID"
          onChange={(_, value) => {
            onFilterChange('hasEvidences', value)
          }}
        >
          {aggregations.evidencesCount}
        </CheckBoxHeader>
      )
    }
  },
  {
    field: 'location',
    headerName: 'UBICACION INICIO REP',
    renderCell: ({ value }) => (
      <span
        style={{
          display: 'block',
          maxHeight: '3rem',
          overflow: 'hidden'
        }}
      >
        {value}
      </span>
    )
  },
  {
    field: 'user',
    headerName: 'USUARIO',
    type: 'string',
    width: 130,
    renderHeader: () => (
      <InputTextHeader
        label="USUARIO"
        onChange={({ target }) => onFilterChange('user', target.value)}
      >
        {aggregations.userCount}
      </InputTextHeader>
    )
  },
  {
    field: 'assignedOn',
    headerName: 'FECHA OT ASIGNADA',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    }
  },
  {
    field: 'assignedBy',
    headerName: 'USUARIO ASIGNA OT',
    type: 'string',
    width: 170,
    headerClassNames: 'MuiDataGrid-columnHeaderTitle',
    renderHeader: () => (
      <InputTextHeader
        label="USUARIO ASIGNA OT"
        onChange={({ target }) => onFilterChange('assignedBy', target.value)}
      >
        {aggregations.userAssignCount}
      </InputTextHeader>
    )
  },
  {
    field: 'processOn',
    headerName: 'FECHA OT EN PROCESO',
    headerClassNames: 'MuiDataGrid-columnHeaderTitle',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    }
  },
  {
    field: 'processBy',
    headerName: 'USUARIO PROCESA OT',
    type: 'string',
    width: 180,
    renderHeader: () => (
      <InputTextHeader
        label="USUARIO PROCESA OT"
        onChange={({ target }) => onFilterChange('processBy', target.value)}
      >
        {aggregations.userProcessCount}
      </InputTextHeader>
    )
  },
  {
    field: 'otDate',
    headerName: 'FECHA OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    }
  },
  {
    field: 'otInitialDate',
    headerName: 'FECHA INICIO OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    }
  },
  {
    field: 'otPromiseDate',
    headerName: 'FECHA PROMESA OT',
    type: 'string',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    }
  }
]
