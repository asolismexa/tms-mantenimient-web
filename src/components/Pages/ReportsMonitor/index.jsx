import { Alert, Box } from '@mui/material'
import { ReportsMonitorGrid } from '@/components/monitors/reports/ReportsMonitorGrid'
import { useReportsMonitor } from '@/hooks/useReportsMonitor'
import { createMonitorColumns } from '@/components/columns/reports/monitorColumns'
import { useReportsMonitorFilters } from '@/hooks/useReportsMonitorFilters'
import { debounce } from '@/utils/debounce'
import { getAggregations } from '@/utils/reportsAggregations'
import { CreateReportDetailDialog } from '@/components/Pages/ReportsMonitor/CreateReportDialog'

export function ReportsMonitor () {
  const { reports, loading, error: monitorError, syncMonitor } = useReportsMonitor()
  const { filteredReports, onFilterChange } = useReportsMonitorFilters({ reports })

  return (
    <Box sx={{
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      gap: 1
    }}>
      { monitorError && <Alert severity='error'>{monitorError}</Alert> }
      <ReportsMonitorGrid
        loading={loading}
        reports={filteredReports}
        syncMonitor={syncMonitor}
        columns={createMonitorColumns({
          onFilterChange: debounce(onFilterChange, 300),
          aggregations: getAggregations({ reports: filteredReports })
        })}
      />
      <CreateReportDetailDialog />
    </Box>
  )
}
