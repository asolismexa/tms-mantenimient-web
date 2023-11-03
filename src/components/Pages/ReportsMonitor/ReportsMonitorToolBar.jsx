import { NoteAdd, Refresh } from '@mui/icons-material'
import CustomIconButton from '@/components/Core/buttons/IconButton'
import CustomExportToolbar from '@/components/custom/CustomExportToolbar'
import { useCreateReportsStore } from '@/store/createReports'
import { AssignReports } from '@/components/monitors/reports/AssignReports'
import { useReportsMonitorStore } from '@/store/reportsMonitor'

export function ReportsMonitorToolBar () {
  const { openDialog } = useCreateReportsStore((state) => state)
  const { reports, syncMonitor, selectedRows, selectRows } = useReportsMonitorStore(state => state)
  const handleClose = () => selectRows([])
  const handleAssing = (success) => {
    if (!success) return
    setTimeout(() => syncMonitor(), 2000)
  }

  return (
    <CustomExportToolbar>
      <CustomIconButton onClick={openDialog}>
        <NoteAdd />
      </CustomIconButton>
      <CustomIconButton onClick={syncMonitor}>
        <Refresh />
      </CustomIconButton>
      <AssignReports
        reports={reports}
        selectedRows={selectedRows}
        onClose={handleClose}
        onAssign={handleAssing}
      >
        ASIGNAR REPORTES
      </AssignReports>
    </CustomExportToolbar>
  )
}
