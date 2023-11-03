import { useReportsMonitorFilters } from '@/hooks/useReportsMonitorFilters'
import { useReportsMonitor } from '@/hooks/useReportsMonitor'
import { Alert, Box } from '@mui/material'
import { ReportsMonitorGrid } from '@/components/monitors/reports/ReportsMonitorGrid'
import { CreateReportDetailDialog } from '@/components/dialogs/CreateReportDialog'
import { ReportDetailDialog } from '@/components/dialogs/ReportDetailDialog'
import { SnackbarProvider } from 'notistack'
import { getAggregations } from '@/utils/reportsAggregations'
import { createMonitorColumns } from '@/components/columns/reports/monitorColumns'
import { useReportDetailStore } from '@/store/reportDetailStore'
import { debounce } from '@/utils/debounce'
import { useReportsMonitorStore } from '@/store/reportsMonitor'

/**
 * Renders the ReportsMonitor component.
 * @returns {JSX.Element} The ReportsMonitor component.
 */
export function ReportsMonitor () {
  const { reports, loading, error: monitorError } = useReportsMonitor()
  const { filteredReports, onFilterChange } = useReportsMonitorFilters({ reports })
  const getReportDetail = useReportDetailStore(state => state.getReportDetail)
  const openDialog = useReportDetailStore(state => state.openDialog)
  const setTab = useReportDetailStore(state => state.setDialogTab)
  const selectRows = useReportsMonitorStore(state => state.selectRows)
  const selectedRows = useReportsMonitorStore(state => state.selectedRows)

  const handleRowDoubleClick = ({ id }) => {
    getReportDetail(id)
    openDialog()
  }

  const handleCellDoubleClick = ({ field }) => {
    if (field === 'hasObservations' || field === 'lastObservation') {
      setTab(1)
      return
    }

    if (field === 'hasEvidences') {
      setTab(2)
      return
    }

    setTab(0)
  }

  const handleSelectRows = (rows) => selectRows(rows)

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
          onCellDoubleClick={handleCellDoubleClick}
          selectedRows={selectedRows}
          onSelectRows={handleSelectRows}
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
