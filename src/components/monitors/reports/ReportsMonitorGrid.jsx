import { createMonitorColumns } from '@/components/columns/reports/monitorColumns'
import CustomDataGrid from '@/components/custom/CustomDataGrid'
import TollBar from '@/components/Pages/MonitorReports/TollBar'
import { AssignReports } from '@/components/monitors/reports/AssignReports'

export function ReportsMonitorGrid ({ reports, columns, loading, syncMonitor }) {
  return (
    <CustomDataGrid
        loading={loading}
        rows={reports}
        disableColumnMenu
        rowCount={reports?.length ?? 0}
        disableRowSelectionOnClick
        checkboxSelection
        columns={createMonitorColumns({
          onFilterChange: () => {}
        })}
        slots={{
          footer: () => null,
          toolbar: () => (
            <TollBar
              reports={reports}
              selectedRows={null}
              onOpenCreateReportsModal={() => {}}
              setRefresh={syncMonitor}
            >
              <AssignReports
                selectedRows={[]}
                reports={reports}
                onAssign={() => {}}
                onClose={() => {}}
              />
            </TollBar>
          )
        }}
      />
  )
}
