import CustomDataGrid from '@/components/custom/CustomDataGrid'
import { ReportsMonitorToolBar } from '@/components/Pages/ReportsMonitor/ReportsMonitorToolBar'

export function ReportsMonitorGrid ({ reports, columns, loading, onRowDoubleClick }) {
  return (
    <CustomDataGrid
        disableColumnMenu
        disableRowSelectionOnClick
        checkboxSelection
        loading={loading}
        rows={reports}
        rowCount={reports?.length ?? 0}
        columns={columns}
        onRowDoubleClick={onRowDoubleClick}
        slots={{
          footer: () => null,
          toolbar: ReportsMonitorToolBar
        }}
      />
  )
}
