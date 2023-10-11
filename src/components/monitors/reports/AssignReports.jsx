import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { ConfirmModal } from '@/components/Core/modals/ConfirmModal'
import { useAssignReports } from '@/hooks/reports/monitor/useAssignReports'

export function AssignReports({ selectedRows = [], reports }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { loading, selectedReports, assingReports, responses } =
    useAssignReports({
      ids: selectedRows,
      reports,
    })
  const isDisabled = selectedReports.length <= 0

  const handleChange = ({ target }) => setValue(target.value)
  const handleOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  const handleOnConfirm = () => {
    if (value.trim() === '' || value.startsWith(' ') || value.endsWith(' ')) {
      return
    }

    assingReports({ ot: value })
  }

  return (
    <>
      <Button
        disabled={isDisabled}
        onClick={handleOpen}
        sx={{
          opacity: isDisabled ? 0.6 : 1,
        }}
      >
        ASIGNAR REPORTES
      </Button>
      <ConfirmModal
        title={<span>ASIGNAR LOS REPORTES A LA OT #{value}</span>}
        size="lg"
        confirmLabel="ASIGNAR"
        open={open}
        onClose={onClose}
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
            responses.map((report) => (
              <Stack
                key={report.id}
                direction="row"
                alignItems="center"
                gap={2}
              >
                {report.error ? (
                  <HighlightOffIcon color="error" />
                ) : (
                  <CheckCircleIcon color="error" />
                )}
                <Typography sx={{ my: 1 }} fontWeight="bold">
                  #{report.id}
                </Typography>
                {report.error ? (
                  <Typography color="error">{report.error}</Typography>
                ) : (
                  <Typography color="success">
                    SE ASIGNO CORRECTAMENTE
                  </Typography>
                )}
              </Stack>
            ))}
        </Box>
      </ConfirmModal>
    </>
  )
}
