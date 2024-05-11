/* eslint-disable camelcase */
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

export default function RefactionsGrid({ refactions }) {
  const table = useMaterialReactTable({
    data: refactions,
    columns: [
      {
        accessorKey: 'Id',
        header: 'ID',
        size: 120,
        aggregationFn: 'count',
      },
      {
        accessorKey: 'SolicitudId',
        header: '# SOLICITUD',
        size: 140,
      },
      {
        accessorKey: 'Cantidad',
        header: 'CANTIDAD',
        size: 130,
      },
      {
        accessorKey: 'Cantidad_Entregada',
        header: 'CANTIDAD SURTIDA',
        size: 190,
      },
      {
        accessorKey: 'Costo',
        header: 'COSTO',
        size: 100,
      },
      {
        accessorKey: 'Sku',
        header: 'SKU',
        size: 80,
      },
      {
        accessorKey: 'Nombre',
        header: 'NOMBRE',
        size: 150,
      },
      {
        accessorKey: 'Descripcion',
        header: 'Descripcion',
      },
    ],
    state: {
      density: 'compact',
    },
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableHiding: false,
    layoutMode: 'grid-no-grow',
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    muiTableContainerProps: { sx: { height: 400 } },
    muiTablePaperProps: { elevation: 0 },
    localization: MRT_Localization_ES,
  })

  return <MaterialReactTable table={table} />
}
