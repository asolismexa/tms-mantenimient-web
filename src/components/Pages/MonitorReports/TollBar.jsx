import Stack from '@mui/material/Stack'
import CustomIconButton from '@/components/Core/buttons/IconButton'
import CustomExportToolbar from '@/components/custom/CustomExportToolbar'
import { NoteAdd, Refresh } from '@mui/icons-material'
import { AssignReports } from '@/components/monitors/reports/AssignReports'

function TollBar({
  onOpenCreateReportsModal,
  setRefresh,
  reports,
  selectedRows,
}) {
  return (
    <CustomExportToolbar>
      <Stack direction="row" spacing={0.7}>
        <CustomIconButton onClick={onOpenCreateReportsModal}>
          <NoteAdd />
        </CustomIconButton>
        <CustomIconButton
          onClick={() => {
            setRefresh((prev) => !prev)
          }}
        >
          <Refresh />
        </CustomIconButton>
        <AssignReports reports={reports} selectedRows={selectedRows} />
      </Stack>
    </CustomExportToolbar>
  )
}

export default TollBar
