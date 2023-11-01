import CustomDataGrid from '@/components/custom/CustomDataGrid'
import { ReportsMonitorToolBar } from '@/components/Pages/ReportsMonitor/ReportsMonitorToolBar'

export function ReportsMonitorGrid ({
  reports,
  columns,
  loading,
  onRowDoubleClick,
  onCellDoubleClick
}) {
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
        onCellDoubleClick={onCellDoubleClick}
        slots={{
          footer: () => null,
          toolbar: ReportsMonitorToolBar
        }}
      />
  )
}
