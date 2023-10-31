import Button from '@mui/material/Button'
import { NoteAdd, Refresh } from '@mui/icons-material'
import CustomIconButton from '@/components/Core/buttons/IconButton'
import CustomExportToolbar from '@/components/custom/CustomExportToolbar'
import { useCreateReportsStore } from '@/store/createReports'
import { useReportsMonitor } from '@/hooks/useReportsMonitor'

export function ReportsMonitorToolBar () {
  const { openDialog } = useCreateReportsStore((state) => state)
  const { syncMonitor } = useReportsMonitor()

  return (
    <CustomExportToolbar>
      <CustomIconButton onClick={openDialog}>
        <NoteAdd />
      </CustomIconButton>
      <CustomIconButton onClick={syncMonitor}>
        <Refresh />
      </CustomIconButton>
      <Button>
        ASIGNAR REPORTES
      </Button>
    </CustomExportToolbar>
  )
}
