import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { ConfirmModal } from '@/components/Core/modals/ConfirmModal'
import { useAssignReports } from '@/hooks/reports/monitor/useAssignReports'

export function AssignReports({ selectedRows = [], reports }) {
  const { selectedReports } = useAssignReports({ ids: selectedRows, reports })
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const isDisabled = selectedReports.length <= 0

  const handleChange = ({ target }) => setValue(target.value)
  const handleOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

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
        confirmLabel="ASIGNAR"
        open={open}
        onClose={onClose}
      >
        <Box sx={{ py: 1 }}>
          <TextField
            label="ORDEN DE TRABAJO"
            fullWidth
            margin="none"
            value={value}
            onChange={handleChange}
          />
          <Box sx={{ my: 2 }}>
            {selectedReports.map((report) => (
              <Typography key={report.id}>REPORTE #{report.id}</Typography>
            ))}
          </Box>
        </Box>
      </ConfirmModal>
    </>
  )
}
