import CheckLogo from '@/components/Core/CheckLogo'

import { initialAggregations } from '@/utils/reportsAggregations'
import { formatDate, utcToLocal } from '@/utils/dates'
import { mettersToKilometers } from '@/utils/numbers'
import { CustomHeader } from '@/components/columns/CustomHeader'

export const createSearchColumns = ({
  aggregations = { ...initialAggregations }
}) => [
  {
    field: 'id',
    headerName: 'FOLIO',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="FOLIO">{aggregations.totalCount}</CustomHeader>
    )
  },
  {
    field: 'time',
    headerName: 'FECHA / HORA REPORTE',
    type: 'dateTime',
    width: 120,
    valueFormatter: ({ value }) => {
      if (value) return formatDate(value)
      return null
    },
    valueGetter: ({ value }) => {
      return value ? utcToLocal(value) : null
    }
  },
  {
    field: 'vehicle',
    headerName: 'UNIDAD',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="UNIDAD">{aggregations.vehicleCount}</CustomHeader>
    )
  },
  {
    field: 'odometer',
    headerName: 'ODOMETRO',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return mettersToKilometers(value)
      return null
    }
  },
  {
    field: 'driver',
    headerName: 'OPERADOR',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="OPERADOR">{aggregations.driversCount}</CustomHeader>
    )
  },
  {
    field: 'shipmentId',
    headerName: 'SOLICITUD',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="SOLICITUD">
        {aggregations.shipmentCount}
      </CustomHeader>
    )
  },
  {
    field: 'ot',
    headerName: 'OT',
    width: 150,
    renderHeader: () => (
      <CustomHeader title="OT">{aggregations.otCount}</CustomHeader>
    )
  },
  {
    field: 'status',
    headerName: 'ESTATUS',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="STATUS">{aggregations.statusCount}</CustomHeader>
    )
  },
  {
    field: 'reportType',
    headerName: 'TIPO FALLA',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="TIPO FALLA">
        {aggregations.reportTypeCount}
      </CustomHeader>
    )
  },
  {
    field: 'hasObservations',
    headerName: 'OBS',
    type: 'boolean',
    width: 50,
    renderCell: ({ value }) => {
      if (value === null) return null
      if (typeof value === 'number') return value
      return <CheckLogo checked={value} />
    }
  },
  {
    field: 'lastObservation',
    headerName: 'ULTIMA OBSERVACION',
    width: 200
  },
  {
    field: 'hasEvidences',
    headerName: 'EVID',
    type: 'boolean',
    width: 50,
    renderCell: ({ value }) => {
      if (value === null) return null
      if (typeof value === 'number') return value
      return <CheckLogo checked={value} />
    },
    renderHeader: () => (
      <CustomHeader title="EVID">{aggregations.evidencesCount}</CustomHeader>
    )
  },
  {
    field: 'user',
    headerName: 'USUARIO',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO">{aggregations.userCount}</CustomHeader>
    )
  },
  {
    field: 'assignedOn',
    headerName: 'FECHA OT ASIGNADA',
    type: 'string',
    width: 120,
    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    }
  },
  {
    field: 'assignedBy',
    headerName: 'USUARIO ASIGNA OT',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO ASIGNA OT">
        {aggregations.userAssignCount}
      </CustomHeader>
    )
  },
  {
    field: 'processOn',
    headerName: 'FECHA OT EN PROCESO',
    type: 'string',
    width: 120,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    }
  },
  {
    field: 'processBy',
    headerName: 'USUARIO PROCESA OT',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO PROCESA OT">
        {aggregations.userProcessCount}
      </CustomHeader>
    )
  },
  {
    field: 'attendedOn',
    headerName: 'FECHA OT FINALIZADA',
    type: 'string',
    width: 120,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    }
  },
  {
    field: 'attendedBy',
    headerName: 'USUARIO FINALIZA OT',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO FINALIZA OT">
        {aggregations.usersFinishCount}
      </CustomHeader>
    )
  },
  {
    field: 'canceledOn',
    headerName: 'FECHA OT CANCELADA',
    type: 'string',
    width: 100,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    }
  },
  {
    field: 'canceledBy',
    headerName: 'USUARIO CANCELA OT',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO CANCELA OT">
        {aggregations.usersCancelsCount}
      </CustomHeader>
    )
  },
  {
    field: 'validatedOn',
    width: 100,
    headerName: 'FECHA OT EVALUADA',
    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    }
  },
  {
    field: 'validatedBy',
    headerName: 'USUARIO EVALUA OT',
    renderHeader: () => (
      <CustomHeader title="USUARIO EVALUA OT">
        {aggregations.usersEvaluateCount}
      </CustomHeader>
    )
  },
  {
    headerName: 'EVALUADO CORRECTO',
    field: 'validatedSuccess',
    type: 'boolean',
    width: 100,
    renderCell: ({ value }) => {
      if (typeof value === 'number') return value
      if (value === null) return null
      return <CheckLogo checked={value} />
    },
    renderHeader: () => (
      <CustomHeader title="EVALUADO CORRECTO">
        <span>{aggregations.evaluatedSuccess}</span>
        <span style={{ color: 'black' }}>/</span>
        <span
          style={{
            color: 'red'
          }}
        >
          {aggregations.evaluatedFail}
        </span>
        <div>{aggregations.evaluatedCount}</div>
      </CustomHeader>
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
