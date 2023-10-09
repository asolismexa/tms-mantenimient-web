import CheckLogo from '@/components/Core/CheckLogo'

import { initialAggregations } from '@/utils/reportsAggregations'
import { formatDate, utcToLocal } from '@/utils/dates'
import { mettersToKilometers } from '@/utils/numbers'
import { CustomHeader } from '@/components/columns/CustomHeader'

export const createSearchColumns = ({
  aggregations = { ...initialAggregations },
}) => [
  {
    field: 'id',
    headerName: 'FOLIO',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="FOLIO">{aggregations.totalCount}</CustomHeader>
    ),
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
    },
  },
  {
    field: 'vehicle',
    headerName: 'UNIDAD',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="UNIDAD">{aggregations.vehicleCount}</CustomHeader>
    ),
  },
  {
    field: 'odometer',
    headerName: 'ODOMETRO',
    width: 100,
    valueFormatter: ({ value }) => {
      if (value) return mettersToKilometers(value)
      return null
    },
  },
  {
    field: 'driver',
    headerName: 'OPERADOR',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="OPERADOR">{aggregations.driversCount}</CustomHeader>
    ),
  },
  {
    field: 'shipment_id',
    headerName: 'SOLICITUD',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="SOLICITUD">
        {aggregations.shipmentCount}
      </CustomHeader>
    ),
  },
  {
    field: 'ot',
    headerName: 'OT',
    width: 150,
    renderHeader: () => (
      <CustomHeader title="OT">{aggregations.otCount}</CustomHeader>
    ),
  },
  {
    field: 'status',
    headerName: 'ESTATUS',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="STATUS">{aggregations.statusCount}</CustomHeader>
    ),
  },
  {
    field: 'report_type',
    headerName: 'TIPO FALLA',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="TIPO FALLA">
        {aggregations.reportTypeCount}
      </CustomHeader>
    ),
  },
  {
    field: 'has_observations',
    headerName: 'OBS',
    type: 'boolean',
    width: 50,
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
    width: 50,
    renderCell: ({ value }) => {
      if (value === null) return null
      if (typeof value === 'number') return value
      return <CheckLogo checked={value} />
    },
    renderHeader: () => (
      <CustomHeader title="EVID">{aggregations.evidencesCount}</CustomHeader>
    ),
  },
  {
    field: 'user',
    headerName: 'USUARIO',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO">{aggregations.userCount}</CustomHeader>
    ),
  },
  {
    field: 'assigned_on',
    headerName: 'FECHA OT ASIGNADA',
    type: 'string',
    width: 120,
    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'assigned_by',
    headerName: 'USUARIO ASIGNA OT',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO ASIGNA OT">
        {aggregations.userAssignCount}
      </CustomHeader>
    ),
  },
  {
    field: 'process_on',
    headerName: 'FECHA OT EN PROCESO',
    type: 'string',
    width: 120,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'process_by',
    headerName: 'USUARIO PROCESA OT',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO PROCESA OT">
        {aggregations.userProcessCount}
      </CustomHeader>
    ),
  },
  {
    field: 'attended_on',
    headerName: 'FECHA OT FINALIZADA',
    type: 'string',
    width: 120,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'attended_by',
    headerName: 'USUARIO FINALIZA OT',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO FINALIZA OT">
        {aggregations.usersFinishCount}
      </CustomHeader>
    ),
  },
  {
    field: 'canceled_on',
    headerName: 'FECHA OT CANCELADA',
    type: 'string',
    width: 100,

    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'canceled_by',
    headerName: 'USUARIO CANCELA OT',
    type: 'string',
    width: 100,
    renderHeader: () => (
      <CustomHeader title="USUARIO CANCELA OT">
        {aggregations.usersCancelsCount}
      </CustomHeader>
    ),
  },
  {
    field: 'validated_on',
    width: 100,
    headerName: 'FECHA OT EVALUADA',
    valueFormatter: ({ value }) => {
      if (value) {
        const localDate = utcToLocal(value)
        return formatDate(localDate)
      }
      return null
    },
  },
  {
    field: 'validated_by',
    headerName: 'USUARIO EVALUA OT',
    renderHeader: () => (
      <CustomHeader title="USUARIO EVALUA OT">
        {aggregations.usersEvaluateCount}
      </CustomHeader>
    ),
  },
  {
    headerName: 'EVALUADO CORRECTO',
    field: 'validated_success',
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
            color: 'red',
          }}
        >
          {aggregations.evaluatedFail}
        </span>
        <div>{aggregations.evaluatedCount}</div>
      </CustomHeader>
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
