import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import { ConfirmModal } from '@/components/Core/modals/ConfirmModal'
import { useAssignReports } from '@/hooks/reports/monitor/useAssignReports'
import { ReportResponseItem } from '@/components/monitors/reports/ReportResponseItem'

const noop = () => { }
export function AssignReports ({
  selectedRows = [],
  reports,
  onClose = noop,
  onAssign = noop
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { loading, selectedReports, assingReports, responses } =
    useAssignReports({
      ids: selectedRows,
      reports
    })
  const isDisabled = selectedReports.length <= 0

  const handleChange = ({ target }) => setValue(target.value)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    onClose()
    setOpen(false)
  }
  const handleOnConfirm = () => {
    if (value.trim() === '' || value.startsWith(' ') || value.endsWith(' ')) {
      return
    }

    assingReports({ ot: value }).finally(() => onAssign(true))
  }

  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={handleOpen}
        sx={{
          opacity: isDisabled ? 0.6 : 1
        }}
      >
        ASIGNAR REPORTES
      </Button>
      <ConfirmModal
        title={<span>ASIGNAR LOS REPORTES A LA OT #{value}</span>}
        size="lg"
        confirmLabel="ASIGNAR"
        open={open}
        onClose={handleClose}
        onConfirm={handleOnConfirm}
      >
        <Box sx={{ py: 1 }}>
          <TextField
            label="ORDEN DE TRABAJO"
            fullWidth
            margin="none"
            value={value}
            onChange={handleChange}
            disabled={loading}
          />
          {loading && <CircularProgress />}
          {open &&
            !loading &&
            responses.length === 0 &&
            selectedReports.map((report) => (
              <Typography sx={{ my: 1 }} key={report.id} fontWeight="bold">
                #{report.id}
              </Typography>
            ))}
          {open &&
            !loading &&
            responses.map((response) => (
              <ReportResponseItem
                key={response.id}
                id={response.id}
                error={response.error}
              />
            ))}
        </Box>
      </ConfirmModal>
    </>
  )
}
