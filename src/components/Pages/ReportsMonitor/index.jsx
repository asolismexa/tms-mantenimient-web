import { Alert, Box } from '@mui/material'
import { ReportsMonitorGrid } from '@/components/monitors/reports/ReportsMonitorGrid'
import { useReportsMonitor } from '@/hooks/useReportsMonitor'
import { createMonitorColumns } from '@/components/columns/reports/monitorColumns'
import { useReportsMonitorFilters } from '@/hooks/useReportsMonitorFilters'
import { debounce } from '@/utils/debounce'
import { getAggregations } from '@/utils/reportsAggregations'
import { CreateReportDetailDialog } from '@/components/dialogs/CreateReportDialog'
import { SnackbarProvider } from 'notistack'
import { useReportDetailStore } from '@/store/reportDetailStore'
import { ReportDetailDialog } from '@/components/dialogs/ReportDetailDialog'

export function ReportsMonitor () {
  const { reports, loading, error: monitorError } = useReportsMonitor()
  const { filteredReports, onFilterChange } = useReportsMonitorFilters({ reports })
  const getReportDetail = useReportDetailStore(state => state.getReportDetail)
  const openDialog = useReportDetailStore(state => state.openDialog)

  const handleRowDoubleClick = ({ id }) => {
    getReportDetail(id)
    openDialog()
  }

  return (
    <Box sx={{
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      gap: 1
    }}>
      <SnackbarProvider>
        { monitorError && <Alert severity='error'>{monitorError}</Alert> }
        <ReportsMonitorGrid
          loading={loading}
          reports={filteredReports}
          onRowDoubleClick={handleRowDoubleClick}
          columns={createMonitorColumns({
            onFilterChange: debounce(onFilterChange, 300),
            aggregations: getAggregations({ reports: filteredReports })
          })}
        />
        <CreateReportDetailDialog />
        <ReportDetailDialog />
      </SnackbarProvider>
    </Box>
  )
}
