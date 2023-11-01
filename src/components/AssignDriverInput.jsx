import { useState } from 'react'
import { useReportDetailStore } from '@/store/reportDetailStore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AutoCompleteDrivers from '@/components/Pages/MonitorReports/AutoCompleteAsyncDrivers'
import { useReportsMonitorStore } from '@/store/reportsMonitor'

export function AssingDriverInput () {
  const [value, setValue] = useState(null)
  const assignDriver = useReportDetailStore(state => state.assignDriver)
  const getReportDetail = useReportDetailStore(state => state.getReportDetail)
  const report = useReportDetailStore(state => state.report)
  const errorMessage = useReportDetailStore(state => state.errorMessage)
  const syncMonitor = useReportsMonitorStore(state => state.syncMonitor)

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  const handleClick = () => {
    if (!value) return
    assignDriver(value.id, report.id)
      .then(() => {
        getReportDetail(report.id)
        syncMonitor()
      })
  }

  return (
    <div>
      <Box display='flex' alignItems='center' gap={1}>
        <AutoCompleteDrivers value={value} onChange={handleChange} />
        <Button onClick={handleClick}>ASIGNAR</Button>
      </Box>
      { errorMessage && <Alert severity='error'>{errorMessage}</Alert> }
    </div>
  )
}
