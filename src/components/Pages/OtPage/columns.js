import dayjs from 'dayjs'

function formatDate(dateString) {
  if (!dateString) return ''
  return dayjs(dateString, 'DD/MM/YYYY').format('DD MMM YYYY').toUpperCase()
}

export const otPageColumns = () => [
  {
    field: 'Fecha_Reporte',
    headerName: 'FECHA REPORTE',
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: 'Fecha',
    headerName: 'FECHA',
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: 'Folio_solicitud',
    headerName: 'SOLICITUD',
  },
  {
    field: 'Fecha_Cierre',
    headerName: 'FECHA CIERRE',
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: 'Fecha_Promesa',
    headerName: 'FECHA PROMESA',
    valueFormatter: (params) => formatDate(params.value),
  },
  {
    field: 'Estatus',
    headerName: 'ESTATUS',
  },
  {
    field: 'Tipo_Orden',
    headerName: 'TIPO ORDEN',
  },
  {
    field: 'Nombre',
    headerName: 'NOMBRE',
  },
  {
    field: 'Unidad',
    headerName: 'UNIDAD',
  },
  {
    field: 'Usuario',
    headerName: 'USUARIO',
  },
  {
    field: 'Centro_Costos',
    headerName: 'CENTRO DE COSTOS',
  },
  {
    field: 'Proveedor',
    headerName: 'PROVEEDOR',
  },
]
