import Stack from '@mui/material/Stack'
import CustomIconButton from '@/components/Core/buttons/IconButton'
import CustomExportToolbar from '@/components/custom/CustomExportToolbar'
import { NoteAdd, Refresh } from '@mui/icons-material'

function TollBar({ onOpenCreateReportsModal, setRefresh }) {
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
      </Stack>
    </CustomExportToolbar>
  )
}

export default TollBar
