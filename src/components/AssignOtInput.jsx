import { useRef } from 'react'
import { useReportDetailStore } from '@/store/reportDetailStore'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { useReportsMonitor } from '@/hooks/useReportsMonitor'

export function AssignOtInput () {
  const inputRef = useRef()
  const assingOt = useReportDetailStore(state => state.assingOt)
  const getReportDetail = useReportDetailStore(state => state.getReportDetail)
  const report = useReportDetailStore(state => state.report)
  const errorMessage = useReportDetailStore(state => state.errorMessage)
  const syncMonitor = useReportsMonitor(state => state.syncMonitor)

  const handleClick = () => {
    const otFolio = inputRef.current.value
    if (!otFolio) return
    assingOt(otFolio, report.id)
      .then(() => {
        getReportDetail(report.id)
        syncMonitor()
      })
  }

  return (
    <div>
      <Box display='flex' alignItems='center' gap={1}>
        <TextField inputRef={inputRef} size='small' margin='normal' label='ORDEN DE TRABAJO'/>
        <Button onClick={handleClick}>ASIGNAR</Button>
      </Box>
      { errorMessage && <Alert severity='error'>{errorMessage}</Alert> }
    </div>
  )
}
