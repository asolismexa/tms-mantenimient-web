import { Box } from '@mui/material'
import { createMonitorColumns } from '@/components/columns/reports/monitorColumns'
import CustomDataGrid from '@/components/custom/CustomDataGrid'
import { useReportsMonitor } from '@/hooks/useReportsMonitor'

export function ReportsMonitor () {
  const { reports } = useReportsMonitor()

  return (
    <Box sx={{ height: '100%' }} >
       <CustomDataGrid
        columns={createMonitorColumns({
          onFilterChange: () => {}
        })}
        rows={reports}
        disableColumnMenu
        rowCount={reports?.length ?? 0}
        disableRowSelectionOnClick
        checkboxSelection
        slots={{
          footer: () => null
        }}
      />
    </Box>
  )
}
