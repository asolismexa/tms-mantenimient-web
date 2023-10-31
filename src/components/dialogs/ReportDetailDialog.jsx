import { useReportDetailStore } from '@/store/reportDetailStore'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'

export function ReportDetailDialog () {
  const open = useReportDetailStore(state => state.isDetailDialogOpened)
  const report = useReportDetailStore(state => state.report)
  const closeDialog = useReportDetailStore(state => state.closeDialog)
  const loading = useReportDetailStore(state => state.loading)

  const handleClose = () => {
    closeDialog()
  }

  if (loading) return <LoadingBackdrop open />

  if (!report) {
    return (
      <Dialog open={open} fullWidth maxWidth='lg' onClose={handleClose}>
        <DialogContentText>No hay reporte seleccionado</DialogContentText>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        REPORTE DE REPORTE #{report.id}
      </DialogTitle>

      <DialogContent>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>CERRAR</Button>
      </DialogActions>
    </Dialog>
  )
}
