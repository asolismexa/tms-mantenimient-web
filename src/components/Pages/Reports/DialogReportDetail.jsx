import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
  selectReportDetail,
  openDialog,
  closeDialog,
} from '@/reducers/reportDetail'

export default function AlertDialogSlide() {
  const dispatch = useDispatch()
  const { dialog, form } = useSelector(selectReportDetail)

  const handleClickOpen = () => {
    dispatch(openDialog())
  }

  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={dialog.open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Detalle de Reporte'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Este es el detalle de un reporte
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
