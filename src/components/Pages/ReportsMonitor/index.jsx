import { Alert, Box } from '@mui/material'
import { createMonitorColumns } from '@/components/columns/reports/monitorColumns'
import { useReportsMonitor } from '@/hooks/useReportsMonitor'
import { ReportsMonitorGrid } from '@/components/monitors/reports/ReportsMonitorGrid'

export function ReportsMonitor () {
  const { reports, loading, error: monitorError, syncMonitor } = useReportsMonitor()

  return (
    <Box sx={{
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      gap: 1
    }} >
      { monitorError && <Alert severity='error'>{monitorError}</Alert>}
       <ReportsMonitorGrid
        loading={loading}
        reports={reports}
        syncMonitor={syncMonitor}
        columns={createMonitorColumns({
          onFilterChange: () => {}
        })} />
    </Box>
  )
}
