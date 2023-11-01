import { useState } from 'react'
import { useReportDetailStore } from '@/store/reportDetailStore'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ImageViewer from 'react-simple-image-viewer'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { EvidenceListItem } from '@/components/EvidenceListItem'
import { FileInput } from '@/components/inputs/FileInput'
import { postReportEvidence } from '@/services/reports'
import { useReportsMonitorStore } from '@/store/reportsMonitor'

export function ReportEvidencesTab () {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [files, setFiles] = useState([])
  const report = useReportDetailStore(state => state.report)
  const syncMonitor = useReportsMonitorStore(state => state.syncMonitor)
  const getReportDetail = useReportDetailStore(state => state.getReportDetail)
  const setLoading = useReportDetailStore(state => state.setLoading)
  const evidences = report?.evidences ?? []
  const sortedEvidences = evidences.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const handleOpen = (imageIndex) => {
    setCurrentIndex(imageIndex)
    setIsViewerOpen(true)
  }
  const handleClose = () => setIsViewerOpen(false)
  const createHandleOpen = (imageIndex) => () => handleOpen(imageIndex)
  const handleChange = (files) => {
    setFiles(files)
  }

  const handleUploadEvidence = async () => {
    setLoading(true)
    await postReportEvidence(report?.id, files[0])
    getReportDetail(report?.id)
    setTimeout(() => {
      syncMonitor()
    }, 2000)
  }

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
      <Box display='flex' gap={1} alignItems='center'>
        <FileInput value={files} onChange={handleChange} >
          SELECCIONAR ARCHIVO
        </FileInput>
        <IconButton
          sx={{
            opacity: files.length === 0 ? 0.5 : 1
          }}
          disabled={files.length === 0}
          color="primary"
          onClick={handleUploadEvidence}
        >
          <FileUploadIcon color="inherit" />
        </IconButton>
      </Box>
      <Box flex={1} display='flex' gap={3} justifyContent='center' flexWrap='wrap'>
        {
          sortedEvidences.map((evidence, index) => (
            <EvidenceListItem
              key={evidence.id}
              src={evidence.link}
              date={evidence.createdAt}
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
          backgroundStyle={{
            backgroundColor: 'rgb(0 0 0 / 0.9)'
          }}
        />
      }
    </Box>
  )
}
