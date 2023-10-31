import CustomDataGrid from '@/components/custom/CustomDataGrid'
import { ReportsMonitorToolBar } from '@/components/Pages/ReportsMonitor/ReportsMonitorToolBar'

export function ReportsMonitorGrid ({ reports, columns, loading, syncMonitor }) {
  return (
    <CustomDataGrid
        loading={loading}
        rows={reports}
        disableColumnMenu
        rowCount={reports?.length ?? 0}
        disableRowSelectionOnClick
        checkboxSelection
        columns={columns}
        slots={{
          footer: () => null,
          toolbar: ReportsMonitorToolBar
        }}
      />
  )
}
