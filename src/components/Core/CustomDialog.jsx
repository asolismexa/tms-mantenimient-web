import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'

function CustomDialog({ open, onClose, children, title, actions }) {
  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancelar
          </Button>
          {actions}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CustomDialog
