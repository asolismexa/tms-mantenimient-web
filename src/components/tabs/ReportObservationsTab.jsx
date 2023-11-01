import { useReportDetailStore } from '@/store/reportDetailStore'
import { statusEnum } from '@/constants/reports'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import { ObservationsList } from '@/components/lists/ObservationList'
import { ObservationListItem } from '@/components/lists/ObservationListItem'
import { createNewReportObservation } from '@/services/report-observations'
import { useReportsMonitorStore } from '@/store/reportsMonitor'

export function ReportObservationsTab () {
  const report = useReportDetailStore(state => state.report)
  const getReportDetail = useReportDetailStore(state => state.getReportDetail)
  const syncMonitor = useReportsMonitorStore(state => state.syncMonitor)
  const isActiveReport = report.statusId !== statusEnum.VALIDADO
  const defaultOpacity = isActiveReport ? 1.0 : 0.5

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formdata = new FormData(e.currentTarget)
    const observation = formdata.get('observation')
    if (observation === null) return
    if (observation.trim() === '') return
    // Post new observation and refresh report detail
    const newObservation = {
      reportId: report.id,
      observationText: observation.trim()
    }
    createNewReportObservation(newObservation).then(() => {
      getReportDetail(report.id)
      setTimeout(() => syncMonitor(), 3000)
    })
    form.reset()
  }

  if (!report) return <Typography>No hay observaciones</Typography>

  return (
    <Box>
      <Box
        sx={{ minHeight: '290px', maxHeight: '290px', overflow: 'auto' }}
      >
      <ObservationsList>
        {report.observations?.map((obs) => (
          <ObservationListItem key={obs.id} observation={obs} />
        ))}
      </ObservationsList>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <TextField
            sx={{
              opacity: defaultOpacity
            }}
            multiline
            rows={2}
            fullWidth
            size="small"
            margin="none"
            label="Nueva observacion"
            name='observation'
            disabled={!isActiveReport}
          />
          <IconButton
            type="submit"
            size="small"
            onClick={() => {}}
            sx={{
              opacity: defaultOpacity
            }}
            disabled={!isActiveReport}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </Box>
  )
}
