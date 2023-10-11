import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

const non = () => {}
export function Modal({
  open = false,
  title,
  text,
  children,
  actions,
  fullWidth = true,
  size = 'sm',
  onClose = non,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={size} fullWidth={fullWidth}>
      <DialogTitle>{title}</DialogTitle>
      {text && <DialogContentText>{text}</DialogContentText>}
      {children && <DialogContent>{children}</DialogContent>}
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}
