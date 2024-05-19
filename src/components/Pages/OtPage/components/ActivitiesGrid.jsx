/* eslint-disable camelcase */
import { Checkbox } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

export default function ActivitiesGrid({ activities }) {
  const table = useMaterialReactTable({
    data: activities,
    columns: [
      {
        accessorKey: 'Id',
        header: 'ID',
        size: 80,
        aggregationFn: 'count',
      },
      {
        accessorKey: 'Nombre',
        header: 'NOMBRE',
      },
      {
        accessorKey: 'Observaciones',
        header: 'OBSERVACIONES',
        size: 300,
      },
      {
        accessorKey: 'FechaInicio',
        header: 'FECHA INICIO',
      },
      {
        accessorKey: 'FechaFinal',
        header: 'FECHA FIN',
      },
      {
        accessorKey: 'Responsable',
        header: 'RESPONSABLE',
      },
      {
        accessorKey: 'Costo',
        header: 'COSTO',
      },
      {
        accessorKey: 'Finalizada',
        header: 'FINALIZADA',
        Cell: ({ value }) => <Checkbox checked={true} readOnly />,
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
