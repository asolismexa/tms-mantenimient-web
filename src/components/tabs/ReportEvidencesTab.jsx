import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FileInput from '@/components/Core/FileInput'
import { useReportDetailStore } from '@/store/reportDetailStore'
import { EvidenceListItem } from '@/components/EvidenceListItem'
import ImageViewer from 'react-simple-image-viewer'

export function ReportEvidencesTab () {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const report = useReportDetailStore(state => state.report)
  const evidences = report?.evidences ?? []

  const handleOpen = (imageIndex) => {
    setCurrentIndex(imageIndex)
    setIsViewerOpen(true)
  }
  const handleClose = () => setIsViewerOpen(false)
  const createHandleOpen = (imageIndex) => () => handleOpen(imageIndex)

  if (!report) {
    return (
      <Box>
        <Typography>No hay evidencias</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '450px'
    }}>
      <Box>
        <FileInput />
      </Box>
      <Box flex={1} display='flex' flexWrap='wrap' gap={3}>
        {
          evidences.map((evidence, index) => (
            <EvidenceListItem
              key={evidence.id}
              src={evidence.link}
              onClick={createHandleOpen(index)}
            />
          ))
        }
      </Box>
      {
        isViewerOpen &&
        <ImageViewer
          onClose={handleClose}
          src={evidences.map(ev => ev.link)}
          currentIndex={currentIndex}
          closeOnClickOutside={true}
        />
      }
    </Box>
  )
}
