import CustomDataGrid from '@/components/custom/CustomDataGrid'
import { ReportsMonitorToolBar } from '@/components/Pages/ReportsMonitor/ReportsMonitorToolBar'

export function ReportsMonitorGrid ({
  reports,
  columns,
  loading,
  selectedRows,
  onSelectRows,
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
        rowSelectionModel={selectedRows}
        onRowDoubleClick={onRowDoubleClick}
        onCellDoubleClick={onCellDoubleClick}
        onRowSelectionModelChange={onSelectRows}
        slots={{
          footer: () => null,
          toolbar: ReportsMonitorToolBar
        }}
      />
  )
}
